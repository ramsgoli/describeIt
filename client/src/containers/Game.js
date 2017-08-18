import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import GameComponent from '../components/Game'

class Game extends React.Component {
    componentWillReceiveProps(nextProps) {

    }

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