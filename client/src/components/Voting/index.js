import React from 'react'
import css from './style.scss'

import SubmissionContainer from './submissionContainer';
import Button from 'components/Button';
import Loader from 'components/Loader';

class Voting extends React.Component {
    state = {
        votes: [],
        loading: false
    }

    vote = (submissionId, userId) => {
        const votes = this.state.votes;
        const _vote = {
            submissionId,
            userId
        };
        this.setState({
            votes: [...votes, _vote]
        })
    }

    submit = () => {
        this.props.submitVotes(this.state.votes);
    }

    renderButtonContents = () => {
        const loading = this.props._internal.get('loading');
        const success = this.props._internal.get('success');

        if (loading) {
            return <Loader />
        } else if (success) {
            return <div>Submitted <i className="fa fa-check"></i></div>;
        } else {
            return "Submit";
        }
    }

    render() {
        const success = this.props._internal.get('success');
        return(
            <div className="voting-container">
                <div className="voting-instructions">
                    Select who you think each submission belongs to
                </div>
                {this.props.players.map(player => {
                    return (
                        <SubmissionContainer 
                            key={player.get('id')} 
                            vote={this.vote}
                            players={this.props.players} 
                            submission={player.get('submission')}
                        />
                    );
                })}
                <Button onClick={this.submit} disabled={success}>{this.renderButtonContents()}</Button>
            </div>
        )
    }
}

export default Voting
