import React from 'react'
import { connect } from 'react-redux'

class SubmissionsContainer extends React.Component {
    render() {
        return(
            <div>
                <h1>Submisssions</h1>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const Game = state.Game

    return {
        accessCode: Game.get('accessCode')
    }
}

export default connect(mapStateToProps)(SubmissionsContainer)
