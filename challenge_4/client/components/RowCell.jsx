import React from 'react'

var RowCell = (props) => {
  return (
    <td className={'p' + props.cell + " cell"} data-x={props.x} data-y={props.y} onClick={props.select}></td>
  )
}

export default RowCell