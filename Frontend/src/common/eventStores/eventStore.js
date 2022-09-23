import { createStore } from 'redux'


const defaultStatemoviesFilter = {
   
    clickedMovie: false

}


export const showButton = (clickedMovie = false) => ({

    type: 'SHOW_BOOK_SHOW',
    
})



const showButtonReducer = (state , action) => {

    switch (action.type) {

        case 'SHOW_BOOK_SHOW':
            return {                
                clickedMovie: true
            };

        default:
            return state;
    }


};


const eventStore = () => {

    let store = createStore(showButtonReducer);
    return store;
};




export default eventStore;