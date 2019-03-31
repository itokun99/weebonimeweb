// setting service
const config = {
  onlinePath : "http://192.168.100.7/weebonime/",
  offlinePath : "http://localhost/weebonime/",
  isOnline : true,
}

const Get = (path, status) => {
  let promise = new Promise((resolve, reject) => {
    let url = `${status ? config.onlinePath : config.offlinePath}${path}`
    fetch(url,{
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      }
    }).then((response) => {
      if(response.ok){
        resolve(response.json());
      } else {
        console.log(response)
        reject(new Error('error'))
      }
    },  (error) => {
      console.log(error)
      reject(new Error(error))
    })
  });
  return promise;
}

const getAnime = (obj = null) => {
  if(obj !== null ){
    if(typeof(obj.id) === "undefined" || obj.id === "" || obj.id === null){
      obj.id = null;
    }
    if(typeof(obj.mal_id) === "undefined" || obj.mal_id === "" || obj.mal_id === null){
      obj.mal_id = null;
    }
    if(typeof(obj.order_by) === "undefined" || obj.order_by === "" || obj.order_by === null){
      obj.order_by = null
    }
  }
  let path = `api/animes${obj === null ? "" : obj.id === null ? "" : "?anime_id=" + obj.id}${obj === null ? "" : obj.mal_id === null ? "" : obj.id === null ? "?anime_mal_id=" + obj.mal_id : "&anime_mal_id=" + obj.mal_id}${obj === null ? "" : obj.order_by === null ? "" : obj.id === null && obj.mal_id === null ? "?order_by=" + obj.order_by :  "&order_by=" + obj.order_by  }`;
  
  return Get(path, config.isOnline);
}

const getAnimeFromMal = (id = null) => {
  let path = `api/grab-anime${id === null ? "" : "?id=" + id}`;
  return Get(path, config.isOnline);
}

const getAnimePlayList = (anime_mal_id, anime_play_quality) => {
  let path = `api/playlist?anime_mal_id=${anime_mal_id}&anime_play_quality=${anime_play_quality}`;
  return Get(path, config.isOnline);
}

const getAnimeCounter = () => {
  let path = 'api/counter2';
  return Get(path, config.isOnline);
}

const AnimeAPI = {
  getAnime,
  getAnimeFromMal,
  getAnimeCounter,
  getAnimePlayList,
}

export default AnimeAPI;