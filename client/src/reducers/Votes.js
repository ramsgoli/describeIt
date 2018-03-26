import { fromJS } from 'immutable';

/*
  TYPES
*/
const ADD_VOTE = 'ADD_VOTE';

const SUBMIT_VOTE_START = 'SUBMIT_VOTE_START';
const SUBMIT_VOTE_ERROR = 'SUBMIT_VOTE_ERROR';
const SUBMIT_VOTE_SUCCESS = 'SUBMIT_VOTE_SUCCESS';

const initialState = fromJS({
    votes: [],
    _internal: {
        error: null,
        loading: false,
        success: false
    }
});

export const submitVotes = votes => {
    return async (dispatch, getState) => {
        dispatch({type: SUBMIT_VOTE_START})

        const { CurrentPlayer } = getState();
        const playerID = CurrentPlayer.get('id');

        const response = await fetch(`${Config.API_URL}/users/${playerID}/votes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                votes
            )
        })

        const status = await response.status;
        const data = await response.data();

        if (status < 200 || status >= 400) {
            return dispatch({type: SUBMIT_VOTE_ERROR});
        }

        return dispatch({type: SUBMIT_VOTE_SUCCESS});
    }
}

export const Votes = (state=initialState, action) => {
    switch(action.type) {
        case SUBMIT_VOTE_START: {
            return state.withMutations(val => {
                val.setIn(['_internal', 'loading'], true);
            })
        }
        case ADD_VOTE: {
            return state.withMutations(val => {
                const vote = fromJS({
                    submissionID: action.submissionID,
                    userID: action.userID
                })
                val.setIn(['_internal', 'loading'], false);
                val.setIn(['_internal', 'success'], true);
                val.set('votes', val.get('votes').push(vote));
            })
        }
    }
}