import React, {Component} from 'react'

//components
import Input from './Input'
import Button from './Button'

//fontawesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)

class InputSection extends Component{

	constructor(props) {
	  super(props);

      this.el = null
	  this.state = {
	  	artist: null,
	  	song: null,
	  };
	}

	setInput = e => {
		this.setState({ [e.currentTarget.id] : e.currentTarget.value})
	}

	getInput = () => {
		this.props.getlyrics(this.state.song, this.state.artist)
	}

	_onKeyPressed = e => {
		console.log(typeof(e.key))
		if(e.key === "Enter"){
			this.setInput(e)
			this.getInput()
		}
	}


	render(){
	return(
		 <div ref={ div => this.el = div } className="input_section">
		   <div className="input_container">
		     <Input id="song" name="Song" setInput={this.setInput} _onKeyPressed={this._onKeyPressed} />
    	     <Input id="artist" name="Artist" setInput={this.setInput} _onKeyPressed={this._onKeyPressed} />
		   </div>
    	   <Button btn_class="search_btn" btn_icon={faSearch} perform={this.getInput}/>
    	 </div>
	)}
}


export default InputSection

