import React from 'react'
import Voting from '../components/Voting'

import { connect } from 'react-redux'
import { Actions } from 'reducers';

class VotingContainer extends React.Component {
    render() {
        return (
            <Voting
                players={this.props.players}
                submitVotes={this.props.submitVotes}case 
                _internal={this.props._internal}
            />
        )
    }
}

const mapStateToProps = state => {
    const players = state.Players.get('players')
    const votes = state.Votes;
    return {
        players: players,
        _internal: votes.get('_internal'),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitVotes: votes => {
            dispatch(Actions.voteActions.submitVotes(votes));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VotingContainer)