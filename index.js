const APIURL=  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bdc5c5d47d4a215c6ac5150d5018e676&page="
const genreUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bdc5c5d47d4a215c6ac5150d5018e676&with_genres=`;
const APIKEY ="api_key=bdc5c5d47d4a215c6ac5150d5018e676"
const IMGPATH = "https://image.tmdb.org/t/p/w1280"
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=bdc5c5d47d4a215c6ac5150d5018e676&query="
const form = document.getElementById("form")
const search = document.getElementById("searchBar")
const GENRE = "https://api.themoviedb.org/3/genre/movie/list?api_key=bdc5c5d47d4a215c6ac5150d5018e676&language=en-US"
let currentPage= 1;
let totalPageCount = 0;
let moviesPerPage = [];


function removeMovieFromPage(movieIMG, page) {
  const movies = moviesPerPage[page];
  const filteredMovies = movies.filter(movie => movie.poster_path !== null);
  moviesPerPage[page] = filteredMovies; // Update movies for the current page
  showMovies(filteredMovies); // Update the displayed movies on the page

}

/*
* Fetches data from TMDB's API and return the parsed response data based on page number.
* It also removes movie that do not have posters.
*/ 
async function getMovies(url, page) {
  const resp = await fetch(url + page);
  const respData = await resp.json();
  console.log(respData);
  totalPageCount = respData.total_pages; // Update the total number of pages
  moviesPerPage[page]= respData.results
  const movies = moviesPerPage[page];
  const filteredMovies = movies.filter(movie => movie.poster_path !== null);
  moviesPerPage[page] = filteredMovies; // Update movies for the current page
  showMovies(filteredMovies); // Update the displayed movies on the page
  }

  
  



function showMovies(movies){
  const main = document.getElementById("main")
  // main is cleared
  main.innerHTML =' '

  //object destructuring 
  movies.forEach((movie)=> {
    const { poster_path, title, vote_average, overview, genre_ids, name} = movie;
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
        <h4> Overview </h4>
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
    if(vote==0){
      return
    }
    else if(vote>=8){
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
        let catalog = SEARCHAPI + searchItem
        getMovies(catalog, catalog)
      }
  })
    })
  }


  function handlePrevPage() {
    if (currentPage > 1) {
      currentPage--;
      getMovies(APIURL, currentPage);
      fetchGenres(GENRE) 
    }
    if (currentPage == 1) {
      getMovies(APIURL, currentPage);
      fetchGenres(GENRE)
    }
  }
  
  function handleNextPage() {
    if (currentPage < totalPageCount) {
      currentPage++;
      getMovies(APIURL, currentPage);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("prevPage").addEventListener("click", handlePrevPage);
    document.getElementById("nextPage").addEventListener("click", handleNextPage);
  })

  document.addEventListener('DOMContentLoaded', () => {
    const navbarIcon = document.querySelector('.navbar');
    const whiteBox = document.getElementById('whiteBox');

    navbarIcon.addEventListener('click', () => {
        whiteBox.style.display = 'block';
    });

    document.addEventListener('click', (event) => {
        const isClickInside = whiteBox.contains(event.target);
        const isClickNavbarIcon = navbarIcon.contains(event.target);
        
        if (!isClickInside && !isClickNavbarIcon) {
            whiteBox.style.display = 'none';
        }
    });
    
});


// Fetch genre list and populate genre dropdown
async function fetchGenres(genre) {
  try {
    const resp = await fetch(genre);
    const respData = await resp.json();
    const genres = respData.genres;
    showMovieGenre(genres);
    const genreElements = document.getElementsByClassName("genreTypes");
    Array.from(genreElements).forEach((element) => {
      element.addEventListener("click", () => {
        const genreId = element.getAttribute("data-genre-id");
        const movies = moviesPerPage[currentPage];
        const filteredMovies = movies.filter(
          (movie) => movie.genre_ids.includes(parseInt(genreId))
        );
        showMovies(filteredMovies);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function showMovieGenre(genres){
  const boxElement = document.getElementById("whiteBox");

  genres.forEach((genre)=> {
    const{id, name}= genre;
    genreEl = document.createElement('div');
    genreEl.classList.add('genreTypes');
    genreEl.setAttribute('data-genre-id', id);
    genreEl.innerHTML= `
    <div> ${name}</div>
    
    `
    boxElement.appendChild(genreEl)
  })
}


 


getMovies(APIURL, currentPage)
movieSearch()
fetchGenres(GENRE) 

// selectedGenre = genreId;
//   currentPage = 1;
//   let theGenre = `${genreUrl}${genreId}`;
//   getMovies(theGenre, currentPage);