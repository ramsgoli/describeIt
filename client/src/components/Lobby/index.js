import React from 'react'

class Lobby extends React.Component {
    render() {
        return (
            <div>
                <h1>Lobby</h1>
                <p>{this.props.accessCode}</p>
            </div>
        )
    }
}

export default Lobby