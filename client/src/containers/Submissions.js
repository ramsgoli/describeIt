import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { currentPlayerActions } from '../reducers'
import Submissions from '../components/Submissions'

class SubmissionsContainer extends React.Component {
    render() {
        return(
            <Submissions
                question={this.props.question}
                players={this.props.players}
                currentPlayer={this.props.currentPlayer}
                addSubmission={this.props.addSubmission}
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

const mapDispatchToProps = dispatch => {
    return {
        addSubmission: bindActionCreators(currentPlayerActions.addSubmission, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionsContainer)
