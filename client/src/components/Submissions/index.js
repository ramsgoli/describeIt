import React from 'react'
//import { Input, Button } from 'reactstrap'

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

    render() {
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
            </div>
        )
    }
}