import React from 'react'
import RowCell from './RowCell.jsx'

const Row = (props) => {
  return (
    <tr className="row">
      {props.row.map((cell, index) => {
        return <RowCell className="cell" key={index} cell={cell} />
      })}
    </tr>
  )
}

export default Row;