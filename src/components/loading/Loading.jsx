import React, {Component} from 'react';
import '../../Loading.css';

//components
import Load from './Load'

class Loading extends Component{

  constructor() {
    super()
    this.circles = []
  }

  render(){
  return (
    <div className="wrapper">
    <Load circles={this.circles} />
    </div>
  )}
}


export default Loading;
