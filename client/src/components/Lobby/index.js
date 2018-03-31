import React from 'react'
import Button from '../Button'

class Lobby extends React.Component {
    state = {
        loading: false
    }

    startGame = () => {
        this.setState({
            loading: true
        })
        this.props.startGame();
    }
    render() {
        const currentPlayer = this.props.currentPlayer
        return (
            <div className="lobby-container">
                <div className="access-code">
                    <h1>{this.props.accessCode}</h1>
                    <hr/>
                </div>
                <div className="lobby-table">
                    <div className="lobby-row">
                        {`${currentPlayer.get('name')} *`}
                    </div>
                    {this.props.players.map(player => {
                        return (
                            <div className="lobby-row" key={player.get('id')}>
                                {player.get('name')}
                            </div>
                        )
                    })}
                </div>
                <div className="btn-container">
                    <Button onClick={this.startGame} disabled={this.state.loading}>Start Game</Button>
                </div>
            </div>
        )
    }
}

export default Lobby
