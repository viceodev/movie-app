let loader = document.querySelector('div#loader');

let initialize_loader = () => {
    loader.classList.remove('d-none');
}

let kill_loader = () => {
    loader.classList.add('d-none');
}

export {initialize_loader, kill_loader}