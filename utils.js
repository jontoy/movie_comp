const debounce = (func, delay=1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay)
    };
}

// const createAutocomplete = (autocomp) => {
//     const isActive = document.createElement('div');
//     const input = document.createElement('input');
//     const menu = document.createElement('div');
//     const content = document.createElement('div');

//     input.classList.add('input');
//     isActive.classList.add("dropdown");
//     menu.classList.add("dropdown-menu");
//     content.classList.add("dropdown-content", "results")

//     menu.append(content);
//     isActive.append(menu);
//     autocomp.append(input, isActive);
// }
