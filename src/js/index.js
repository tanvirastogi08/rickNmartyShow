import Search from './models/Search';
import List from './models/List';
import * as showListView from './views/showListView';
import * as filterView from './views/filterView';
import { elements, renderLoader, clearLoader, species, gender, origin } from './views/base';

const state = {};
/** 
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1) Get query from view
    if (state.query) {
        // 2) New search object and add to state
        state.showList = new Search(state.query);

        // 3) Prepare UI for results
        showListView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for shows
            await state.showList.getSearchResults();
            // 5) Render results on UI
            clearLoader();
            showListView.renderResults(state.showList);
        } catch (err) {
            console.log('Something wrong with the search...', err);
            clearLoader();
        }
    } else {
        renderShowsList();
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    // creating query
    state.query = state.query ? state.query+'&name'+'='+showListView.getInput() : 'name'+'='+showListView.getInput();
    controlSearch();
});

// Pagination button
elements.searchResPages.addEventListener('click', async e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        const url = btn.dataset.url;
   
        showListView.clearResults();

        state.showList = new List(goToPage, url);
        await state.showList.getNextResults();
        state.sortingValue = state.sortingValue ? state.sortingValue : 'asc';
        sortShowsById();
        showListView.renderResults(state.showList, goToPage);
    }
});

elements.speciesList.addEventListener('click', el => {
    const species = el.target.closest('.species').dataset.value;
    
    // creating label to diaplay the text of the selected filter
    const speciesLabel = document.createElement('span');
    speciesLabel.innerHTML = species;                  
    elements.displayFilterValue.appendChild(speciesLabel);

    state.query = state.query ? state.query+'&species='+species : 'species='+ species;

    controlSearch();
});

elements.genderList.addEventListener('click', el => {
    const gender = el.target.closest('.gender').dataset.value;
    
    // creating label to diaplay the text of the selected filter
    const genderLabel = document.createElement('span');
    genderLabel.innerHTML = gender;                  
    elements.displayFilterValue.appendChild(genderLabel); 
    
    state.query = state.query ? state.query+'&gender='+gender : 'gender='+ gender;

    controlSearch();
});

elements.originList.addEventListener('click', el => {
    const origin = el.target.closest('.origin').dataset.value;
    
    // creating label to diaplay the text of the selected filter
    const originLabel = document.createElement('span');
    originLabel.innerHTML = origin;                  
    elements.displayFilterValue.appendChild(originLabel); 

    state.query = state.query ? state.query+'&origin='+origin : 'origin='+ origin;

    controlSearch();
});

/** 
 * LIST CONTROLLER
 */
const renderShowsList = async () => {
    state.showList = new List();

    showListView.clearInput();
    showListView.clearResults();
    renderLoader(elements.searchRes);

    try {
        // load shows data
        await state.showList.getAllResults();
        // loader till no data displayes
        clearLoader();
        // Render results on UI
        showListView.renderResults(state.showList);
    } catch (err) {
        console.log('Something wrong with the list...', err);
        clearLoader();
    }
}

window.addEventListener('load', () => {
    // load filters and shows list
    filterView.renderSpecies(species);
    filterView.renderGender(gender);
    filterView.renderOrigin(origin);

    // display show list
    renderShowsList();
});

elements.sortInput.addEventListener('change', (el) => {
    state.sortingValue = el.target.value;
    sortShowsById();
    showListView.clearResults();
    showListView.renderResults(state.showList);
})

// sorting shows by ID in ascending/descending order
const sortShowsById = () => {
    if (state.sortingValue === 'asc') {
        state.showList.result.sort(function(a, b){return a.id - b.id});
    } else if (state.sortingValue === 'desc') {
        state.showList.result.sort(function(a, b){return b.id - a.id});
    }
}