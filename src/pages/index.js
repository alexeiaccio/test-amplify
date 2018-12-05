import React from 'react'
import { graphql } from 'gatsby'

function IndexPage({ data }) {
  const { listPosts: { items } } = data.posts;
  
  return (
    <div>
      Poop!
      <ul>
        {items.map(({id, title}) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  )
}

export default IndexPage;

export const IndexQuery = graphql`
  query PageQuery {
    posts {
      listPosts {
        items {
          id
          title
        }
      }
    }
  }
`