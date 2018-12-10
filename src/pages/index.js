import React, { useState, useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import uuid from 'uuid/v4'

import { setConfig } from 'react-hot-loader'

import { listPosts } from 'graphql/queries'
import { createPost } from 'graphql/mutations'

setConfig({ pureSFC: true });

function IndexPage({ data }) {
  const inputEl = useRef(null)
  const { listPosts: { items } } = data.posts
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    (async () => {
      const { data } = await API.graphql(graphqlOperation(listPosts))

      if (data) setPosts(data.listPosts.items)
    })()
    return setPosts([])
  }, [])

  const handleInput = () => {
    setTitle(inputEl.current.value)
  }

  const addPost = async (e) => {
    e.preventDefault()
    setTitle('')
    const createPostInput = {
      input: {
        id: uuid(),
        title: title,
        date: new Date().valueOf(),
        description: title
      }
    }
    const { data, errors } = await API.graphql(graphqlOperation(createPost, createPostInput))
    if (data) {
      setPosts(posts.concat(data))
    }
    if (errors) console.error(errors)
  }
  
  return (
    <>
      <h1>Poop!</h1>
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
      <form onSubmit={addPost}>
        <input ref={inputEl} onChange={handleInput} type="text" />
        <button type="submit">Add new post</button>
      </form>
    </>
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