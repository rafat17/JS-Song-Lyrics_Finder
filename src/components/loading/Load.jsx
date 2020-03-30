import React, {Component} from 'react'
import Block from './Block'
import Circle from './Circle'

import {TimelineMax } from '../../../node_modules/gsap/all'
import {Power1 } from '../../../node_modules/gsap/all'


class Load extends Component{

	constructor(props) {
	  
	  super(props);
	  this.t = new TimelineMax({paused: true, repeat: -1 })

	}


	load = (t, circles) => {
		
		const  all_circles  = this.props.circles

	    t
	    .to(all_circles[0], 0.6, {y: -10, ease: Power1.easeNone})
	    .to(all_circles[1], 0.6, {y: -14, ease: Power1.easeNone}, '-=.27')
        .to(all_circles[2], 0.6, {y: -18, ease: Power1.easeNone}, '-=.3')
        .to(all_circles[0], 0.6, {y: 0, ease: Power1.easeNone}, '-=.81')
        .to(all_circles[1], 0.6, {y: 0, ease: Power1.easeNone}, '-=.54')
        .to(all_circles[2], 0.6, {y: 0, ease: Power1.easeNone}, '-=.3')
        .play()
		
	}
	
	componentDidMount(){
		this.load(this.t, this.circles)
	}

	componentWillUnmount(){
		this.t.kill()
	}

	render(){

		return(
			<Block>
			<Circle  color='red' circles={this.props.circles}  />
			<Circle  color='red' circles={this.props.circles} />
			<Circle  color='red' circles={this.props.circles} />
			</Block>
		)}
}

export default Load
