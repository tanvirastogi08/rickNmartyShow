import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getSearchResults() {
        try {
            const res = await axios(`https://rickandmortyapi.com/api/character/?${this.query}`);
            this.result = res.data.results;
            this.pagination = res.data.info;
        } catch (error) {
            alert(error);
        }
    }
}