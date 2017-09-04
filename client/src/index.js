import 'whatwg-fetch'

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import { store, history } from 'reducers'

import 'bootstrap/dist/css/bootstrap.css'
import './index.scss'

import App from './containers/App'

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

render(
    <Root />,
    document.getElementById('root')
)
