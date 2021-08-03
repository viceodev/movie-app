// SEARCH FUNCTIONALITY STARTS


let app = document.querySelector('div#app');
let body = document.querySelector('body');

// Populate html elements contents
let initialize_dom = async function(searchTerm){
    // Change body background image
    body.style.cssText = `background-image: url('./img/search1.svg')`;

    // Insert boilerplate into html
    app.innerHTML = `

        <div class="contain">
            <h1 class="title">Search Result</h1>

            <div id="star" class="mb-3"></div>

            <p class="desc" id="desc">Search Result for <i>${searchTerm}</i></p>
        </div>

        <div id="img">
            <img src="./img/search2.svg">
        </div>
    `;
}


let search_functionality = function(){
    let inputs =  document.querySelector('input#search_input');
    let button = document.querySelector('#search_button');
    let element_to_show_error =  document.querySelector('p#error');


    button.addEventListener('click', (e) => {
        e.preventDefault();
        if(inputs.value.length > 0){
            localStorage.setItem('s', inputs.value);
            location.href = "/";
        }else{
            element_to_show_error.innerHTML = 'Opps! You have no search Term';
            element_to_show_error.classList.add('animate-opacity');
        }
    })
}

// SEARCH FUNCTIONALITY ENDS


export {search_functionality, initialize_dom}