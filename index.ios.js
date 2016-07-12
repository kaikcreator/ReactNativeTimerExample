/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  AppRegistry,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import formatTime from 'minutes-seconds-milliseconds';

import Button from './components/button';

const watchStates = {
  RUNNING: Symbol('running'),
  PAUSED: Symbol('paused'),
  STOPPED: Symbol('stopped')
}

class stopwatch extends Component {
  constructor(props){
    super(props);

    this.state = {
      timeElapsed: null,
      running: watchStates.STOPPED,
      startTime: null,
      pauseTime: null,
      laps: []
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.header]}>
          <View style={[styles.timerWrapper]}>
            <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={[styles.buttonWrapper]}>
            {this.startStopButton()}
            {this.lapButton()}
            {this.pauseButton()}
          </View>
        </View>

        <View style={[styles.footer]}>
          {this.laps()}
        </View>
      </View>
    );
  }

  laps(){
    return this.state.laps.map((time, index) =>{
      return (
        <View style={styles.lap}>
          <Text style={styles.lapText}>
            Lap #{index + 1 + ' - '} 
          </Text>
          <Text style={styles.lapText}>
            {formatTime(time)}
          </Text>
      </View>
      );
    })
  }

  startStopButton(){
    var style = this.state.running != watchStates.STOPPED ? styles.stopButton : styles.startButton;
    return(
      <Button
        onPress={this.handleStartPress.bind(this)}
        style={[styles.button, style]}
        underlayColor="gray"
        label={this.state.running != watchStates.STOPPED ? 'Stop' : 'Start'}
       />
    );
  }

  lapButton(){
    return(
      <Button
        onPress={this.handleLapPress.bind(this)}
        style={styles.button}
        underlayColor="gray"
        label='Lap'
        disabled={this.state.running != watchStates.RUNNING }
       />

    );
  }

  pauseButton(){
    return(
      <Button
        onPress={this.handlePausePress.bind(this)}
        style={styles.button}
        underlayColor="gray"
        label={this.state.running == watchStates.RUNNING ? 'Pause' : 'Continue'}
        disabled={this.state.running == watchStates.STOPPED }
       />      
    );
  }


  

  handleLapPress(){
    if(this.state.running == watchStates.RUNNING){
      var lap = this.state.timeElapsed;

      this.setState({
        startTime: new Date(),
        pauseTime: null,
        laps: this.state.laps.concat([lap])
      })
    }
  }


  handlePausePress(){

    if(this.state.running == watchStates.RUNNING){
      clearInterval(this.interval);
      this.setState(
        {
          timeElapsed: new Date() - this.state.startTime,
          running: watchStates.PAUSED,
          pauseTime: new Date()
        }
      );
      return
    }

    //move forward the start time just the interval the clock has been paused
    let newStartTime = new Date(this.state.startTime.valueOf() + (new Date().valueOf() - this.state.pauseTime.valueOf()) );

    this.setState(
      {
        pauseTime: null,
        startTime: newStartTime
      }
    );

    this.runClock();
  }


  handleStartPress(){
    
    if(this.state.running != watchStates.STOPPED){
      clearInterval(this.interval);
      this.setState({running:watchStates.STOPPED});
      return
    }

    this.setState(
      {
        startTime: new Date(),
        pauseTime: null,
      });

    this.runClock();

  }


  runClock(){
    let self = this;
    this.interval = setInterval(() => {
          self.setState({
            timeElapsed: new Date() - self.state.startTime,
            running: watchStates.RUNNING
          });
    }, 30)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1, //fill the entire screen
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  header:{
    flex:1,
  },
  footer:{
    flex:1,
  },
  timerWrapper:{
    flex:5, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper:{
    flex:3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer:{
    fontSize: 60
  },
  button:{
    borderWidth:2,
    height: 100,
    width: 100,
    borderRadius:50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton:{
    borderColor: '#00CC00'
  },
  stopButton:{
    borderColor: '#CC0000'
  },
  lap:{
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  lapText:{
    fontSize: 30
  }
});

AppRegistry.registerComponent('stopwatch', () => stopwatch);
