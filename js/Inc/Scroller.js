// SCROLL FUNCTIONALITY START
'use strict';

class scroll_session{
    constructor(length){
        this.length = length;
    }

    get_all_required_parameter(){
        this.list_components = document.querySelector('ul#movie-list li');
        this.movie_block = document.querySelector('section.movie-block');
        this.wanted_width = (this.list_components.clientWidth + 40) * this.length;
        this.isPaused = false;
        this.num = 0;
    }

    set_movie_block_width(){
        this.movie_block.style.width = this.wanted_width + 'px';
    }

    scroll(){
        this.movie_block.style.marginLeft = `-${this.num}px`;

        if(this.num > this.wanted_width){
            this.num = 0;
        }else{
            this.num += 240;
        }
    }


    set_the_interval(){
        setInterval(() => { 
            if(!this.isPaused){
                this.scroll(); 
            }
        }, 2000);
    }

    set_pause_and_play_functionality(){
        this.movie_block.addEventListener('mouseover', () => {
            this.isPaused = true;
        });
    
        this.movie_block.addEventListener('mouseleave', () => {
            this.isPaused = false;
        });
    }
}


let scroll_movies = ( length ) =>{
    let session = new scroll_session(length);
    session.get_all_required_parameter();
    session.set_movie_block_width();
    session.set_the_interval();
    session.set_pause_and_play_functionality();
}


export {scroll_movies}