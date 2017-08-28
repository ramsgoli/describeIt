import React from 'react'

import style from './style.scss'

class Lobby extends React.Component {
    render() {
        console.log(this.props.players)
        return (
            <div className={style.wrapper}>
                <div className={style.content}>
                    <h1>Lobby</h1>
                    <p>{this.props.accessCode}</p>
                    <p>Current Player: {this.props.currentPlayer}</p>
                    {this.props.players.map(player => (
                        <p key={player.id}>{player.name}</p>
                    ))}
                </div>
            </div>
        )
    }
}

export default Lobby