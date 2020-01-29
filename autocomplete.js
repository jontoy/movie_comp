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

const createAutocomplete = ({
    root, 
    fetchData, 
    fetchDataSingle, 
    renderOption, 
    onOptionSelect, 
    inputValue
}) => {

    root.innerHTML = `<label><b>Search</b></label>`;
    const dropdown = document.createElement('div');
    const input = document.createElement('input');
    const menu = document.createElement('div');
    const resultsWrapper = document.createElement('div');

    input.classList.add('input');
    dropdown.classList.add("dropdown");
    menu.classList.add("dropdown-menu");
    resultsWrapper.classList.add("dropdown-content", "results")

    menu.append(resultsWrapper);
    dropdown.append(menu);
    root.append(input, dropdown);

    const onInput = async (event) => {
        const items = await fetchData(event.target.value)
        if(!items.length) {
            dropdown.classList.remove('is-active');
            return
        }
        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active'); 
        for (let item of items){
            const a = document.createElement('a');
            a.classList.add('dropdown-item');
            renderOption(item, a);
            a.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            });
            resultsWrapper.append(a);
        }
    };
    


    input.addEventListener('input', debounce(onInput, 1000));
    document.addEventListener('click', () => {
        if(!root.contains(event.target)){
            dropdown.classList.remove('is-active');
        }
    })

}

