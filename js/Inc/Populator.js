import * as Utils from './utitilities.js';
import * as Scroller from  './Scroller.js';
import * as Loader from './Loader.js';
import * as ModalPopulator from './ModalPopulator.js';

// Get html elements
let body =  document.querySelector('body');
let app = document.querySelector('div#app');
let list = document.querySelector('ul#movie-list');
let response;

let hook_play_button_to_modal = function(){
    let trigger =  document.querySelector('a#play');
    let modal = document.querySelector('#modal23');


    trigger.addEventListener('click', () => {
        modal.classList.remove('d-none');
        modal.classList.add('animate-left');
    });
}

// Populate html elements contents
let initialize_dom = async function(datas){
    // Change body background image
    body.style.cssText = `background-image: url(https://image.tmdb.org/t/p/w500${await datas.backdrop_path})`;

    // Insert boilerplate into html
    app.innerHTML = `

        <div class="contain">
            <h1 class="title">${ (datas.name != null) ? await datas.name : await datas.title}</h1>

            <div id="star" class="mb-3"></div>

            <a id="play"><i class="fas fa-question"></i></a>
            <p class="desc" id="desc">${(datas.description != null ) ? await datas.description : await datas.overview}</p>
            
            <p class="mt-1 text-primary" id="genre"></p>
        </div>

        <div id="img">
            <img src="${`https://image.tmdb.org/t/p/w500${await datas.poster_path}`}" title="${await datas.name}" alt="${await datas.name}">
        </div>
    `;

    // Hook know more button to modal;

    hook_play_button_to_modal();
    Utils.star_functionality('div#star', Math.floor((datas.average_rating != null) ? await datas.average_rating : await datas.vote_average)); 
}

let hook_function_to_single_movie_links = function(){
    let single_links = document.querySelectorAll('a#single_movie');

    single_links.forEach(link => {
        link.addEventListener('click', (e) => {
            Loader.initialize_loader();
            e.preventDefault();
            setTimeout(() =>{
                let index = e.target.getAttribute('data-target');
                
                initialize_dom(response.results[index]);
                
                ModalPopulator.fetch_single_movie_data(response.results[index].id);

                ModalPopulator.fetch_authors_data(
                    (response.hasOwnProperty('object_ids')) 
                    ?response.object_ids[`movie:${response.results[index].id}`]
                    :0
                );
                
                Loader.kill_loader();
            }, 1000);
        });
    })
}

let add_list_to_dom =  async function(datas){
    list.innerHTML = "";
    await datas['results'].forEach((data, index) => {
        list.innerHTML += `
            <li class="item" data-target="${index}">
                <a href="#" data-target="${index}" id="single_movie">
                    <img src="${ 'https://image.tmdb.org/t/p/w500/' +data.poster_path}" alt="${data.title}" title=""${data.title} data-target="${index}">
                    <p data-target="${index}">${data.title}</p>
                </a>
            </li>
        `
    });     

    hook_function_to_single_movie_links();
}


let controller_initial =  async function(datas){
    response = await datas;
    initialize_dom(await datas);
    add_list_to_dom(datas);
    Utils.applyCarousel();
    ModalPopulator.fetch_authors_data(datas.created_by.id);
    ModalPopulator.clear_single_movie_data();
    Utils.modal_functionality();
}

let change_response_value =  function(data){
    response = data;
}

export{ controller_initial, add_list_to_dom, change_response_value}