import axios from 'axios';

export default class List {

    constructor(pageNumber=1, url) {
        this.page = pageNumber;
        this.url = url;
    }

    async getAllResults() {
        try {
            const res = await axios(`https://rickandmortyapi.com/api/character/?page=${this.page}`);
            this.result = res.data.results;
            this.pagination = res.data.info;
        } catch (error) {
            alert(error);
        }
    }

    async getNextResults() {
        try {
            const res = await axios(this.url);
            this.result = res.data.results;
            this.pagination = res.data.info;
        } catch (error) {
            alert(error);
        }
    }
}