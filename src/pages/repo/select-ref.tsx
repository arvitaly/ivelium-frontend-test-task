import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__";
import { Select, SelectProps } from "antd";
import { Ref } from "../../__generated__/graphql";

export type SelectRefProps = {
  repoName: string;
  ownerName: string;
  onSelect: (refName: string) => void;
  selected: string;
  style?: SelectProps["style"];
};

const REFS_SEARCH_QUERY = gql(`
  query REFS_SEARCH_QUERY ($repoName: String!, $ownerName: String!) {
    repository(name: $repoName, owner: $ownerName) {
          refs (refPrefix: "refs/heads/", first: 100) {
          nodes {
            name
          }
        }
    }
  }
`);

const SelectRef = ({
  onSelect,
  ownerName,
  selected,
  repoName,
  style,
}: SelectRefProps) => {
  const { data, loading, error } = useQuery(REFS_SEARCH_QUERY, {
    variables: {
      ownerName,
      repoName,
    },
  });

  return (
    <Select<string>
      showSearch
      loading={loading}
      status={error ? "error" : undefined}
      style={{ width: 200, ...style }}
      placeholder={selected}
      onSelect={(ref) => onSelect(ref)}
      options={
        ((data?.repository?.refs?.nodes as Ref[]) || []).map((ref) => {
          return {
            label: ref.name,
            value: ref.name,
          };
        }) || []
      }
    />
  );
};

export default SelectRef;
