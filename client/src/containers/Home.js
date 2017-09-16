import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { gameActions, gameStates, currentPlayerActions } from '../reducers'

import HomeComponent from '../components/Home'
import SocketManager from '../Socket'

class Home extends React.Component {

    componentDidMount() {
        this.socketManager = SocketManager
        this.socketManager.socket.on('connect', () => {
            this.props.setSocketId(this.socketManager.socket.id)
        })
    }

    render() {
        return(
            <HomeComponent
                createGame={this.props.createGame}
                joinGame={this.props.joinGame}
                _gameInternal={this.props._gameInternal}
            />
        )
    }
}

const mapStateToProps = (state) => {
    const Game = state.Game

    return {
        accessCode: Game.get('accessCode'),
        _gameInternal: Game.get('_internal'),
        gameState: Game.get('gameState')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGame: bindActionCreators(gameActions.createGame, dispatch),
        joinGame: bindActionCreators(gameActions.joinGame, dispatch),
        setSocketId: bindActionCreators(currentPlayerActions.setSocketId, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)