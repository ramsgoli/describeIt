import {fromJS} from 'immutable'
import Config from 'config'

// reducer
const initialState = fromJS({
    _internal: {
        loading: false,
        error: '',
        success: false
    },
})



