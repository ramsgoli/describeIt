import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { lobbyActions } from '../reducers'

class LobbyContainer extends React.Component {
    render() {
        return (
            <div>Lobby</div>
        )
    }
}

const mapStateToProps = state => {
    const Lobby = state.Lobby

    return {
        _internal: Lobby.get('_internal')
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startGame: bindActionCreators(lobbyActions.startGame, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyContainer)
