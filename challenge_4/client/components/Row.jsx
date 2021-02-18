import React from 'react'
import RowCell from './RowCell.jsx'

const Row = (props) => {
  return (
    <div className="row">
      {props.row.map((cell, index) => {
        return <RowCell className="cell" key={index} cell={cell} />
      })}
    </div>
  )
}

export default Row;