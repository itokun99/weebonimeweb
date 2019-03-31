import React, {useState, useEffect} from 'react';
import style from './AnimeStack.module.css';
import AnimeCard from '../AnimeCard/AnimeCard';


const AnimeStack  = (props) => {
  const animeData = props.animeData;
  const [anime_data, onSearch] = useState(props.animeData);
  const [inputText, onInput] = useState("");
  
  const handleContent = (text) => {
    if(text !== ""){
      let resultAnime = [];
      let animes = [...animeData];
      animes.forEach((anime) => {
        let searchResult = anime.anime_title.toLowerCase().indexOf(text.toLowerCase()) 
        if(searchResult !== -1 && searchResult !== "undefined"){
          resultAnime.push(anime)
        }
      })
      onSearch(resultAnime);
    } else {
      onSearch(animeData);
    }
  }
  useEffect(() => {
    handleContent(inputText)
  })
  return(
    <div className={style.stackWrapper}>
      <div className={style.stackHeader}>
        <h4 className={style.stackTitle}>{props.title}</h4>
        <div className={style.stackSearch}>
          <input onChange = {(e) => onInput(e.target.value)} type="text" defaultValue="" placeholder="search.." />
        </div>
      </div>
      <div className={style.stackBody}>
        <div className={style.animeCardRow}>
          {
            anime_data.length > 0 ?
            anime_data.map((anime, index) => {
              return(
                <AnimeCard linkToPost={ (mal_id, anime_title, anime) => props.linkToPost(mal_id, anime_title, anime)} key={index} animeData={anime} />
              )    
            })
            :
            <div style={{textAlign : "center", width : "100%"}}>
              <span>Tidak ada hasil dari: <b>{inputText}</b></span>
            </div>
          }
        </div>
      </div>
      <div className={style.stackFooter}>

      </div>
    </div>
  );
}

export default AnimeStack;