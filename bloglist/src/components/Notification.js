import { useSelector } from 'react-redux'
import styled from '@emotion/styled'

const Container = styled.div`
  font-size: 20px;
  color: green;
  background: lightgrey;
  border-style: solid;
  border-radius: 0.25em;
  padding: 0.2em;
  margin-bottom: 0.5em;

  &.error {
    color: red;
  }
`

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  const { message, type } = notification
  if (!notification.message) {
    return null
  }
  return <Container className={type}>{message}</Container>
}

export default Notification
