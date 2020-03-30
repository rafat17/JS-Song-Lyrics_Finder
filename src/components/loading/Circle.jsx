import React from 'react'


function Circle(props){

	function divRef(div){
		if(props.circles.length < 3) props.circles.push(div)
	}

	return <div className='circle' id={props.color} ref={ divRef }></div> 
}

export default Circle