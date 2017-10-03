import React from 'react'
import Voting from '../components/Voting'

import { connect } from 'react-redux'

class VotingContainer extends React.Component {
    render() {
        return (
            <Voting
                playerNames={this.props.playerNames}
                submissions={this.props.submissions}
            />
        )
    }
}

const mapStateToProps = state => {
    const players = state.Players
    return {
        playerNames: players.map(player => player.get('name')),
        submissions: players.map(player => player.get('submission'))
    }
}

export default connect(mapStateToProps)(VotingContainer)