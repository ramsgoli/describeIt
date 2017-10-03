import React from 'react'
import Voting from '../components/Voting'

import { connect } from 'react-redux'

class VotingContainer extends React.Component {
    render() {
        return (
            <Voting
                players={this.props.players}
            />
        )
    }
}

const mapStateToProps = state => {
    const players = state.Players.get('players')
    return {
        players: players
    }
}

export default connect(mapStateToProps)(VotingContainer)