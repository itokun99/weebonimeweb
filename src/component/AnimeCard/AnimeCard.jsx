import React from 'react';
import style from './AnimeCard.module.css';

const AnimeCard = (props) => {
  let lastEpisode = props.animeData.anime_play_data.play360;
  let lastEpsText = "no data";
  if(lastEpisode.length > 0){
    lastEpsText = lastEpisode[0].anime_play_title;
  }
  let title = props.animeData.anime_title.split(" ").join("-").toLocaleLowerCase();
  
  return(
    <div data-id={props.animeData.anime_id} data-mal-id={props.animeData.anime_mal_id} className={style.animeCard}>
      <div className={style.animeCardItem}>
        <div className={style.animeCardImage}>
          <img src={props.animeData.anime_poster} alt={props.animeData.anime_title} />
        </div>
        <div className={style.animeCardBody}>
          <h2 onClick={() => props.linkToPost(props.animeData.anime_mal_id, title, props.animeData)} className={style.animeCardTitle}>{props.animeData.anime_title}</h2>
          <span className={style.animeCardLastUp}>{lastEpisode.length > 0 ? lastEpsText : "No data"}</span>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;