import React from 'react'	

function Block(props){
	return(
		<div className={'block_container horizontal'}>{props.children}</div>)
}

export default Block