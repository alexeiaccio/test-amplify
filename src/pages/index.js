import React, { useEffect, useRef, useState } from 'react';
import { graphql } from 'gatsby';
import { API, graphqlOperation } from 'aws-amplify';
import uuid from 'uuid/v4';
import { setConfig } from 'react-hot-loader';

import { listPosts } from '../graphql/queries'
import { createPost, deletePost } from '../graphql/mutations'

setConfig({ pureSFC: true });

function IndexPage({ data }) {
  const inputEl = useRef(null)
  const { listPosts: { items } } = data.posts
  const [posts, setPosts] = useState(items)
  const [title, setTitle] = useState('')

  useEffect(() => {
    (async () => {
      const { data, errors } = await API.graphql(graphqlOperation(listPosts))

      if (data) setPosts(data.listPosts.items)
      if (errors) console.error(errors)
    })()
    return null
  }, ['items'])

  const handleTitle = () => {
    setTitle(inputEl.current.value)
  }

  const addPost = async (e) => {
    e.preventDefault()    
    const createPostInput = {
      id: uuid(),
      title: title,
      date: new Date().valueOf(),
      description: title
    }
    const { data, errors } = await API.graphql(
      graphqlOperation(createPost, { input: createPostInput })
    )
    setTitle('')
    if (data) {
      setPosts(posts.concat(data.createPost))
    }
    if (errors) console.error(errors)
  }

  const handleDeletePost = async (id, date) => {
    const { data, errors } = await API.graphql(
      graphqlOperation(deletePost, { input: { id, date } })
    )
    if (data) {
      setPosts(posts.filter(post => post.id !== id))
    }
    if (errors) console.error(errors)
  }
  
  return (
    <>
      <h1>Poop!</h1>
      <ul>
        {posts.map(({id, title, date}) => (
          <li key={id}>
            {title}
            <button
              key={uuid()}
              onClick={() => handleDeletePost(id, date)} 
              type="button"
            ></button>
          </li>
        ))}
      </ul>
      <form onSubmit={addPost}>
        <input 
          ref={inputEl}
          onChange={handleTitle}
          value={title}
          type="text"
        />
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
          date
        }
      }
    }
  }
`