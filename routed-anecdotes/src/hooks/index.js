import { useState } from 'react'

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const fields = () => ({
    name,
    value,
    onChange,
  })

  return {
    name,
    value,
    onChange,
    reset,
    fields,
  }
}
