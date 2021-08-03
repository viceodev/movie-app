let profile =  document.querySelector('div.profile');
let movie =  document.querySelector('div.movie-info');


let insert_data_into_page = async function(datas){
    if(datas.biography != null || datas.biography != undefined ){
        profile.innerHTML = `
            <img src="${`https://image.tmdb.org/t/p/w500${await datas.profile_path}`}" alt="" class="mt-1 mb-1">

            <div id="star"></div>

            <p class="lead mt-1 mb-1"><span class="bold">Name: </span>${await datas.name}</p>
            <p class="mt-1 mb-1"><span class="bold">Biolography: </span>${await datas.biography}</p>
            <p class="mt-1 mb-1">
                <span class="bold">Birthday: </span>${await datas.birthday}
            </p>

            <p><span class="bold">Place of Birth: </span>${await datas.place_of_birth}</p>     
        `;        
    }else{
        profile.innerHTML = `
        <img src="./img/empty.svg" alt="" class="mt-1 mb-1" style="width: 100%;">
        <p class="title center">Opps! There is no data.</p>
        `;
    }

}

let fetch_authors_data =  async function(id){
    fetch(`https://api.themoviedb.org/3/person/${id}?api_key=ef68478ca9416c1689dbf70c6819405a&language=en-US`,{
        headers: {'Content-type': 'application/json;charset=utf-8'}
    }).then(res => res.json())
    .then(datas => {
        insert_data_into_page(datas);
    })

}

let populate_genres = function(datas){
    let genreContainer =  document.querySelector('span#genre-list');

    datas.forEach(data => {
        genreContainer.innerHTML += ` ${data.name} |`;
    })
}

let insert_single_movie_data_into_page = async function(datas){
    if(datas != null || datas != undefined ){
        movie.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${await datas.backdrop_path}"  alt="" class="mt-1 mb-1 banner"> 

            <p class="mt-1 mb-1"><span class="bold">Title: </span>${await datas.title}</p>
            <p class="mt-1 mb-1"><span class="bold">Original Title: </span>${await datas.original_title}</p>
            <p class="mt-1 mb-1"><span class="bold">Genre: </span> <span id="genre-list"></span></p>
            <p class="mt-1 mb-1"><span class="bold">Homepage:</span> <a href="${await datas.homepage}" target="_blank">See Movie</a></p>

            <p class="mt-1 mb-1"><span class="bold">Overview: </span>${await datas.overview}</p>

            <p class="mt-1 mb-1"><span class="bold">Popularity: </span>${await datas.popularity}</p>

            <p class="mt-1 mb-1"><span class="bold">Status: </span>${await datas.status}</p>

            <p class="mt-1 mb-1"><span class="bold">Vote Count: </span>${await datas.vote_count}</p>
            <div class="company">

            </div>     
        `;        

        populate_genres(datas.genres);
    }else{
        movie.innerHTML = `
        <img src="./img/empty.svg" alt="" class="mt-1 mb-1" style="width: 100%;">
        <p class="title center">Opps! There is no data.</p>
        `;
    }
}



let clear_single_movie_data = function(){
    movie.innerHTML =   `<img src="./img/empty.svg" alt="" class="mt-1 mb-1" style="width: 100%;">
    <p class="title center">Opps! There is no data.</p>`;
}


let fetch_single_movie_data =  async function(id){
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=ef68478ca9416c1689dbf70c6819405a&language=en-US`,{
        headers: {'Content-type': 'application/json;charset=utf-8'}
    }).then(res => res.json())
    .then(datas => {
        insert_single_movie_data_into_page(datas);
    })
}



export { fetch_authors_data, fetch_single_movie_data , clear_single_movie_data}