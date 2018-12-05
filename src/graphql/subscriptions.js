// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreatePost = `subscription OnCreatePost(
  $id: ID
  $title: String
  $date: AWSTimestamp
  $description: String
) {
  onCreatePost(id: $id, title: $title, date: $date, description: $description) {
    id
    title
    date
    description
  }
}
`;
export const onUpdatePost = `subscription OnUpdatePost(
  $id: ID
  $title: String
  $date: AWSTimestamp
  $description: String
) {
  onUpdatePost(id: $id, title: $title, date: $date, description: $description) {
    id
    title
    date
    description
  }
}
`;
export const onDeletePost = `subscription OnDeletePost(
  $id: ID
  $title: String
  $date: AWSTimestamp
  $description: String
) {
  onDeletePost(id: $id, title: $title, date: $date, description: $description) {
    id
    title
    date
    description
  }
}
`;
