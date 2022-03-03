import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import Button from '@mui/material/Button'

const AddBlogForm = ({ setIsBlogFormVisible }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = async (e) => {
    e.preventDefault()
    dispatch(
      addBlog({
        title,
        author,
        url
      })
    )
    setTitle('')
    setAuthor('')
    setUrl('')
    setIsBlogFormVisible(false)
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
      <Button variant="outlined" type="submit">
        create
      </Button>
    </form>
  )
}

AddBlogForm.displayName = 'AddBlogForm'

export default AddBlogForm
