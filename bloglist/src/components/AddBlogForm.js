import { useState } from 'react'
import {
  setSuccessNotification,
  setErrorNotification
} from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'

const AddBlogForm = ({ setIsBlogFormVisible }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleError = (e) => {
    if (e.response && e.response.data && e.response.data.error) {
      dispatch(setErrorNotification(e.response.data.error, 5000))
    } else {
      dispatch(setErrorNotification(e.message, 5000))
    }
  }

  const handleAddBlog = async (e) => {
    e.preventDefault()
    try {
      dispatch(
        addBlog({
          title,
          author,
          url
        })
      )
      dispatch(
        setSuccessNotification(`a new blog ${title} by ${author} added`, 5000)
      )
      setTitle('')
      setAuthor('')
      setUrl('')
      setIsBlogFormVisible(false)
    } catch (e) {
      handleError(e)
    }
  }

  return (
    <form id="addBlogForm" onSubmit={handleAddBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

AddBlogForm.displayName = 'AddBlogForm'

export default AddBlogForm
