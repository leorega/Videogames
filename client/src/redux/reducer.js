import {
    FILTER_BY_GENRE,
    FILTER_BY_SOURCE,
    SORT_BY_ALPHABETICAL,
    SORT_BY_RATING,
} from './actions';

const initialState = {filteredGames: [], allGames: [] };

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALIZE_GAMES':
            return {
                filteredGames: action.payload,
                allGames: action.payload
            }
        case FILTER_BY_GENRE:
            return{
                ...state,
                filteredGames: state.allGames.filter(
                    (game) => game.genres.includes(action.payload)
                )
            }
        case FILTER_BY_SOURCE:
            let bySource;
            if (action.payload === "API") {
                bySource = state.allGames.filter(
                    (game) => typeof game.id === 'number'
                )
            } else {
                bySource = state.allGames.filter(
                    (game) => typeof game.id !== 'number'
                )    
            }
            return{
                ...state,
                filteredGames: [...bySource]
            }
        case SORT_BY_ALPHABETICAL:
            let byAlpha;
            if (action.payload === "Ascending") {
              byAlpha = [...state.filteredGames].sort((a, b) => a.name.localeCompare(b.name));
            } else {
              byAlpha = [...state.filteredGames].sort((a, b) => b.name.localeCompare(a.name));
            }
            return {
                ...state,
                filteredGames: byAlpha
            };
        case SORT_BY_RATING:
            let byRating;
            if (action.payload === "Ascending") {
              byRating = [...state.filteredGames].sort((a, b) => a.rating - b.rating);
            } else {
              byRating = [...state.filteredGames].sort((a, b) => b.rating - a.rating);
            }
            return {
                ...state,
                filteredGames: byRating
            };
        default:
            return {...state};
    }
}

export default rootReducer;