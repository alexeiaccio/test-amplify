import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import { setConfig } from 'react-hot-loader'

import { listPosts } from 'graphql/queries'

setConfig({ pureSFC: true });

function IndexPage({ data }) {
  const { listPosts: { items } } = data.posts
  const [posts, setPosts] = useState([])

  useEffect(() => {
    (async () => {
      const { data } = await API.graphql(graphqlOperation(listPosts))

      if (data) setPosts(data.listPosts.items)
    })()
    return setPosts([])
  }, [])
  
  return (
    <div>
      Poop!
      <ul>
        {items.map(({id, title}) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
      <ul>
        {posts.map(({id, title}) => (
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