const APIURL=  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bdc5c5d47d4a215c6ac5150d5018e676"
const APIKEY ="api_key=bdc5c5d47d4a215c6ac5150d5018e676"
const IMGPATH = "https://image.tmdb.org/t/p/w1280"


/*
* Fetches data from TMDB's API and return the parsed response data
*/ 
async function getMovies() {
    const resp = await fetch(APIURL);
    const respData = await resp.json();
    const main = document.querySelector("main")
    respData.results.forEach(movie => {
      const { poster_path, title, vote_average } = movie;
  
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie')
      movieEl.innerHTML = `
        <img src="${IMGPATH + poster_path}" alt="$(title)">
        <div class="movieInfo"> 
          <h3>${title}</h3>
          <span>${vote_average}</span>
        </div> 
      `
      main.appendChild(movieEl)
    })
    return respData
  }

getMovies()

// async function logMovies() {
//     const movies = await getMovies();
//     console.log(movies);
//   }
  
//   logMovies();
