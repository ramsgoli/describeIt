import React from 'react'

export default class extends React.Component {
    render() {
        return (
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
        )
    }
}