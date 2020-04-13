export const elements = {
    sortInput: document.querySelector('.sort'),

    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),

    displayFilterValue: document.querySelector('.filter-value'),

    speciesList: document.querySelector('.species_list'),
    genderList: document.querySelector('.gender_list'),
    originList: document.querySelector('.origin_list'),

};

export const species = ['Human', 'Mythology', 'Other Species'];
export const gender = ['Male', 'Female'];
export const origin = ['Unknown', 'Post Apocalyptic', 'Nuptia 4', 'Other Origins'];

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};
