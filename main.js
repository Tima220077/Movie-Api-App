// Titles: https://omdbapi.com/?s=${name}&page=1&apikey={apikey}
// details: http://www.omdbapi.com/?i=${id}&apikey=${apikey}
const API_KEY = "e12b3f65"
const API_URL = "https://www.omdbapi.com/"

let inputEl = document.getElementById("input-el")
let searchBtn = document.getElementById("search-btn")
let mainEl = document.getElementById("main")
let containerEl = document.querySelectorAll("container")
let arrMovies = ["man", "batman", "godfather", "superman", "thor", "marvel"]

searchBtn.addEventListener("click", startFunc)

function startFunc(){
    let inpVal = inputEl.value
    if (inpVal) {
        loadMovies(inpVal)
        inputEl.value = ""
    }
    //if not empty calling func 
    
}
async function loadMovies(val){
    let title_URL = `https://omdbapi.com/?s=${val}&page=1&apikey=${API_KEY}`
    let res = await fetch(title_URL)
    let movies = await res.json()
    let datas = movies.Search
    console.log(datas)
    
    try {
        clearFunc()
        datas.forEach(data => {
            mainEl.innerHTML += `
            <div class="first" id="${data.imdbID}">
                <div class="container">
                    <img src="${data.Poster}" >
                    <h1 class="name">${data.Title}</h1>
                    <p class="year">${data.Year}</p>
                </div>
            </div>
            `
        });
    } catch (error) {
        console.log(error)
        startGenerate()
    }
    //input el val goes here and is succeded or failed
}
function clearFunc(){
    mainEl.innerHTML = ""
}
async function startGenerate(){
    
    clearFunc()
    let rm = Math.floor(Math.random()*arrMovies.length) 
    let rand = arrMovies[rm]
    let res = await fetch(`https://omdbapi.com/?s=${rand}&page=1&apikey=${API_KEY}`)
    let movies = await res.json()
    let datas = movies.Search
    datas.forEach(data => {
        mainEl.innerHTML += `
        <div class="first" id="${data.imdbID}">
            <div class="container">
                <img src="${data.Poster}" >
                <h1 class="name">${data.Title}</h1>
                <p class="year">${data.Year}</p>
            </div>
        </div>
        `
    });
    //generating random name movies
}
startGenerate()

mainEl.addEventListener("click", getIdFunc)
function getIdFunc(e){
    let spot = e.target
    // console.log(spot.parentNode.parentNode.id)
    let imdb = ""
    if (spot.parentNode.parentNode.classList == "first" || spot.classList == "first") {
        
        if (spot.parentNode.parentNode.classList == "first") {
            imdb = spot.parentNode.parentNode.id
        }else{
            imdb = spot.id
        }
        //getting imdbID when clicked on sth
        console.log(imdb)
        setTimeout(() => {
          mainEl.innerHTML = "Loading..."  
        },);
        fetchDetails(imdb)
    }else{
        return
    }

}
async function fetchDetails(imdb_ID){
    let res = await fetch(`https://www.omdbapi.com/?i=${imdb_ID}&apikey=${API_KEY}`)
    let detail = await res.json()
    console.log(detail)
    loadDetailds(detail)
    //getting id
}
function loadDetailds(data){
    mainEl.innerHTML = ""
    mainEl.innerHTML = `
    <div class="everything">
            <img src="${data.Poster}" alt="">
            <div class="details">
                <p class="name-det">${data.Title}</p>
                <div class="sth">
                    <p class="year-det">Year: ${data.Year}</p>
                    <p class="rating-det">Rating: ${data.imdbRating}/10</p>
                    <p class="released-det">Released: ${data.Released}</p>
                </div>
                
                <p class="genre-det">Genre: ${data.Genre}</p>
                <p class="director-det">Director: ${data.Director}</p>
                <p class="actors-det">Actors: ${data.Actors}</p>
                <p class="plot-det">Plot: ${data.Plot}</p>
                <p class="lang-det">Language: ${data.Language}</p>
                <p class="awards-det">Awards: ${data.Awards}</p>
                <button id="restart"  onclick="startGenerate()">BACK</button>
            </div>
        </div>
        `
        let btnRestart = document.getElementById("restart")
        btnRestart.addEventListener("click", startGenerate)
        //working with id datas
}
//problems
//when img is not present don't load func