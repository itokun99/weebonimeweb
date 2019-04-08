import React from 'react';
import styles from './AnimeVideoPlayer.module.css';
import {Player} from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";

const AnimeVideoPlayer = (props) => {  
  return(
    <div className={styles.videoSection}>
      <div className={styles.videoResponsive}>
        <Player
          autoPlay
          playsInline
          poster = ""
          src={props.video.anime_play_link}
        />
      </div>
    </div>
  );
}
export default AnimeVideoPlayer;