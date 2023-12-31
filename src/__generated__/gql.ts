/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query SEARCH_QUERY ($q: String!, $first: Int!, $after: String) {\n    search(query: $q, type: REPOSITORY, first: $first, after: $after) {\n      repositoryCount\n      nodes {\n        ... on Repository {\n          createdAt\n          name\n          nameWithOwner\n          description\n          stargazerCount\n          owner {\n            avatarUrl\n            id\n            login\n          }\n        }\n      }\n    }\n  }\n": types.Search_QueryDocument,
    "\n  query VIEWER_QUERY {\n    viewer {\n      login\n    }\n  }\n": types.Viewer_QueryDocument,
    "\n  query REPO_QUERY ($name: String!, $owner: String!, $expression: String!, $ref: String!, $refExists: Boolean!) {\n    repository(name: $name, owner: $owner) {\n        id\n        forkCount\n        nameWithOwner\n        defaultBranchRef {\n          prefix\n          name\n          target {\n            ... on Commit {\n              author {\n                avatarUrl\n                name\n                date                \n              }\n              message\n              committedDate\n              oid\n            }\n          }\n        }\n        ref(qualifiedName: $ref) @include(if: $refExists) {\n          prefix\n          name\n          target {\n            ... on Commit {\n              author {\n                avatarUrl\n                name\n                date                \n              }\n              message\n              committedDate\n              oid\n            }\n          }\n        }\n        object (expression: $expression) {\n          ... on Tree{\n            entries {\n              name\n              extension\n              mode\n              type\n            }\n          }\n          ... on Blob {\n            isBinary\n            text\n          }\n        }\n    }\n  }\n": types.Repo_QueryDocument,
    "\n  query REFS_SEARCH_QUERY ($repoName: String!, $ownerName: String!) {\n    repository(name: $repoName, owner: $ownerName) {\n          refs (refPrefix: \"refs/heads/\", first: 100) {\n          nodes {\n            name\n          }\n        }\n    }\n  }\n": types.Refs_Search_QueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SEARCH_QUERY ($q: String!, $first: Int!, $after: String) {\n    search(query: $q, type: REPOSITORY, first: $first, after: $after) {\n      repositoryCount\n      nodes {\n        ... on Repository {\n          createdAt\n          name\n          nameWithOwner\n          description\n          stargazerCount\n          owner {\n            avatarUrl\n            id\n            login\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SEARCH_QUERY ($q: String!, $first: Int!, $after: String) {\n    search(query: $q, type: REPOSITORY, first: $first, after: $after) {\n      repositoryCount\n      nodes {\n        ... on Repository {\n          createdAt\n          name\n          nameWithOwner\n          description\n          stargazerCount\n          owner {\n            avatarUrl\n            id\n            login\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query VIEWER_QUERY {\n    viewer {\n      login\n    }\n  }\n"): (typeof documents)["\n  query VIEWER_QUERY {\n    viewer {\n      login\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query REPO_QUERY ($name: String!, $owner: String!, $expression: String!, $ref: String!, $refExists: Boolean!) {\n    repository(name: $name, owner: $owner) {\n        id\n        forkCount\n        nameWithOwner\n        defaultBranchRef {\n          prefix\n          name\n          target {\n            ... on Commit {\n              author {\n                avatarUrl\n                name\n                date                \n              }\n              message\n              committedDate\n              oid\n            }\n          }\n        }\n        ref(qualifiedName: $ref) @include(if: $refExists) {\n          prefix\n          name\n          target {\n            ... on Commit {\n              author {\n                avatarUrl\n                name\n                date                \n              }\n              message\n              committedDate\n              oid\n            }\n          }\n        }\n        object (expression: $expression) {\n          ... on Tree{\n            entries {\n              name\n              extension\n              mode\n              type\n            }\n          }\n          ... on Blob {\n            isBinary\n            text\n          }\n        }\n    }\n  }\n"): (typeof documents)["\n  query REPO_QUERY ($name: String!, $owner: String!, $expression: String!, $ref: String!, $refExists: Boolean!) {\n    repository(name: $name, owner: $owner) {\n        id\n        forkCount\n        nameWithOwner\n        defaultBranchRef {\n          prefix\n          name\n          target {\n            ... on Commit {\n              author {\n                avatarUrl\n                name\n                date                \n              }\n              message\n              committedDate\n              oid\n            }\n          }\n        }\n        ref(qualifiedName: $ref) @include(if: $refExists) {\n          prefix\n          name\n          target {\n            ... on Commit {\n              author {\n                avatarUrl\n                name\n                date                \n              }\n              message\n              committedDate\n              oid\n            }\n          }\n        }\n        object (expression: $expression) {\n          ... on Tree{\n            entries {\n              name\n              extension\n              mode\n              type\n            }\n          }\n          ... on Blob {\n            isBinary\n            text\n          }\n        }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query REFS_SEARCH_QUERY ($repoName: String!, $ownerName: String!) {\n    repository(name: $repoName, owner: $ownerName) {\n          refs (refPrefix: \"refs/heads/\", first: 100) {\n          nodes {\n            name\n          }\n        }\n    }\n  }\n"): (typeof documents)["\n  query REFS_SEARCH_QUERY ($repoName: String!, $ownerName: String!) {\n    repository(name: $repoName, owner: $ownerName) {\n          refs (refPrefix: \"refs/heads/\", first: 100) {\n          nodes {\n            name\n          }\n        }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;