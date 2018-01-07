import React from 'react'
import Button from '../Button'

class Lobby extends React.Component {
    render() {

        const currentPlayer = this.props.currentPlayer
        return (
            <div className="lobby-container">
                <div className="access-code">
                    <h1>{this.props.accessCode}</h1>
                    <hr/>
                </div>
                <div className="table">
                    <div className="row">
                        {`${currentPlayer.get('name')} *`}
                    </div>
                    {this.props.players.map(player => {
                        return (
                            <div className="row" key={player.get('id')}>
                                {player.get('name')}
                            </div>
                        )
                    })}
                </div>
                <div className="btn-container">
                    <Button onClick={this.props.startGame}>Start Game</Button>
                </div>
            </div>
        )
    }
}

export default Lobby
