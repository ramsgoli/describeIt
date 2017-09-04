import React from 'react'
import { connect } from 'react-redux'

import Submissions from '../components/Submissions'

class SubmissionsContainer extends React.Component {
    render() {
        return(
            <Submissions
                question={this.props.question}
            />
        )
    }
}

const mapStateToProps = state => {
    const Game = state.Game

    return {
        accessCode: Game.get('accessCode'),
        question: Game.get('question'),
    }
}

export default connect(mapStateToProps)(SubmissionsContainer)
