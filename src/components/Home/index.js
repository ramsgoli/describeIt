import React from 'react'

import css from './style.css'
import Button from 'components/Button'

class Home extends React.Component {

    state = {
        mode: '',
        name: '',
        accessCode: ''
    }

    newGame = () => {
        this.setState({
            mode: 'create'
        })
    }

    joinGame = () => {
        this.setState({
            mode: 'join'
        })
    }

    handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value

        this.setState({
            [name]: value
        })
    }


    createGame = () => {
        this.props.createGame()
    }

    render() {
        let content =
            <div className={css.home}>
                <h1>DescribeIt</h1>

                <div className={css['buttons-container']}>
                    <Button text="Create Game" onClick={this.newGame} />
                    <Button text="Join Game" onClick={this.joinGame} />
                </div>
            </div>

        if (this.state.mode == 'create') {
            content =
                <form className={css.createGameField} onChange={this.handleChange}>
                    <label>
                        Name:
                        <input
                            name="name"
                            type="text"
                            value={this.state.name}
                        />
                    </label>

                </form>
        }

        if (this.state.mode == 'join') {
            content =
                <form className={css.joinGameField} onChange={this.handleChange}>
                    <label>
                        Name:
                        <input
                            name="name"
                            type="text"
                            value={this.state.name}
                        />
                    </label>
                    <label>
                        Access Code:
                        <input
                            name="accessCode"
                            type="text"
                            value={this.state.accessCode}
                        />
                    </label>
                </form>
        }

        return(
            <div className="content-wrapper">
                {content}
            </div>
        )
    }
}

export default Home