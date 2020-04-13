export default class Filter {

    // TODO: file not used for now
    constructor(showList, species) {
        this.showList = showList;
        this.species = species;
    }

    getFilterResults() {
        try {
            let _self = this;
            let filteredList = [];
            _self.species.forEach(element => {
                _self.showList.forEach(elem => {
                    if (elem.species === element) {
                        filteredList.push(elem);
                    } else if (element === 'Other Species') {
                        filteredList = _self.showList;
                    }
                })
            });
            return filteredList;
        } catch (error) {
            console.log(error);
        }
    }

    getCheckboxInput (el) {
        let choices = [];
        if ( el['checked'] ) {
            choices.push(el['value']);
        } else {
            choices.pop(el['value']);
        }
        console.log('this.choices', choices);
        return choices;
    }
}
