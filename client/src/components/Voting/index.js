import React from 'react'
import css from './style.scss'

import SubmissionContainer from './submissionContainer'

class Voting extends React.Component {
    render() {
        const playerNames = this.props.players.map(player => {
            return player.get('name')
        })
        return(
            <div className="voting-container">
                <div className="voting-instructions">
                    Select who you think each submission belongs to
                </div>
                {this.props.players.map(player => {
                    return(
                        <SubmissionContainer key={player.get('id')} players={playerNames} submission={player.get('submission')}/>
                    )
                })}
            </div>
        )
    }
}

export default Voting
