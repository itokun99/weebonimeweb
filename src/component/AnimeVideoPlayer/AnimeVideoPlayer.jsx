import React, {Component} from 'react';
import styles from './AnimeVideoPlayer.module.css';
import {Player} from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";
import ReactPlayer from 'react-player';


// const AnimeVideoPlayer = (props) => {  
//   return(
//     <div className={styles.videoSection}>
//       <div className={styles.videoResponsive}>
//         {/* <Player
//           autoPlay
//           playsInline
//           poster = ""
//           src={props.video.anime_play_link}
//         /> */}

//       </div>
//     </div>
//   );
// }

class AnimeVideoPlayer extends Component {
  state = {
    url: null,
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  }
  
  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  stop = () => {
    this.setState({ url: null, playing: false })
  }
  toggleControls = () => {
    const url = this.state.url
    this.setState({
      controls: !this.state.controls,
      url: null
    }, () => this.load(url))
  }
  toggleLight = () => {
    this.setState({ light: !this.state.light })
  }
  toggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  toggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }
  setPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }
  togglePIP = () => {
    this.setState({ pip: !this.state.pip })
  }
  onPlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }
  playToggle = () => {
    this.setState({
      playing : !this.state.playing
    })
  }
  onEnablePIP = () => {
    console.log('onEnablePIP')
    this.setState({ pip: true })
  }
  onDisablePIP = () => {
    console.log('onDisablePIP')
    this.setState({ pip: false })
  }
  onPause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  onProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  onEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }
  onDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }
  // onClickFullscreen = () => {
  //   screenfull.request(findDOMNode(this.player))
  // }
  renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }
  ref = player => {
    this.player = player
  }
  
  render(){
    const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state
    const SEPARATOR = ' · ';
    
    return(
      <div className={styles.customPlayer}>
        <div className={styles.playerWrapper}>
          <ReactPlayer
            ref={this.ref}
            autoPlay = {false}
            className={styles.reactPlayer}
            width='100%'
            height='100%'
            url={this.props.video.anime_play_link}
            pip={pip}
            playing={playing}
            controls={controls}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onReady={() => console.log('onReady')}
            onStart={() => console.log('onStart')}
            onPlay={this.onPlay}
            onEnablePIP={this.onEnablePIP}
            onDisablePIP={this.onDisablePIP}
            onPause={this.onPause}
            onBuffer={() => console.log('onBuffer')}
            onSeek={e => console.log('onSeek', e)}
            onEnded={this.onEnded}
            onError={e => console.log('onError', e)}
            onProgress={this.onProgress}
            onDuration={this.onDuration}
          />
        </div>
        <div className={styles.customPlayerLayer}>
          <div className={styles.customControl}>
            <div className={styles.leftControl}>
              <span className={styles.playButton} onClick={this.playToggle}>{this.state.playing ? "Jeda" : "Mainkan"}</span>
            </div>
            <div className={styles.sliderControl}>
              
            </div>
            <div className={styles.rightControl}>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}





export default AnimeVideoPlayer;