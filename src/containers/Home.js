import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { homeActions } from 'reducers'

import HomeComponent from 'components/Home'

class Home extends React.Component {
    render() {
        return(
            <HomeComponent
                createGame={this.props.createGame}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGame: bindActionCreators(homeActions.createGameStart, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)