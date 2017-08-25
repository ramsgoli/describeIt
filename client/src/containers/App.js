import React from 'react'

import NotificationsSystem from 'reapop'
import theme from 'reapop-theme-wybo'

import { connect } from 'react-redux'

import Home from './Home'
import Lobby from './Lobby'
import { gameStates } from '../reducers/index'

class App extends React.Component {
    render() {
        let gameComponent

        switch(this.props.gameState) {
            case gameStates.NULL_STATE: {
                gameComponent = <Home />
                break
            }
            case gameStates.LOBBY_STATE: {
                gameComponent = <Lobby />
                break
            }
            default: {
                gameComponent = <Home />
            }
        }

        return (
            <main>
                <NotificationsSystem theme={theme}/>
                {gameComponent}
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    const Game = state.Game
    return {
        gameState: Game.get('gameState')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)