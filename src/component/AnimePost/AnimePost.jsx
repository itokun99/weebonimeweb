import React from 'react';
import style from './AnimePost.module.css';


const AnimePost = (props) => {
  let anime = props.anime;
  if(typeof(anime.anime_sinopsis) !== 'undefined'){
    anime.anime_sinopsis = props.anime.anime_sinopsis
    .replace("&amp;","&")
    .replace("&gt;",">")
    .replace("&lt;", "<")
    .replace("& quot;",'"')
    .replace("&quot;",'"')
    .replace("& Quot;",'"')
    .replace("& mdash;", "—")
  }
  const PlayList = (data) => {
    return(
      <tr>
        <td>{data.playdata.anime_play_title}</td>
        <td style={{width : 150, textAlign : "center"}}>Watch!</td>
      </tr>
    )
  }
  
  if(typeof(anime.anime_play_data) !== "undefined"){
    console.log(anime.anime_play_data.play360);
  }
  return(
    <div className={style.animePostComponent}>
      <div className={style.animePostBody}>
        <div className={style.animePostRow}>
          <div className={style.animePostLeft}>
            <div className={style.animeCover}>
              <img className={style.animeCoverPic} src={anime.anime_poster} alt={anime.anime_title} title={anime.anime_title} />
            </div>
            <div className={style.animeInfo}>
              <ul>
                <li><span className={style.infoTitle}>Title:</span><span>{anime.anime_title}</span></li>              
                <li><span className={style.infoTitle}>Japanese:</span><span>{anime.anime_alternative}</span></li>
                <li><span className={style.infoTitle}>Status:</span><span>{anime.anime_status}</span></li>
                <li><span className={style.infoTitle}>Type:</span><span>{anime.anime_type}</span></li>
                <li><span className={style.infoTitle}>Genre:</span><span>{anime.anime_genre}</span></li>
                <li><span className={style.infoTitle}>Score:</span><span>{anime.anime_score}</span></li>
                <li><span className={style.infoTitle}>Total Eps:</span><span>{anime.anime_episode}</span></li>
                <li><span className={style.infoTitle}>Duration per Eps:</span><span>{anime.anime_duration}</span></li>
                <li><span className={style.infoTitle}>Studio:</span><span>{anime.anime_studios}</span></li>                
                <li><span className={style.infoTitle}>Release:</span><span>{anime.anime_release}</span></li>
              </ul>
            </div>
          </div>
          <div className={style.animePostRight}>
            <div className={style.animeSinopsis}>
              <h2 className={style.animePostTitle}>{props.anime.anime_title}</h2>
              <p dangerouslySetInnerHTML={{__html : anime.anime_sinopsis}}></p>
            </div>
            <div className={style.animeEpsList}>
              <table>
                <thead>
                  <tr>
                    <th>Episode</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                {typeof(anime.anime_play_data) !== "undefined" ?
                  (anime.anime_play_data.play360.length > 0) ?
                    anime.anime_play_data.play360.map((data) => {
                      return(
                        <PlayList key={data.play_id} playdata={data} />
                      )
                    })
                  :
                    <tr>
                      <td>Tidak ada data apapun</td><td style={{textAlign:"center"}}><span>Download</span></td>
                    </tr>  
                :
                <tr>
                  <td>Tidak ada data apapun</td><td><span>Download</span></td>
                </tr>
                }
                </tbody>
              </table>
            </div>
          </div>
          <div className={style.animePostBottom}>
            <div className={style.animeVideo}>
              <p>Bawah</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimePost;