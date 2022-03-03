import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import _ from 'lodash'

const User = () => {
  const id = useParams().id
  const blogs = useSelector(({ blogs }) =>
    blogs.filter((x) => x.user.id === id)
  )
  const user = _.get(blogs, '[0].user')
  if (!user || !blogs) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map((x) => (
          <li key={x.id}>{x.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
