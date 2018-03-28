import React from 'react';

import { connect } from 'react-redux'
import { Actions } from 'reducers';

import Results from 'components/Results';

class ResultsContainer extends React.Component {
    render() {
        return(
            <Results 
                results={this.props.results}
                players={this.props.players}
                currentPlayer={this.props.currentPlayer}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        results: state.Votes.get('results'),
        players: state.Players.get('players'),
        currentPlayer: state.CurrentPlayer,
    };
}

export default connect(mapStateToProps)(ResultsContainer);