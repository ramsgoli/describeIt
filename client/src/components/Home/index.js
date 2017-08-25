import React from 'react'

import css from './style.scss'
import Button from 'components/Button'


class Home extends React.Component {

    state = {
        mode: '',
        name: '',
        accessCode: ''
    }

    componentDidMount() {
    }

    setMode = (mode) => {
        this.setState({
            mode: mode
        })
    }

    goBack = () => {
        this.setState({
            mode: ''
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

    submit = () => {
        const {mode, name, accessCode} = this.state

        if (mode === 'create') {
            this.props.createGame(name)
        } else if (mode === 'join') {
            this.props.joinGame(name, accessCode)
        }
    }

    render() {
        let content =
            <div className={css.home}>
                <div>
                    <Button onClick={() => this.setMode('create')}>Create Game</Button>
                    <Button onClick={() => this.setMode('join')}>Join Game</Button>
                </div>
            </div>

        if (this.state.mode === 'create') {
            content =
                <section>
                    <form className={css.createGameField} onChange={this.handleChange}>
                        <label>
                            Name:
                            <input
                                name="name"
                                type="text"
                                defaultValue={this.state.name}
                            />
                        </label>
                    </form>
                    <Button onClick={this.submit}>Go</Button>
                    <Button onClick={this.goBack}>Back</Button>
                </section>
        }

        if (this.state.mode === 'join') {
            content =
                <section>
                    <form className={css.joinGameField} onChange={this.handleChange}>
                        <label>
                            Name:
                            <input
                                name="name"
                                type="text"
                                defaultValue={this.state.name}
                            />
                        </label>
                        <label>
                            Access Code:
                            <input
                                name="accessCode"
                                type="text"
                                defaultValue={this.state.accessCode}
                            />
                        </label>
                    </form>
                    <Button onClick={this.submit}>Go</Button>
                    <Button onClick={this.goBack}>Back</Button>
                </section>
        }

        return(
            <div className={css.wrapper}>
                <div className={css.main}>
                    <h1>DescribeIt</h1>
                    {content}
                </div>
            </div>
        )
    }
}

export default Home