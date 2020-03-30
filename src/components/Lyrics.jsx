import React from 'react'

function Lyrics(props){
	return (
		<div className={'lyrics_segment ' + props.class}>
		  <div className="segment_container">{props.line}</div>
		</div>
		    )
}

export default Lyrics