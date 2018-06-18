import React from 'react'

import Button from '../../components/Button'


class Home extends React.Component {

    state = {
        mode: '',
        name: '',
        accessCode: ''
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
            <div className="btn-container">
                <div>
                    <Button onClick={() => this.setMode('create')}>Create Game</Button>
                    <Button onClick={() => this.setMode('join')}>Join Game</Button>
                </div>
            </div>

        if (this.state.mode === 'create') {
            content =
                <section>
                    <form className="create-game-field" onChange={this.handleChange} onSubmit={e => e.preventDefault()}>
                        <input
                            name="name"
                            type="text"
                            placeholder="name"
                            defaultValue={this.state.name}
                        />
                    </form>
                    <Button onClick={this.submit}>Go</Button>
                    <Button onClick={this.goBack}>Back</Button>
                </section>
        }

        if (this.state.mode === 'join') {
            content =
                <section>
                    <form className="join-game-field" onChange={this.handleChange}>
                        <input
                            name="name"
                            type="text"
                            placeholder="name"
                            defaultValue={this.state.name}
                        />
                        <input
                            name="accessCode"
                            placeholder="access code"
                            type="text"
                            defaultValue={this.state.accessCode}
                        />
                    </form>
                    <Button onClick={this.submit}>Go</Button>
                    <Button onClick={this.goBack}>Back</Button>
                </section>
        }

        return(
            <div className="home-wrapper">
                <div className="main">
                    <h1>DescribeIt</h1>
                    {content}
                </div>
            </div>
        )
    }
}

export default Home
