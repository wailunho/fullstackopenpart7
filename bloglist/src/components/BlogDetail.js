import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, addBlogComment } from '../reducers/blogReducer'
import { useState } from 'react'

const BlogDetail = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const blog = useSelector(({ blogs }) => blogs.find((x) => x.id === id))

  const handleLike = (blog) => {
    return async (e) => {
      e.preventDefault()
      const newObj = { ...blog, likes: blog.likes + 1 }
      dispatch(updateBlog(id, newObj))
    }
  }
  const handleAddComment = (comment) => {
    return async (e) => {
      e.preventDefault()
      dispatch(addBlogComment(id, comment))
      setComment('')
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
