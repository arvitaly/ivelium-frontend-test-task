import { useApolloClient } from "@apollo/client";
import { gql } from "../../__generated__";
import { Repository, Search_QueryQuery } from "../../__generated__/graphql";
import {
  Avatar,
  Button,
  Divider,
  Form,
  Input,
  List,
  Skeleton,
  Space,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { createElement, useEffect, useState } from "react";
import { StarFilled } from "@ant-design/icons";
import { formatLink } from "../../util/router";
import useErrorHandler from "../../hooks/useErrorHandler";

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
);

const DEFAULT_PAGE_SIZE = 10;

const SEARCH_QUERY = gql(`
  query SEARCH_QUERY ($q: String!, $first: Int!, $after: String) {
    search(query: $q, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      nodes {
        ... on Repository {
          createdAt
          name
          nameWithOwner
          description
          stargazerCount
          owner {
            avatarUrl
            id
            login
          }
        }
      }
    }
  }
`);

const IndexPage = () => {
  const client = useApolloClient();
  const [q, setQ] = useState("");
  const [count, setCount] = useState(DEFAULT_PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Search_QueryQuery | null>(null);
  const onError = useErrorHandler();

  useEffect(() => {
    if (!q) {
      return;
    }

    setLoading(true);

    client
      .query({
        query: SEARCH_QUERY,
        variables: {
          q,
          first: count,
        },
      })
      .then((d) => setData(d.data))
      .catch(onError)
      .finally(() => setLoading(false));
  }, [client, count, onError, q]);

  const hasMore =
    !data ||
    !data.search.nodes ||
    data.search.nodes.length < data.search.repositoryCount;
  const loadMore = () => setCount((count) => count + DEFAULT_PAGE_SIZE);

  return (
    <>
      <Form>
        <Form.Item
          label="Repository search: "
          name="q"
          rules={[{ required: true, message: "Input search string" }]}
        >
          <Input.Search
            onSearch={(value) => {
              setData(null);
              setCount(10);
              setQ(value);
            }}
            placeholder="input search text"
            enterButton={loading ? "Loading" : "Search"}
            size="large"
            loading={loading}
          />
        </Form.Item>
      </Form>
      <InfiniteScroll
        dataLength={DEFAULT_PAGE_SIZE}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div style={{ textAlign: "center" }}>
            <Button
              type="primary"
              style={{
                margin: "20px auto",
                display: data && hasMore ? "block" : "none",
              }}
              onClick={loadMore}
            >
              Load more
            </Button>
          </div>
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List<Repository>
          loading={loading}
          itemLayout="horizontal"
          dataSource={(data?.search.nodes as Repository[]) || []}
          pagination={false}
          renderItem={(repo) => {
            const link = formatLink(`/repo/${repo.nameWithOwner}`);
            return (
              <List.Item
                actions={[
                  <IconText
                    icon={StarFilled}
                    text={`${repo.stargazerCount}`}
                    key="list-vertical-star-o"
                  />,
                  <Link target="_blank" to={link}>
                    open
                  </Link>,
                ]}
              >
                <Skeleton avatar title={false} active loading={false}>
                  <List.Item.Meta
                    avatar={<Avatar src={repo.owner.avatarUrl} />}
                    title={
                      <Link target="_blank" to={link}>
                        {repo.nameWithOwner}
                      </Link>
                    }
                    description={repo.description}
                  />
                </Skeleton>
              </List.Item>
            );
          }}
        />
      </InfiniteScroll>
    </>
  );
};

export default IndexPage;
