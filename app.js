const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '70a2fe47',
            s: searchTerm
        }
    });

    if (response.data.Error) {
        return [];
    }
    return response.data.Search
}


const fetchDataSingle = async (id) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '70a2fe47',
            i: id
        }
        
    });
    return response.data
}

const renderOption = ({Poster, Title, Year}, a) => {
    const moviePoster = document.createElement('img');
    const movieTitle = document.createElement('h1');
    moviePoster.src = Poster === "N/A" ? "" : Poster;
    movieTitle.innerText = `${Title} (${Year})`;
    a.append(moviePoster, movieTitle);
}

const onOptionSelectLeft = (movie) => {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#left-summary"), "left");
}

const onOptionSelectRight = (movie) => {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#right-summary"), "right");
}



let leftMovie;
let rightMovie;
const onMovieSelect = async ({imdbID}, summaryElement, side) => {
    const fullMovie = await fetchDataSingle(imdbID);
    const dataTemplate = (movieDetail) => {

        const extractNominations = (awardEntry) => {
           const awards = awardEntry.match(/\d+/g);
           let totalAwards = 0;
           for (let award of awards){
               totalAwards += parseInt(award);
           } 
           return totalAwards
        }
        const allAwards = extractNominations(movieDetail.Awards);
        const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
        const metascore = parseInt(movieDetail.Metascore);
        const imdbRating = parseFloat(movieDetail.imdbRating);
        const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));


        return `
            <article class="media">
                <figure class="media-left">
                    <p class="image">
                        <img src="${movieDetail.Poster}">
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                        <h1>${movieDetail.Title}</h1>
                        <h4>${movieDetail.Genre}</h4>
                        <p>${movieDetail.Plot}</p>
                    </div>
                </div>
            </article>
            <article data-value="${allAwards}" class="notification is-primary award">
                <p class="title">${movieDetail.Awards}</p>
                <p class="subtitle">Awards</p>
            </article>
            <article data-value="${dollars}" class="notification is-primary">
                <p class="title">${movieDetail.BoxOffice}</p>
                <p class="subtitle">Box Office</p>
            </article>
            <article data-value="${metascore}" class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
            </article>
            <article data-value="${imdbRating}" class="notification is-primary">
                <p class="title">${movieDetail.imdbRating}</p>
                <p class="subtitle">IMDB Rating</p>
            </article>
            <article data-value="${imdbVotes}" class="notification is-primary">
                <p class="title">${movieDetail.imdbVotes}</p>
                <p class="subtitle">IMDB Votes</p>
            </article>
        `
    }
    summaryElement.innerHTML = dataTemplate(fullMovie);
    if(side === "left"){
        leftMovie = fullMovie;
    } else {
        rightMovie = fullMovie;
    }

    if(leftMovie && rightMovie){
        runComparison();
    }
}

const runComparison = () => {
    leftCriteria = document.querySelectorAll('#left-summary .notification')
    rightCriteria = document.querySelectorAll('#right-summary .notification')
    let left;
    let right;
    for (let i = 1; i<leftCriteria.length; i++){
        left = parseFloat(leftCriteria[i].getAttribute('data-value'));
        right = parseFloat(rightCriteria[i].getAttribute('data-value'));
        if (left >= right){
            rightCriteria[i].classList.add('is-warning');
            rightCriteria[i].classList.remove('is-primary');
        } else {
            leftCriteria[i].classList.add('is-warning');
            leftCriteria[i].classList.remove('is-primary');
        }
    }
}



const inputValue = (movie) => {
    return movie.Title;
}

const autoCompleteConfig = {

    fetchData,
    fetchDataSingle,
    renderOption,
    inputValue
}
const acleft = document.querySelector('#left-autocomplete');
const acright = document.querySelector('#right-autocomplete');


createAutocomplete({
    ...autoCompleteConfig,
    root: acleft,
    onOptionSelect: onOptionSelectLeft
})

createAutocomplete({
    ...autoCompleteConfig,
    root: acright,
    onOptionSelect: onOptionSelectRight
})







