// eslint-disable
// this is an auto generated file. This will be overwritten

export const getPost = `query GetPost($id: ID!, $date: AWSTimestamp!) {
  getPost(id: $id, date: $date) {
    id
    title
    date
    description
  }
}
`;
export const listPosts = `query ListPosts(
  $filter: TablePostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      date
      description
    }
    nextToken
  }
}
`;
