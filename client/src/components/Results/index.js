import React from 'react';

import Quote from 'components/Quote';

class Results extends React.Component {
    renderWinners = () => {
        return this.props.results.get('winners').map(winner => {
            const numCorrect = this.props.results.get(winner);
            let player;

            if (winner === this.props.currentPlayer.get('name')) {
                player = this.props.currentPlayer;
            } else {
                player = this.props.players.find(player => {
                    return player.get('name') == winner;
                });
            }

            return (
                <div className="winner">
                    <h1><i className="fa fa-star"></i> {winner} - guessed {numCorrect} right</h1>
                    <div className="quote-container">
                        <Quote className="purple" />
                        <div className="submission-text">
                            {player.getIn(['submission', 'text'])}
                        </div>
                    </div>
                </div>
            );
        })
    }

    render() {
        return (
            <div className="results-container">
                <div className="heading">Results</div>
                <div className="winners">
                    {this.renderWinners()}
                </div>
            </div>
        );
    }
}

export default Results;