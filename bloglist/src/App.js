import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import loginService from './services/login'
import { setErrorNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, setToken } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [isBlogFormVisible, setIsBlogFormVisible] = useState(false)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (user) {
      const u = JSON.parse(user)
      setUser(u)
      dispatch(setToken(u.token))
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setToken(user.token))
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
