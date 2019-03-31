import React, {Component, createContext, Fragment} from 'react';
import AnimeAPI from '../service/Service';
import Loading from '../component/LoadingScreen/Loading';


const RootContext = createContext();
const Provider = RootContext.Provider;

const GlobalProvider = (ChildProviderComponent) => {
  return(
    class ParentProviderComponent extends Component {
      constructor(props){
        super(props)
        this.state = {
          Author : "Code Pelajar",
          counter : 0,
          Anime : [],
        }
        this.handleGetAnime()
      }
      
      dispatch = () => {

      }
      
      handleAnimeCounter = () => {
        AnimeAPI.getAnimeCounter().then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error)
        }).catch((error) => {
          console.log(error)
        })
      }

      handleGetAnime = () => {
        AnimeAPI.getAnime()
        .then((response) => {
          if(response.status === true){
            let anime = response.data
            anime.reverse()
            this.setState({
              Anime : anime
            })
          } else {
            console.log(response)
          }
        }, (error) => {
          console.log(error);
        })
        .catch((error) => {
          console.log(error)
        })
      }
      
      handleGetAnimeFromMal = (id) => {
        AnimeAPI.getAnimeFromMal(id).then((response) => {
          if(response.status === true){
            let animeInfo = response.anime_info;
            let animeState = [...this.state.Anime];
            
            animeState.push(animeInfo);
            this.setState({
              Anime : animeState,
              counter : this.state.counter + 1
            })
          } else {
            console.log(response)
          }
        }, (response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      }

      handleSendAnimeProps = () => {
        let hasUpdate = true
        return hasUpdate
      }

      componentDidMount(){
        
      }

      componentDidUpdate(){
        
      }

      componentWillMount(){
        this.handleSendAnimeProps()
      }

      componentWillUnmount(){
        
      }

      render(){
        let GlobalState = {
          RootState : this.state,
          RootAction : this.dispatch, 
        }
        return(
          <Provider value={GlobalState}>
            
            {
              this.state.Anime.length > 0 ?
                <Fragment>
                  <Loading willHide={{transition : 1, opacity : 0, zIndex : -10}} />
                  <ChildProviderComponent {...this.props} />
                </Fragment>
               : 
                <Fragment>
                  <Loading />
                  <ChildProviderComponent />
                </Fragment>
            }
          </Provider>
        );
      }
    }
  )
}

const Consumer = RootContext.Consumer;
export const GlobalConsumer = (ChildConsumerComponent) => {
  return(
    class ParentConsumerComponent extends Component {
      render(){
        return(
          <Consumer>
            {
              (value) => {
                return(
                  <ChildConsumerComponent {...value} {...this.props} />
                )
              }
            }
          </Consumer>
        );
      }
    }
  )
}

export default GlobalProvider;