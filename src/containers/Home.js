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
                joinGame={this.props.joinGame}
                _internal={this.props._internal}
            />
        )
    }
}

const mapStateToProps = (state) => {
    const Home = state.Home

    return {
        _internal: Home.get('_internal')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGame: bindActionCreators(homeActions.createGame, dispatch),
        joinGame: bindActionCreators(homeActions.joinGame, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)