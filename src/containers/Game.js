import React from 'react'
import { connect } from 'react-redux'

import GameComponent from 'components/Game'

class Game extends React.Component {
    render() {
        return(
           <GameComponent />
        )
    }
}

const mapStateToProps = state => {
    return null
}

const mapDispatchToProps = dispatch => {
    return null
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)