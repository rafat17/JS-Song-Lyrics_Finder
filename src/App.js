

import React, { Fragment, PureComponent } from 'react';
import './App.css';

//media queries
import './Media.css'

//gsap 
import {TimelineMax, TweenMax} from '../node_modules/gsap/all'
import {Power0} from '../node_modules/gsap/all'

//components
import Header from './components/Header'
import InputSection from './components/Input_Section'
import LyricsContainer from './components/Lyrics_Container'
import Loading from './components/loading/Loading'

//error component
import Error from './components/error/Error'

require('dotenv').config()

class App extends PureComponent{

	constructor() {
	  super()
    this.header_el = null
    this.inputsec_el = null
	  this.lyrics_cont = null
    this.error_el = null
    this.t1 = new TimelineMax({})
	  this.state = {
	  	lyrics: [],
	  	loading: false,
      scrollStatus: false,
	  	error_msg: null,
	  	connect_error: false,
	  }
	 
	}


//handles the clearing of the lyrics and error msgs off the screen
  ifClearToggled = () => {

    const {scrollStatus, lyrics, error_msg, connect_error } = this.state
    
    if(error_msg !== null || connect_error){
      
      this.errorDisappears(this.t1, this.error_el.el)
      
      if(connect_error) setTimeout(() => this.setState({connect_error: false}), 300) 
      else setTimeout(() => this.setState({error_msg: null}), 300)
      
      return null
    }

  	if(lyrics.length === 0) return null
    
    else {

  		const all_lyric_segments = Array.from(this.lyrics_cont.lyrics_cont.childNodes)
  		
  		const lyrics_left = all_lyric_segments.filter(curr => {
        return (curr.classList.contains('left'))
  		})
  		
  		const lyrics_right = all_lyric_segments.filter(curr => {
        return (curr.classList.contains('right'))
  		})

      this.lyricsGoOut(this.t1, lyrics_left, lyrics_right)
  		
  		setTimeout(() => this.setState({lyrics: []}), 1000) 
  	}
  }


//animates the error msg removal
   errorDisappears = (t, el) => {
     t
     .seek(0)
     .clear()
     .to(el, 0.3, {opacity: 0, y: -10, ease: Power0.easeNone})
  }


//animates the lyrics removal
  lyricsGoOut = (t, left, right) => {

    let left_tween = TweenMax.to(left, 0.7, { opacity: 0, xPercent: -200, ease: Power0.easeOut})
    let right_tween = TweenMax.to(right, 0.7, { opacity: 0, xPercent: 200, ease: Power0.easeOut})

    t
    .seek(0)
    .clear()
    .add('ff', '+=.2')
    .add([left_tween, right_tween], 'ff')
  }
 


//formats the inputs to be passed to the api link
  formatText = txt => {

    if (txt === null) return 
  	let txt_arr = txt.split(' ').filter((curr) => {return (curr !== "")})

  if(txt_arr.length === 0)return null

	txt = txt_arr.reduce((prev, curr) => {
		
	if(prev !== ''){return prev += '_' + curr}else{return prev = curr}}, '' )

	return txt
  }


//formats the lyrics from the api for readable display
  formatLyrics = lyrics => {
  	 return lyrics.split('\n\n').filter(curr => { return (curr !== "")})
  }
  

//perform request to the API for lyrics retrieval
//done using async await
  getLyricsData = async (song, artist) => {

    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)

    if(res.status === 200 || res.status === 404) return await res.json()

    throw new Error('Connection to the server lost !')
  }


//handles the lyrics retrieval from the API
//plus formatting to be passed to the componnents
  getLyrics = (song, artist) => {

    const {scrollStatus, lyrics, connect_error, error_msg} = this.state

    const song_format = this.formatText(song)
    const artist_format = this.formatText(artist)

    if(this.lyrics_cont) this.setState({lyrics_cont: null })
    if(scrollStatus) this.setState({scrollStatus: false })
    if(lyrics.length !== 0) this.setState({ lyrics: [] })
    if(connect_error) this.setState({ connect_error: false })
    if(error_msg) this.setState({ error_msg: null })

    if((song_format === null || song_format === undefined) || (artist_format === null || artist_format === undefined)){
      return null
    }

    this.setState({loading: true })

    this.getLyricsData(song_format, artist_format)
    .then(data => {
      
      if(data.error) this.setState({error_msg: data.error })
      
      else if(data.lyrics === "") this.setState({error_msg: "No lyrics found !"})
      
      else{

        const lyrics_arr = this.formatLyrics(data.lyrics)
        this.setState({ lyrics: lyrics_arr })
      }
      
      this.setState({loading: false})
    
    })   
    .catch(err => {
      this.setState({loading: false})
      this.setState({connect_error: true})
    })
  }

 componentDidUpdate(){

   if(this.lyrics_cont){

   const totalHeight = this.header_el.el.offsetHeight + 
                       this.inputsec_el.el.offsetHeight + 
                       this.lyrics_cont.lyrics_cont.offsetHeight

   if(totalHeight > window.outerHeight) this.setState({scrollStatus: true })
 } else this.setState({scrollStatus: false })
 
}

  render(){

  	const {scrollStatus, connect_error, error_msg, loading , lyrics } = this.state
    
    return (
    	<Fragment>
    	 <Header ref={div => this.header_el = div } clearToggled = {this.ifClearToggled} />
    	 <InputSection ref={div => this.inputsec_el = div } getlyrics = {this.getLyrics} />
       { 

         (loading) ? 
         <Loading /> 
         :(error_msg !== null) ?
         <Error ref={div => this.error_el = div } msg={ <span><strong>ERROR 404 !</strong> {error_msg} &#128543;</span> } />
         :(connect_error) ? 
         <Error ref={div => this.error_el = div } msg={<span>Server Connection Lost ! &#128543;</span>} />
         :(lyrics.length !== 0) ? 
         <LyricsContainer ref={div => { this.lyrics_cont = div }} lyrics={lyrics} />
         : null

       }
       <footer className={(scrollStatus) ? 'custom' : 'default' }>created By Rafatul_Alam</footer>
      </Fragment>
    )}
  }

export default App