import 'whatwg-fetch'

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import { store, history } from 'reducers'

import 'index.css'
import Home from 'containers/Home'
import Game from 'containers/Game'

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route path="/app" component={Game} />
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}

render(
    <Root />,
    document.getElementById('root')
)
