import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectAllUsers, selectUserById } from './usersSlice'
import { selectAllPosts } from '../posts/postsSlice'

const UserPage = () => {
  const { userId } = useParams()

  // I don't know whey the selectUserById/ dose not work
  // so this is a temprory solution
  const user = useSelector((state) => {
    const allUsers = selectAllUsers(state)
    return allUsers.find((user) => user.id === userId)
  })

  const postsForUser = useSelector((state) => {
    const allPosts = selectAllPosts(state)
    return allPosts.filter((post) => post.user === userId)
  })

  const postTitle = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitle}</ul>
    </section>
  )
}

export default UserPage
