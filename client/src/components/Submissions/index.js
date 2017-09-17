import React from 'react'
import Button from '../Button'

import css from './style.scss'

export default class extends React.Component {
    state = {
        submitted: false,
        answer: ''
    }

    onChange = e => {
        this.setState({
            answer: e.target.value
        })
    }

    _submit = () => {
        this.setState({
            submitted: true
        })
        this.props.addSubmission(this.state.answer)
    }

    _renderCheck = () => {
        return (
            <div className={css.checkWrapper}>
                <i className="fa fa-check"></i>
            </div>
        )
    }

    render() {
        const { currentPlayer } = this.props

        return(
            <div className={css.wrapper}>
                <div className={css.questionContainer}>
                    <h1>{this.props.question}</h1>
                </div>
                <textarea
                    value={this.state.answer}
                    className={css.submissionText}
                    onChange={this.onChange}
                />
                <div className={css.btnContainer}>
                    <Button onClick={this._submit} disabled={this.state.submitted}>Submit</Button>
                </div>
                <div className={css.table}>
                    <div className={css.row}>
                        {`${currentPlayer.get('name')} *`}
                        {this.state.submitted ? this._renderCheck() : null}
                    </div>
                    {this.props.players.map(player => {
                        return (
                            <div className={css.row} key={player.get('id')}>
                                {player.get('name')}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}