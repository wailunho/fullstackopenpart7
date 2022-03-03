import { useSelector } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'

const User = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const data = _.toPairs(_.groupBy(blogs, 'user.name'))
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => {
            const id = _.get(u, '[1][0].user.id')
            return (
              <tr key={id}>
                <td>
                  <Link to={`/users/${id}`}>{u[0]}</Link>
                </td>
                <td>{u[1].length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default User
