const APIURL=  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bdc5c5d47d4a215c6ac5150d5018e676"
const APIKEY ="api_key=bdc5c5d47d4a215c6ac5150d5018e676"
const IMGPATH = "https://image.tmdb.org/t/p/w1280"
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=bdc5c5d47d4a215c6ac5150d5018e676&query="
const form = document.getElementById("form")
const search = document.getElementById("searchBar")

/*
* Fetches data from TMDB's API and return the parsed response data
*/ 
async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData)
    showMovies(respData.results)
  }



function showMovies(movies){
  const main = document.getElementById("main")
  // //make main is cleared
  main.innerHTML =' '

  //object destructuring 
  movies.forEach((movie)=> {
    const { poster_path, title, vote_average, overview} = movie;
    const ROUNDVOTE = parseFloat(vote_average).toFixed(1);
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie')
    movieEl.innerHTML = `
      <img src="${IMGPATH + poster_path}" alt="$(title)">
      <div class="movieInfo"> 
        <h3>${title}</h3>
        <span class="${getRateColor(ROUNDVOTE)}">${ROUNDVOTE}</span>
      </div> 
      <div class="overview"> 
        ${overview}
      </div>
    `
    main.appendChild(movieEl)
  })
}

  /* 
  * Returns rating colors beased on rating scale
  */
  function getRateColor(vote){
    if(vote>=8){
      return 'green'
    }
    else if(vote >= 5 ){
      return 'orange'
    }
    else{
      return 'red'
    }
  }
  /*
  *Sets up a search functionality for movies, allowing users to enter a search query in an input field. 
  *When the form is submitted, it retrieves the search query value, sends a request to the movie search API, 
  *and displays the corresponding movie results on the webpage.
  */
  function movieSearch(){
    document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById("form");
      const search = document.getElementById("searchBar");
    form.addEventListener('submit', (e)=> {
      e.preventDefault()
      const searchItem = search.value
  
      if(searchItem){
        getMovies(SEARCHAPI + searchItem)
      }
  })
    })
  }


getMovies(APIURL)
movieSearch()

