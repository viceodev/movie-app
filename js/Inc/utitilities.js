import * as Populator from './Populator.js';


// Star Functionality
let star_functionality =  function(container, rating){
    let star_on_page = document.querySelector(container);

    for(let i= 1; i <= 5; i++){
        if(i <= rating){
            star_on_page.innerHTML += '<i class="fas fa-star" style="color: #FFD700;"></i>';
        }else{
            star_on_page.innerHTML += '<i class="fas fa-star"></i>';
        }
    }
}


// Menu Functionality
let menu_functionality =  function(){
    let toggle =  document.querySelector('#menu-toggle');
    let menu =  document.querySelector('div#menu');
    let status = false;

    toggle.addEventListener('click',() => {
        if(status == false){
            menu.classList.remove('d-none');
            menu.classList.add('animate-left');
            toggle.childNodes[0].classList.remove('fa-bars');
            toggle.childNodes[0].classList.add('animate-top');
            toggle.childNodes[0].classList.add('fa-times');
            status = true;
        }else if(status == true){
            menu.classList.add('d-none');
            toggle.childNodes[0].classList.remove('fa-times');
            toggle.childNodes[0].classList.add('animate-top');
            toggle.childNodes[0].classList.add('fa-bars');
            menu.classList.remove('animate-left');
            status = false;
        }
    })
}
// MENU FUNCTIONALITY ENDS


// CLOSE BUTTON FUNCTIONALITY STARTS
let close_functionality =  function(){
    let close_buttons = document.querySelectorAll('#close');

    close_buttons.forEach(close_button => {
        close_button.addEventListener('click', (e) => {
            e.preventDefault();
            let target =  document.querySelector(`#${e.target.getAttribute('data-target')}`);
            target.classList.add('d-none');
        })
    })
}
// CLOSE BUTTON FUNCTIONALITY ENDS


// TOGGLE SEARCH FUNCTIONALITY START
let toggle_search_modal =  function(){
    let togglers =  document.querySelectorAll('#search');
    let search_container =  document.querySelector('#search_form');

    togglers.forEach(toggler => {
        toggler.addEventListener('click', (e) => {
            e.preventDefault();
            search_container.classList.remove('d-none');
            search_container.classList.add('animate-top-menu');
        });
    });
}
// TOGGLE SEARCH FUNTIONALITY ENDS


// Modal Functionality
let modal_functionality =  function(){
    let modal_links = document.querySelectorAll('#modalNav .nav-links');

    let remove_active_class = function(target){
        modal_links.forEach(modal=> {
            let targetElement = document.querySelector(`#${modal.getAttribute('data-target')}`);
            targetElement.classList.add('d-none');

            if(modal.getAttribute('data-target') != target){
                modal.classList.remove('active');
            }
        })
    }

    modal_links.forEach(modal=> {
        modal.addEventListener('click', (e) => {
            e.preventDefault();
            remove_active_class();
            let targetElement = document.querySelector(`#${modal.getAttribute('data-target')}`);
            targetElement.classList.remove('d-none');
            targetElement.classList.add('animate-opacity');
            modal.classList.add('fade');
            modal.classList.add('active');
        })
    })
}
  


export {star_functionality, menu_functionality, close_functionality, toggle_search_modal, modal_functionality};