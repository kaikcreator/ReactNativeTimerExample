
import React, { Component } from 'react';

import {
  Text,
  TouchableHighlight
} from 'react-native';



class button extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        disabled: false,
        disabledStyle: {opacity: 0.5} 
    };
  }

  componentWillMount(){
    if(this.props.disabled != this.state.disabled)
      this.setState({disabled: this.props.disabled})    
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.disabled != this.state.disabled)
      this.setState({disabled: nextProps.disabled})
  }

  onPress(){
    console.log("component disabled ? ", this.state.disabled);
      if(this.state.disabled)
        return;
    else    
        this.props.onPress();
  }

  render() {
    var style = this.state.disabled ? this.state.disabledStyle : null;
    console.log(this.state.disabled);
    return (
    <TouchableHighlight
      underlayColor={this.props.underlayColor}
      onPress={this.onPress.bind(this)} 
      style={[this.props.style, style]}
      >
        <Text>
            {this.props.label}
        </Text>
      </TouchableHighlight>
    );
  }
};


export default button;