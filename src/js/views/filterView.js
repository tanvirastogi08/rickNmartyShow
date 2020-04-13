import { elements } from './base';

const renderSpeciesList = species => {
    const markup = `
    <li>
        <input class="species" id="${species}" type="radio" name="species" value="${species}" data-value="${species}">
        <label for="${species}"> ${species} </label>
    </li>
    `;
    elements.speciesList.insertAdjacentHTML('beforeend', markup);
}

const renderGenderList = gender => {
    const markup = `
    <li>
        <input class="gender" id="${gender}" type="radio" name="gender" value="${gender}" data-value="${gender}">
        <label for="${gender}"> ${gender} </label>
    </li>
    `;
    elements.genderList.insertAdjacentHTML('beforeend', markup);
}

const renderOriginList = origin => {
    const markup = `
    <li>
        <input class="origin" id="${origin}" type="radio" name="origin" value="${origin}" data-value="${origin}">
        <label for="${origin}"> ${origin} </label>
    </li>
    `;
    elements.originList.insertAdjacentHTML('beforeend', markup);
}

export const renderSpecies = (species) => {
    species.forEach(renderSpeciesList);
};

export const renderGender = (gender) => {
    gender.forEach(renderGenderList);
};

export const renderOrigin = (origin) => {
    origin.forEach(renderOriginList);
};