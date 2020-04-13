import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

const renderShow = show => {
    const markup = `
    <li>
        <img src="${show.image}">
        <ul class="show_card__details">
            <li class="show_info">
                <span class="show_info__key">STATUS</span>
                <span class="show_info__value">${show.status}</span>
            </li>
            <li class="show_info">
                <span class="show_info__key">SPECIES</span>
                <span class="show_info__value">${show.species}</span>
            </li>
            <li class="show_info">
                <span class="show_info__key">GENDER</span>
                <span class="show_info__value">${show.gender}</span>
            </li>
            <li class="show_info">
                <span class="show_info__key">ORIGIN</span>
                <span class="show_info__value">${show.origin.name}</span>
            </li>
            <li class="show_info">
                <span class="show_info__key">LAST LOCATION</span>
                <span class="show_info__value">${show.location.name}</span>
            </li>
        </ul>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next'
const createButton = (page, type, url) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1} data-url=${url}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, pageInfo, resPerPage) => {
    const numResults = pageInfo.count;
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (pages !== 1) {
        if (page === 1 && pages > 1) {
            // Only button to go to next page
            button = createButton(page, 'next', pageInfo.next);
        } else if (page < pages) {
            // Both buttons
            button = `
                ${createButton(page, 'prev', pageInfo.prev)}
                ${createButton(page, 'next', pageInfo.next)}
            `;
        } else if (page === pages && pages > 1) {
            // Only button to go to prev page
            button = createButton(page, 'prev', pageInfo.prev);
        }

        elements.searchResPages.insertAdjacentHTML('afterbegin', button);
    }
};

export const renderResults = (shows, page = 1, resPerPage = 20) => {
    // render results of current page
    shows.result.forEach(renderShow);

    // render pagination buttons
    renderButtons(page, shows.pagination, resPerPage);
};