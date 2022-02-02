/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNoteTest = /* GraphQL */ `
  query GetNoteTest($id: ID!) {
    getNoteTest(id: $id) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const listNoteTests = /* GraphQL */ `
  query ListNoteTests(
    $filter: ModelNoteTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNoteTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
