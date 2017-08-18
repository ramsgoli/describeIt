import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push, replace } from 'react-router-redux'

import { gameActions } from '../reducers'

import Lobby from '../components/Lobby'

class LobbyContainer extends React.Component {
    componentWillMount() {
        if (!this.props.accessCode) {
            this.props.redirectHome()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.accessCode) {
            this.props.redirectHome()
        }
    }
    render() {
        return (
           <Lobby
               accessCode={this.props.accessCode}
               startGame={this.props.startGame}
           />
        )
    }
}

const mapStateToProps = state => {
    const Game = state.Game

    return {
        accessCode: Game.get('accessCode')
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startGame: bindActionCreators(gameActions.startGame, dispatch),
        redirectHome: bindActionCreators(() => replace('/'), dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyContainer)
