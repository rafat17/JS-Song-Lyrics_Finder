import React from 'react'

function Input(props){
	return <input id={props.id} type="text" placeholder={props.name}
	        onKeyDown={props._onKeyPressed} onChange={props.setInput}
	        tabIndex="0" autoComplete="off" />
}

export default Input