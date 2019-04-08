import React, {Component} from 'react';
import style from './Home.module.css';
import ContentWrapper from '../../template/ContentWrapper/ContentWrapper'
import AnimeStack from '../../../component/AnimeStack/AnimeStack';
import {GlobalConsumer} from '../../../context/Context';
class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      animeData : []
    }
  }

  handleAnimeData = () => {
    let animeData = [...this.state.animeData]
    setTimeout(() => {
       animeData = this.props.RootState.Anime;
       this.setState({
        animeData : animeData
       })
    }, 100 )
  }
  
  handleLinkToPost = (anime_mal_id, anime_title, anime_data) => {
     this.props.history.push(`/anime/${anime_mal_id}/${anime_title}`, anime_data);
  }
  
  handleLinkToPlayer = (anime_mal_id, anime_title,anime_play_id, anime_play_title, anime_data) => {
    this.props.history.push(`/anime/${anime_mal_id}/${anime_title}/${anime_play_id}/${anime_play_title}`, anime_data);
  }
  
  
  componentDidMount(){
    this.handleAnimeData();
    document.title = "Weebonime - Nonton dan Download Anime Sepuasnya";
    document.getElementsByTagName('html')[0].scrollTop = 0
  }
  
  componentWillReceiveProps(){
    this.handleAnimeData();
  }

  render(){
    // alert("test");
    return(
      <div className={style.homeComponent}>
        <AnimeStack
          title="Latest Update"
          animeData = {this.state.animeData}
          linkToPlayer = {(anime_mal_id, anime_title, anime_play_id,anime_play_title, anime_data) => this.handleLinkToPlayer(anime_mal_id, anime_title, anime_play_id, anime_play_title, anime_data)}
          linkToPost = {(mal_id, anime_title, anime) => this.handleLinkToPost(mal_id, anime_title, anime)} 
        />
        {/* <AnimeStack
          title="Popular Anime"
          animeData = {this.state.animeData}
          linkToPost = {(mal_id, anime_title, anime) => this.handleLinkToPost(mal_id, anime_title, anime)} 
        /> */}
      </div>
    );
  }
}
export default GlobalConsumer(ContentWrapper(Home));