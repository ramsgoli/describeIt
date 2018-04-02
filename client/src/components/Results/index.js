import React from 'react';

import Quote from 'components/Quote';

class Results extends React.Component {
    renderWinners = () => {
        return this.props.results.get('winners').map(winner => {
            let player;

            if (winner === this.props.currentPlayer.get('name')) {
                player = this.props.currentPlayer;
            } else {
                player = this.props.players.find(player => {
                    return player.get('name') == winner;
                });
            }
            const numCorrect = this.props.results.get('players').find(_player => _player.get('name') === player.get('name')).get('numCorrect');

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

    renderPlayers = () => {
        console.log(this.props);
        return this.props.results.get('players').map(player => {
            if (this.props.results.get('winners').includes(player.get('name'))) {
                return null;
            } 
            let playerObj = this.props.players.find(_player => {
                return _player.get('name') == player.get('name');
            });
            playerObj = playerObj || this.props.currentPlayer;

            return (
                <div className="player">
                    <h1>{player.get('name')} - guessed {player.get('numCorrect')} right</h1>
                    <div className="quote-container">
                        <Quote className="purple" />
                        <div className="submission-text">
                            {playerObj.getIn(['submission', 'text'])}
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
                <div className="players">
                    {this.renderPlayers()}
                </div>
                <div className="tap">
                    <i className="fa fa-arrow-up"></i>
                    <p> Tap to see what they voted</p>
                </div>
            </div>
        );
    }
}

export default Results;