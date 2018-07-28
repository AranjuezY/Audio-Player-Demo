import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class App extends React.Component{
	constructor(props){
		super(props);
		this.currentAudio = React.createRef();
		this.state = {
			currentTrackIndex: 0,
			isRandom: false,
		}
	}
	
	
	onplaypause(){
		if(this.currentAudio.current.paused){
			this.currentAudio.current.play();
		}else{
			this.currentAudio.current.pause();
		}		
	}
	
	onnext(){
		if(this.state.currentTrackIndex+1 >= playlist.result.tracks.length){}else{
			this.setState(
				{currentTrackIndex:this.state.currentTrackIndex+1},
				()=>{this.currentAudio.current.setAttribute("src",playlist.result.tracks[this.state.currentTrackIndex].mp3Url)}
			)
		}
	}
	
	onprevious(){
		if(this.state.currentTrackIndex <= 0){}else{
			this.setState(
				{currentTrackIndex:this.state.currentTrackIndex-1},
				()=>{this.currentAudio.current.setAttribute("src",playlist.result.tracks[this.state.currentTrackIndex].mp3Url)}
			)
		}
	}
	
	//进度条回调，debugging
	changeCurrentTime(e){
		this.currentAudio.current.currentTime = e.target.value;
	}
	
	render(){

		return(
			<div className="player">
				<audio id='audio' src={playlist.result.tracks[this.state.currentTrackIndex].mp3Url} ref={this.currentAudio}></audio>
				<Display trackName={playlist.result.tracks[this.state.currentTrackIndex].name} currentTime={''} totalTime={''} />
				<Control onPlayPause={()=>this.onplaypause()} onNext={()=>this.onnext()} onPrevious={()=>this.onprevious()} onInput={this.changeCurrentTime.bind(this)}/>
			</div>
		)
	}

}

class Control extends React.Component{
	render(){
		return(
			<div className="control">
				<button onClick={this.props.onPlayPause}>^_^</button>
				<button onClick={this.props.onNext}>next</button>
				<button onClick={this.props.onPrevious}>previous</button>
				<input type="range" id="testbar" defaultValue="0" onInput={()=>{this.props.onInput}}></input>
			</div>	
		)
	}
}

//显示组件props不能正常传入
class Display extends React.Component{
	timeConvert(timestamp){
		let minutes = Math.floor(timestamp / 60);
		let seconds = Math.floor(timestamp - (minutes * 60));
		if(seconds < 10) {
			seconds = '0' + seconds;
		}
        timestamp = minutes + ':' + seconds;
        return timestamp;
    }
	render(){
		return(
			<div className="Display">
				<p>{this.props.trackName}</p>
				<p>{this.timeConvert(this.props.currentTime)}</p>
				<p>{this.timeConvert(this.props.totalTime)}</p>
			</div>
		)
	
	}
}

export default App;
