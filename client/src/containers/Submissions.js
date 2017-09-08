import React from 'react'
import { connect } from 'react-redux'

import Submissions from '../components/Submissions'

class SubmissionsContainer extends React.Component {
    render() {
        return(
            <Submissions
                question={this.props.question}
                players={this.props.players}
                currentPlayer={this.props.currentPlayer}
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
        players: Players.get('players'),
        question: Game.get('question')
    }
}

export default connect(mapStateToProps)(SubmissionsContainer)
