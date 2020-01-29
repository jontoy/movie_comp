const waitFor = (selector) => {
    return new Promise((resolve, reject) => {
        const intervalID = setInterval(() => {
            if(document.querySelector(selector)){
                clearInterval(intervalID);
                clearTimeout(timeoutID);
                resolve();
            }
        }, 30);
        const timeoutID = setTimeout(() => {
            clearInterval(intervalID);
            reject();
        }, 2000);
    });
};

beforeEach(() => {
    document.querySelector('#target').innerHTML = '';
    createAutoComplete({
        root:document.querySelector('#target'),
        fetchData() {
            return [
                {Title: 'Avengers'},
                {Title: 'Not Avengers'},
                {Title: 'Other Movie'}
            ];
        },
        renderOption(movie) {
            return movie.Title;
        }
    })
})

it('dropdown begins closed', () => {
    const dropdown = document.querySelector('.dropdown');

    assert.notInclude(dropdown.className, 'is-active');
});

it('dropdown opens after search', async () => {
    const dropdown = document.querySelector('.dropdown');
    const input = document.querySelector('input');
    input.value = 'avenger';
    input.dispatchEvent(new Event('input'));

    await waitFor('.dropdown-item');
    assert.include(dropdown.className, 'is-active');

})

it('displays correct number of results', async () => {

    const input = document.querySelector('input');
    input.value = 'avenger';
    input.dispatchEvent(new Event('input'));

    await waitFor('.dropdown-item');
    const items = document.querySelectorAll('.dropdown-item');
    assert.lengthOf(items, 3);

})