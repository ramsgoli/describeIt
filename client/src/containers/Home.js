import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push, replace } from 'react-router-redux'

import { gameActions, currentPlayerActions } from '../reducers'

import HomeComponent from '../components/Home'

class Home extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.accessCode) {
            this.props.redirectToLobby()
        }
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
        _gameInternal: Game.get('_internal')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGame: bindActionCreators(gameActions.createGame, dispatch),
        joinGame: bindActionCreators(gameActions.joinGame, dispatch),

        redirectToLobby: bindActionCreators(() => replace('/lobby'), dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)