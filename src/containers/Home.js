import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { homeActions } from 'reducers'

import HomeComponent from 'components/Home'

class Home extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps._internal.get('success') === true) {
            this.props.redirectToGame()
        }
    }
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
        joinGame: bindActionCreators(homeActions.joinGame, dispatch),
        redirectToGame: bindActionCreators(() => push('/app'), dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)