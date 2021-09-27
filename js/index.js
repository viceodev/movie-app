import * as Loader from './Inc/Loader.js';
import * as Populator from './Inc/Populator.js';
import * as Search from './Inc/Search.js';
import * as Utils from './Inc/utitilities.js';

let getMovies = () => {
    Loader.initialize_loader();
    let searchTerm =  localStorage.getItem('s');

    if(searchTerm == undefined || searchTerm == null){
        fetch(`https://api.themoviedb.org/4/list/${Math.floor(Math.random() * 20) + 1}?api_key=ef68478ca9416c1689dbf70c6819405a&page=1`, {
            headers: {'Content-type': 'application/json;charset=utf-8'}
        })
        .then(res => res.json())
        .then(data => {
            if(data.results.length > 5){
                Populator.controller_initial(data);
                Loader.kill_loader();
            }else{
                getMovies();
            }
        }); 
    }else{
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=ef68478ca9416c1689dbf70c6819405a&language=en-US&query=${searchTerm}&page=1&include_adult=false`)
        .then(res => res.json())
        .then(data => {
            console.log(data.results.length);
            
            if(data.results.length > 0){
                Search.initialize_dom(searchTerm);
                Populator.add_list_to_dom(data); 
                Populator.change_response_value(data); 
                Utils.modal_functionality();
                localStorage.removeItem('s'); 
            }else{
                location.href = "/404";
                localStorage.removeItem('s')
            }
            
            Loader.kill_loader();
        })
    }
   
}


let reloadMovies =  () => {
    let reload_buttons = document.querySelectorAll('i#reload');

    reload_buttons.forEach(button => {
        button.addEventListener('click', () => {
            location.reload();
        })
    });
}

getMovies();
reloadMovies();


