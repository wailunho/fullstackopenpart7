import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlogForm'
import Users from './components/Users'
import User from './components/User'
import BlogDetail from './components/BlogDetail'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, setToken } from './reducers/blogReducer'
import { logout, initializeUser, login } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const App = () => {
  const dispatch = useDispatch()
  const { blogs, user } = useSelector((stores) => stores)
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
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
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
            <Button variant="outlined" type="submit">
              login
            </Button>
          </div>
        </form>
      </div>
    )
  } else {
    return (
      <Router>
        <Container maxWidth="sm">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Blogs
                </Typography>
                <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/blogs">Blogs</Link>
                </Typography>
                <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/users">Users</Link>
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {user.name} logged in{' '}
                </Typography>
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={handleLogout}
                >
                  logout
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
          <Notification />
          <br></br>
          <Routes>
            <Route path="/users" element={<Users />}></Route>
            <Route
              path="/blogs"
              element={
                <>
                  <Button
                    variant="outlined"
                    style={{ display: isBlogFormVisible ? 'none' : '' }}
                    onClick={() => setIsBlogFormVisible(true)}
                  >
                    new blog
                  </Button>
                  <div style={{ display: isBlogFormVisible ? '' : 'none' }}>
                    <AddBlogForm setIsBlogFormVisible={setIsBlogFormVisible} />
                  </div>
                  <Button
                    variant="outlined"
                    style={{ display: isBlogFormVisible ? '' : 'none' }}
                    onClick={() => setIsBlogFormVisible(false)}
                  >
                    cancel
                  </Button>
                  {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                  ))}
                </>
              }
            ></Route>
            <Route path="/users/:id" element={<User />}></Route>
            <Route path="/blogs/:id" element={<BlogDetail />}></Route>
          </Routes>
        </Container>
      </Router>
    )
  }
}

export default App
