import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import { setErrorNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, setToken } from './reducers/blogReducer'
import { logout, initializeUser, login } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isBlogFormVisible, setIsBlogFormVisible] = useState(false)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(setToken(user.token))
    }
  }, [user])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      dispatch(login(username, password))
      setUsername('')
      setPassword('')
    } catch (e) {
      dispatch(setErrorNotification('Wrong credentials', 5000))
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form id="login" onSubmit={handleLogin}>
          <div>
            username{' '}
            <input
              id="username"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
          </div>
          <div>
            password{' '}
            <input
              id="password"
              type="password"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
          </div>
          <div>
            <button type="submit">login</button>
          </div>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
        <br></br>
        <button
          style={{ display: isBlogFormVisible ? 'none' : '' }}
          onClick={() => setIsBlogFormVisible(true)}
        >
          new blog
        </button>
        <div style={{ display: isBlogFormVisible ? '' : 'none' }}>
          <AddBlogForm setIsBlogFormVisible={setIsBlogFormVisible} />
        </div>
        <button
          style={{ display: isBlogFormVisible ? '' : 'none' }}
          onClick={() => setIsBlogFormVisible(false)}
        >
          cancel
        </button>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} currentUser={user} />
        ))}
      </div>
    )
  }
}

export default App
