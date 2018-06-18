import React from 'react';
import Quote from 'components/Quote';

const VoteContainer = props => {
    return (
        <div className="player-vote-container">
            <div className="quote-container">
                <Quote className="purple" />
                <div className="quote-text">
                    <p>{props.text}</p>
                    <div className="name">
                        <p><span>{props.name}</span></p>
                        {props.correct ? <i className="fa fa-check"></i> : <i className="fa fa-times"></i>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ({player, goBack}) => {
    return (
        <div className="player-votes-container">
            <div className="container">
                <div className="heading">{player.get('name')}</div>
                {player.get('votes').map(vote => {
                    return <VoteContainer text={vote.get('text')} name={vote.get('votedFor')} correct={vote.get('correct')} />
                })}
                <div className="back" onClick={goBack}>
                    <p><i className="fa fa-arrow-left"></i> Go Back</p>
                </div>
            </div>
        </div>
    );
}