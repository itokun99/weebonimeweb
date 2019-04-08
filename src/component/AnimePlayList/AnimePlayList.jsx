import React from 'react';
import styles from './AnimePlayList.module.css';


const AnimePlayList = (props) => {  
  return(
    <div className={styles.section}>
      <div className={styles.header}>
        <h4 className={styles.headerTitle}>{props.playlist.anime.anime_title}</h4>
        <span className={styles.headerInfo}>Jumlah Episode: {props.playlist.anime.anime_episode}</span>
        <span className={styles.headerStatus}>{props.playlist.anime.anime_status}</span>
      </div>
      <div className={styles.body}>
        <ul>
          {
            typeof(props.playlist.allPlayList) !== "undefined" && props.playlist.allPlayList.length > 0 ?
            props.playlist.allPlayList.map((list) => {
              return(
                <li className={list.play_id === props.playlist.currentEpisode.play_id ? styles.active : "" } onClick={() => props.changeVideo(list)} key={list.play_id}>{list.anime_play_title}</li>
              )
            })
            :
            "Loading..."
          }
        </ul>
      </div>
      <div className={styles.footer}>
        
      </div>
    </div>
  )
}

export default AnimePlayList;
