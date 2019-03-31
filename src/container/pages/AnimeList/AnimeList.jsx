import React, {Component, Fragment} from 'react';
import style from './AnimeList.module.css';
import AnimeAPI from '../../../service/Service';
import AnimeCard from '../../../component/AnimeCard/AnimeCard';

const SearchField = (props) => {
  return(
    <div className={style.searchSection}>
      <h4>Cari Anime</h4>
      <input onChange={(e) => props.onSearch(e.target.value)} type="text" placeholder="Search.." name="search_input" />
    </div>
  );
}

class AnimeList extends Component {
  constructor(props){
    super(props)
    this.state = {
      animes : [],
      animesOnSearch : [],
      onSearch : false,
      inputText : ""
    }
  }
  
  handleGetAnimes = () => {
    let params = {
      order_by : "anime_title"
    }
    AnimeAPI.getAnime(params).then((response) => {
      if(response.status === true){
        let animes = response.data
        let prevState = [...this.state.animes];
        prevState = animes.sort()
        this.setState({
          animes : prevState
        })
      } else {
        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  handleLinkToPost = (anime_mal_id, anime_title, anime_data) => {
    this.props.history.push(`/anime/${anime_mal_id}/${anime_title}`, anime_data);
  }
  
  handleSearch = (inputText) => {
    if(inputText !== ""){
      let resultAnime = [];
      let animes = [...this.state.animes];
      animes.forEach((anime) => {
        let searchResult = anime.anime_title.toLowerCase().indexOf(inputText.toLowerCase()) 
        if(searchResult !== -1 && searchResult !== "undefined"){
          resultAnime.push(anime)
        }
      })
      this.setState({
        animesOnSearch : resultAnime,
        onSearch : true,
        inputText : inputText
      })
    } else {
      this.setState({
        animesOnSearch : [],
        onSearch : false,
        inputText : inputText
      })
    }
  }
  
  componentDidMount(){
    this.handleGetAnimes();
    document.title = "Anime List - Cari Daftar Anime Favorit"
  }
  
  render(){
    let alphabeta = [];
    
    this.state.animes.map((anime, index) => {
      if(alphabeta.length === 0){
        alphabeta.push(anime.anime_title[0].toUpperCase())
        return alphabeta;
      }
      let hasSameAlphaBeta = false;
      alphabeta.find((value) => {
        if(anime.anime_title[0].toUpperCase() === value){
          hasSameAlphaBeta = true;
          return true;
        } else {
          return false;
        }
      })
      if(!hasSameAlphaBeta){
        alphabeta.push(anime.anime_title[0].toUpperCase());
      }
      return hasSameAlphaBeta;
    })
    return(
      <div className={style.animeListSection}>
        <div className={style.animeListHeader}>
          <SearchField onSearch={(inputText) => this.handleSearch(inputText)} />
        </div>
        <div className={style.animeListBody}>
          <div className={style.animeListBlock}>
            {
              this.state.onSearch?
                this.state.animesOnSearch.length > 0 ?
                  <div className={style.animeListRow}>
                  {
                    this.state.animesOnSearch.map((anime) => {
                      return(
                        <AnimeCard key={anime.anime_mal_id} animeData = {anime} linkToPost={(mal_id, anime_title, anime) => this.handleLinkToPost(mal_id, anime_title, anime)} />
                      );
                    })  
                  }
                  </div>
                :
                <div className={style.animeListRow}>
                  <p style={{textAlign : "center", width : "100%"}}>Tidak ada pencarian dengan kata kunci : {this.state.inputText}</p>
                </div>
              : 
              alphabeta.map((alpha, index) => {
                let has = false;
                this.state.animes.forEach((anime) => {
                  if(anime.anime_title[0].toUpperCase() === alpha){
                    has = true
                  }
                })
                if(has){
                  return(
                    <Fragment key={index}>
                      <h4 id={alpha}><a href={`#${alpha}`}>{alpha}</a></h4>
                      <div className={style.animeListRow}>
                        {
                          this.state.animes.map((anime, index) => {
                            if(anime.anime_title[0].toUpperCase() === alpha){
                              return(
                                <AnimeCard key={anime.anime_mal_id} animeData = {anime} linkToPost={(mal_id, anime_title, anime) => this.handleLinkToPost(mal_id, anime_title, anime)} />
                              )
                            } else {
                              return "";
                            }
                          })
                        }
                      </div>
                    </Fragment>
                  )
                } else {
                  return false;
                }
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default AnimeList;