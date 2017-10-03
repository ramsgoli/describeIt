import React from 'react'
import css from './style.scss'

import SubmissionContainer from './submissionContainer'

class Voting extends React.Component {
    render() {
        return(
            <div className={css.wrapper}>
                <div className={css.instructions}>
                    Select who you think each submission belongs to
                </div>
                {this.props.players.map(player => {
                    return(
                        <SubmissionContainer key={player.get('id')} submission={player.get('submission')}/>
                    )
                })}
            </div>
        )
    }
}

export default Voting
