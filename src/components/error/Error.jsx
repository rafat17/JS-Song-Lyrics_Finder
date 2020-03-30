import React, {Component} from 'react'

//gsap 
import { TweenMax, Power0 } from '../../../node_modules/gsap/all'

class Error extends Component{

	constructor(props) {
	  super(props);
	  this.el = null;
	}

	componentDidMount(){
		TweenMax.from(this.el, 0.3, {opacity: 0, y: 10, ease: Power0.easeNone})
	}

	render(){
		return (<div ref={div => this.el=div } className='error'>{this.props.msg}</div>)
	}
}

export default Error