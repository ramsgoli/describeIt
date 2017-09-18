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
        question: Game.get('question'),
        currentPlayer: CurrentPlayer,
        players: Players.get('players'),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSubmission: bindActionCreators(currentPlayerActions.addSubmission, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionsContainer)
