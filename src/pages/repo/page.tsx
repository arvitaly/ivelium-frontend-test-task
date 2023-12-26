import {
  Breadcrumb,
  Col,
  Empty,
  List,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { gql } from "../../__generated__";
import { useQuery } from "@apollo/client";
import { Blob, Tree, TreeEntry } from "../../__generated__/graphql";
import { FileFilled, FolderFilled } from "@ant-design/icons";
import { formatLink } from "../../util/router";
import { useMemo } from "react";
import DownloadBlob from "./download-blob";
import SelectRef from "./select-ref";

const REPO_QUERY = gql(`
  query REPO_QUERY ($name: String!, $owner: String!, $expression: String!, $ref: String!, $refExists: Boolean!) {
    repository(name: $name, owner: $owner) {
        id
        forkCount
        nameWithOwner
        defaultBranchRef {
          prefix
          name
          target {
            ... on Commit {
              author {
                avatarUrl
                name
                date                
              }
              message
              oid
            }
          }
        }
        ref(qualifiedName: $ref) @include(if: $refExists) {
          prefix
          name
          target {
            ... on Commit {
              author {
                avatarUrl
                name
                date                
              }
              message
              oid
            }
          }
        }
        object (expression: $expression) {
          ... on Tree{
            entries {
              name
              extension
              mode
              type
            }
          }
          ... on Blob {
            isBinary
            text
          }
        }
    }
  }
`);

type PageParams = {
  ownerName: string;
  repoName: string;
  objectName?: string;
  ref?: string;
  objectType?: "blob" | "tree" | "commit";
  "*"?: string;
};

const RepoPage = () => {
  const params = useParams() as PageParams;
  const navigate = useNavigate();

  const fullpath =
    `${params.objectName || ""}` + (params["*"] ? "/" + params["*"] : "");

  const { loading, data, error } = useQuery(REPO_QUERY, {
    variables: {
      name: params.repoName,
      owner: params.ownerName,
      expression: `${params.ref || "HEAD"}:${fullpath}`,
      refExists: !!params.ref,
      ref: params.ref ? `refs/heads/${params.ref}` : "",
    },
  });

  const baseRepoHref = formatLink(
    `/repo/${params.ownerName}/${params.repoName}`
  );

  const refName =
    data?.repository?.ref?.name ||
    data?.repository?.defaultBranchRef?.name ||
    "";

  const crumbs = useMemo(() => {
    const pathChunks = [];
    let curPath = "";
    const chunks = fullpath ? fullpath.split("/") : [];
    for (const [index, chunk] of chunks.entries()) {
      pathChunks.push({
        title: chunk,
        href: `${baseRepoHref}/${
          index === chunks.length - 1 ? "blob" : "tree"
        }/${encodeURIComponent(refName)}/${
          curPath ? curPath + "/" : ""
        }${chunk}`,
      });
      curPath += chunk;
    }
    return pathChunks;
  }, [baseRepoHref, fullpath, refName]);

  if (loading) {
    return <Spin />;
  }
  if (error) {
    return `${error}`;
  }

  const gitobj = data?.repository?.object;

  return (
    <div>
      <Row>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Breadcrumb
              items={[
                {
                  title: params.ownerName,
                },
                {
                  title: params.repoName,
                  href:
                    baseRepoHref +
                    (data?.repository?.ref
                      ? "/tree/" +
                        encodeURIComponent(data?.repository?.ref.name)
                      : ""),
                },
                ...crumbs,
              ]}
            />
            <Space>
              <Typography.Text>Branch:</Typography.Text>
              <SelectRef
                onSelect={(refName) => {
                  navigate(
                    `${baseRepoHref}/${
                      params.objectType || "tree"
                    }/${encodeURIComponent(refName)}${
                      fullpath ? "/" + fullpath : ""
                    }`
                  );
                }}
                selected={refName}
                ownerName={params.ownerName}
                repoName={params.repoName}
              />
            </Space>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col span={24} style={{ maxWidth: "1000px" }}>
          {!gitobj && <Empty description="Not found object" />}
          {gitobj &&
            params.objectType === "blob" &&
            ((gitobj as Blob).isBinary ? (
              <DownloadBlob />
            ) : (
              <SyntaxHighlighter style={docco} showLineNumbers>
                {(gitobj as Blob).text || ""}
              </SyntaxHighlighter>
            ))}
          {gitobj && (params.objectType === "tree" || !params.objectType) && (
            <List<TreeEntry>
              size="small"
              header={<div>Header</div>}
              bordered
              dataSource={(gitobj as Tree).entries || []}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    {item.type === "tree" ? <FolderFilled /> : <FileFilled />}
                    <Link
                      to={formatLink(
                        `/repo/${params.ownerName}/${params.repoName}/${
                          item.type
                        }/${encodeURIComponent(refName)}/${
                          fullpath ? `${fullpath}/` : ""
                        }${item.name}`
                      )}
                    >
                      <Typography.Text>{item.name}</Typography.Text>
                    </Link>
                  </Space>
                </List.Item>
              )}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default RepoPage;
