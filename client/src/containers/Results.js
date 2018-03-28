import React from 'react';

import { connect } from 'react-redux'
import { Actions } from 'reducers';

import Results from 'components/Results';

class ResultsContainer extends React.Component {
    render() {
        return(
            <Results />
        );
    }
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer);