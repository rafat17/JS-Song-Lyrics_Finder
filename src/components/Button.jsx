import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Button(props){
	return (<button className={props.btn_class} onClick={props.perform}>
		      {(props.name) ? props.name : null}  <FontAwesomeIcon icon={props.btn_icon} />
		    </button>)
}

export default Button