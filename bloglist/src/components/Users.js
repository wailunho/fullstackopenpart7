import { useSelector } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const User = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const data = _.toPairs(_.groupBy(blogs, 'user.name'))
  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((u) => {
              const id = _.get(u, '[1][0].user.id')
              return (
                <TableRow key={id}>
                  <TableCell>
                    <Link to={`/users/${id}`}>{u[0]}</Link>
                  </TableCell>
                  <TableCell>{u[1].length}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default User
