import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const playlist = {
	"result": {
		"tracks": [
			{
				"name": "Sold Out",
				"artists":{"name": "Hawk Nelson"},
				"album": {"name": "Diamonds"},
				"duration": 213000,
				"mp3Url": "http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3"
			},
			{
				"name": "Stayin' Alive",
				"artists":{"name": "Bee Gees"},
				"album": {"name": "Their Greatest Hits: The Record"},
				"duration": 284000,
				"mp3Url": "http://sc1.111ttt.cn:8282/2018/1/03m/13/396131228287.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3"
			},
			{
				"name": "Tonight",
				"artists":{"name": "Ken Laszlo"},
				"album": {"name": "Tonight / 1.2.3.4.5.6.7.8"},
				"duration": 348000,
				"mp3Url": "http://sc1.111ttt.cn:8282/2018/1/03m/13/396131203208.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3"
			}
		]
	}
}

class Button1 extends React.Component{
	render(){
		return(<button id="button1" onClick={this.props.onclick}>{this.props.value}</button>);
	}
}

class Button2 extends React.Component{
	render(){
		return(<button id="button2" onClick={this.props.onclick}>next</button>);
	}
}

class Button3 extends React.Component{
	render(){
		return(<button id="button3" onClick={this.props.onclick}>prev</button>);
	}
}

class Timebar extends React.Component{
	render(){
		return(<div className="progress" style={{height:20, width:this.props.progress, backgroundColor:'Black'}}></div>);
	}
}
	
class Player extends React.Component{
	constructor(){
		super();
		this.state = {
			currentTrackLen: playlist.result.tracks.length,
			currentTrackIndex: 0,
			currentTime: 0,
			currentTotalTime: 0,
			isPlaying: false
		}
	}
	
	updateState(){
		this.setState({currentTotalTime: playlist.result.tracks[this.state.currentTrackIndex].duration / 1000});
	}
	
	playpause(){
		this.setState({isPlaying:!this.state.isPlaying});
		let audio = document.getElementById('audio');
		if(this.state.isPlaying){
			audio.pause();
		}else{
			audio.play();
		}
		alert(this.state.isPlaying);
	}
	
	playnext(){
		if(this.state.currentTrackIndex+1 >= this.state.currentTrackLen){
		}else{
		this.setState({
			currentTrackIndex:this.state.currentTrackIndex+1
		})
		this.updateState();
		alert(this.state.currentTrackIndex+1);
		}
	}
	
	playprev(){
		if(this.state.currentTrackIndex <= 0){
		}else{
		this.setState({
			currentTrackIndex:this.state.currentTrackIndex-1
		})
		this.updateState();
		alert(this.state.currentTrackIndex-1);
		}
	}
	
	render(){
		let valueName;
		if(this.state.isPlaying){
			valueName="pause"
		}else{
			valueName="play"
		}
		return(
			<div className="player">
				<Button1 value={valueName} onclick={()=>this.playpause()}/>
				<Button2 onclick={()=>this.playnext()}/>
				<Button3 onclick={()=>this.playprev()}/>
				<div>{playlist.result.tracks[this.state.currentTrackIndex].name}</div>
				<Timebar progress={this.state.currentTime / this.state.currentTotalTime * 100 + '%'}/>
				<audio id="audio" src={playlist.result.tracks[this.state.currentTrackIndex].mp3Url}></audio>
			</div>
		)
	}
	
	componentDidMount(){
		this.updateState();
		setInterval(
			()=>{
				let audio = document.getElementById('audio');
				this.setState({currentTime: audio.currentTime});
			},1000)
	}
}





ReactDOM.render(
	<Player />,
	document.getElementById('root')
);

