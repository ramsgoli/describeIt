import React from 'react'
import Button from '../Button'

import css from './style.scss'

export default class extends React.Component {
    state = {
        answer: ''
    }

    onChange = e => {
        this.setState({
            answer: e.target.value
        })
    }

    _submit = () => {
        this.setState({
            loading: true
        })
        this.props.addSubmission(this.state.answer)
    }

    _renderCheck = () => {
        return (
            <div className="check">
                <i className="fa fa-check"></i>
            </div>
        )
    }

    render() {
        const { currentPlayer } = this.props
        const submission = currentPlayer.get('submission')
        const submitted = this.props._internal.get('submitted');

        return(
            <div className="submissions-container">
                <div className="question-container">
                    <h1>{this.props.question}</h1>
                </div>
                <textarea
                    value={this.state.answer}
                    className="submission-text"
                    onChange={this.onChange}
                />
                <div className="btn-container">
                    <Button onClick={this._submit} loading={this.state.loading} disabled={submitted}>{submitted ? "Submitted" : "Submit"}</Button>
                </div>
                <div className="submissions-table">
                    <div className="submissions-row">
                        {`${currentPlayer.get('name')} *`}
                        {submission ? this._renderCheck() : null}
                    </div>
                    {this.props.players.map(player => {
                        return (
                            <div className="submissions-row" key={player.get('id')}>
                                {player.get('name')}
                                {player.get('submission') ? this._renderCheck() : null}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
