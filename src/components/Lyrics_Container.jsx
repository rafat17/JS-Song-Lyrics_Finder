import React, {Component } from 'react'
import Lyrics from './Lyrics'

//gsap
import {TimelineMax, TweenMax} from '../../node_modules/gsap/all'
import {Back} from '../../node_modules/gsap/all'


class LyricsContainer extends Component{

	constructor(props) {
	  super(props);
	  this.lyrics_cont = null
	}

	componentDidMount(){

			let left = Array.from(this.lyrics_cont.querySelectorAll('.left'))
			let right = Array.from(this.lyrics_cont.querySelectorAll('.right'))
			let t1 = new TimelineMax({})
			let left_tween = TweenMax.to(left, 0.8, {opacity: 1, x: 0, ease: Back.easeOut})
			let right_tween = TweenMax.to(right, 0.8, {opacity: 1, x: 0, ease: Back.easeOut})

			 t1
			 .add('ff', '+=.2')
			 .add([left_tween, right_tween], 'ff')
	}

	render(){ 
		return (
			<div className='lyrics_container' ref={div => {this.lyrics_cont= div}}>
			   { this.props.lyrics.map((curr, index) =>{ 
			   	   return <Lyrics class={((index + 1)%2 === 0)? 'right': 'left'} key={'lyrics-'+index} line={curr} />  
			   }) }
			</div>
			)
	}
}


export default LyricsContainer


