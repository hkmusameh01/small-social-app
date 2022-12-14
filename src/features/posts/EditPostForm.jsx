import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { postUpdated } from './postsSlice'
import { selectPostById } from './postsSlice'

const EditPostForm = () => {
  const { postId } = useParams()

  const post = useSelector((state) => selectPostById(state, postId))

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  console.log(title)
  console.log(content)

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChanged = (e) => {
    setTitle(e.target.value)
  }
  const onContentChanged = (e) => {
    setContent(e.target.value)
  }

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postUpdated({
          id: postId,
          title,
          content,
        })
      )

      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          placeholder="What's on your mind?"
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button onClick={onSavePostClicked} type="button">
          Save Post
        </button>
      </form>
    </section>
  )
}

export default EditPostForm
