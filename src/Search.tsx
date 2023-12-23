import { useLazyQuery } from "@apollo/client";
import { Alert, Button, Input, List, Spin } from "antd";
import { Repository } from "./__generated__/graphql";
import { useState } from "react";
import { gql } from "./__generated__";

const SEARCH_QUERY = gql(`
  query SEARCH_QUERY ($q: String!) {
    search(query: $q, type: REPOSITORY, first: 10) {
      repositoryCount
      nodes {
        ... on Repository {
          createdAt
          name
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

const Search = () => {
  const [q, setQ] = useState("");

  const [fetch, { data, loading, error }] = useLazyQuery(SEARCH_QUERY);
  const repositories = data?.search.nodes as Repository[] | null;
  return (
    <div>
      Search:
      <Input value={q} onChange={(e) => setQ(e.target.value)} />
      <Button
        type="primary"
        onClick={() =>
          fetch({
            variables: {
              q,
            },
          })
        }
      >
        Search
      </Button>
      {loading && <Spin />}
      {error && <Alert type="error" message={error.message} />}
      {repositories && (
        <List
          header={<div>Repositories: </div>}
          bordered
          dataSource={repositories}
          renderItem={(repo) => <List.Item>{repo.name}</List.Item>}
        />
      )}
    </div>
  );
};

export default Search;
