import React, { Component } from 'react'
import Button from './Button'

//fontawesome libraries
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEraser } from '@fortawesome/free-solid-svg-icons'

library.add(faEraser)

class Header extends Component{

	constructor(props) {
	  super(props);
	  this.el = null
	}

	render(){
	return (
		<header ref={div => this.el = div } className="header_section">
		 <h1>English Lyrics Finder </h1>
		 <Button btn_class="clear_btn" name='Clear' btn_icon={faEraser} perform={this.props.clearToggled}/>
		</header>)}
}

export default Header