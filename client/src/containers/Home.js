import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { gameStates, Actions } from '../reducers'

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
        createGame: bindActionCreators(Actions.gameActions.createGame, dispatch),
        joinGame: bindActionCreators(Actions.gameActions.joinGame, dispatch),
        setSocketId: bindActionCreators(Actions.currentPlayerActions.setSocketId, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
