import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setErrorNotification } from '../reducers/notificationReducer'
import { updateBlog, addBlogComment } from '../reducers/blogReducer'
import { useState } from 'react'

const BlogDetail = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const blog = useSelector(({ blogs }) => blogs.find((x) => x.id === id))

  const handleError = (e) => {
    if (e.response && e.response.data && e.response.data.error) {
      dispatch(setErrorNotification(e.response.data.error, 5000))
    } else {
      dispatch(setErrorNotification(e.message, 5000))
    }
  }

  const handleLike = (blog) => {
    return async (e) => {
      e.preventDefault()
      try {
        const newObj = { ...blog, likes: blog.likes + 1 }
        dispatch(updateBlog(id, newObj))
      } catch (e) {
        handleError(e)
      }
    }
  }
  const handleAddComment = (comment) => {
    return async (e) => {
      e.preventDefault()
      try {
        dispatch(addBlogComment(id, comment))
        setComment('')
      } catch (e) {
        handleError(e)
      }
    }
  }

  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{' '}
        <button className="blog-like-btn" onClick={handleLike(blog)}>
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      <div style={{ display: blog.comments.length ? '' : 'none' }}>
        <h3>comments</h3>
        <input
          onChange={({ target }) => setComment(target.value)}
          value={comment}
        />
        <button onClick={handleAddComment(comment)}>add comment</button>
        <ul>
          {blog.comments.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetail
