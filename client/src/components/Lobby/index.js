import React from 'react'
import Button from '../Button'

import css from './style.scss'

class Lobby extends React.Component {
    render() {

        const currentPlayer = this.props.currentPlayer
        return (
            <div className={css.wrapper}>
                <div className={css.accessCode}>
                    <h1>{this.props.accessCode}</h1>
                    <hr/>
                </div>
                <div className={css.table}>
                    <div className={css.row}>
                        {`${currentPlayer.get('name')} *`}
                    </div>
                    {this.props.players.map(player => {
                        return (
                            <div className={css.row} key={player.get('id')}>
                                {player.get('name')}
                            </div>
                        )
                    })}
                </div>
                <div className={css.btnContainer}>
                    <Button onClick={this.props.startGame}>Start Game</Button>
                </div>
            </div>
        )
    }
}

export default Lobby