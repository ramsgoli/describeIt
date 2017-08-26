import React from 'react'

import style from './style.scss'

class Lobby extends React.Component {
    render() {
        return (
            <div className={style.wrapper}>
                <div className={style.content}>
                    <h1>Lobby</h1>
                    <p>{this.props.accessCode}</p>
                </div>
            </div>
        )
    }
}

export default Lobby