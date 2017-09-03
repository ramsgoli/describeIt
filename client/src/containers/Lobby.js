import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { gameActions } from '../reducers'

import Lobby from '../components/Lobby'

class LobbyContainer extends React.Component {
    render() {
        return (
           <Lobby
               accessCode={this.props.accessCode}
               startGame={this.props.startGame}
               currentPlayer={this.props.currentPlayer}
               players={this.props.players}
           />
        )
    }
}

const mapStateToProps = state => {
    const Game = state.Game
    const CurrentPlayer = state.CurrentPlayer
    const Players = state.Players

    return {
        accessCode: Game.get('accessCode'),
        currentPlayer: CurrentPlayer,
        players: Players.get('players')
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startGame: bindActionCreators(gameActions.startGame, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyContainer)
