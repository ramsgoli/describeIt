import React from 'react'
import Button from '../Button'

import style from './style.scss'

class Lobby extends React.Component {
    render() {
        return (
            <div className={style.wrapper}>
                <div className={style.content}>
                    <h1>Lobby</h1>
                    <p>{this.props.accessCode}</p>
                    <p>Current Player: {this.props.currentPlayer}</p>
                    {this.props.players.map(player => (
                        <p key={player.id}>{player.name}</p>
                    ))}
                    <Button onClick={this.props.startGame}>Start Game</Button>
                </div>
            </div>
        )
    }
}

export default Lobby