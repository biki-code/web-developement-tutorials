import React from 'react'

const Statistics = ({_label, _value}) => {
  return (
    <tr>
      <td>{_label}</td>
      <td>{_value}</td>
    </tr>
  )
}

export default Statistics