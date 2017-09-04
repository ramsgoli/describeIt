import React from 'react'
import { Input, Button } from 'reactstrap'

import css from './style.scss'

export default class extends React.Component {
    state = {
        submitted: false
    }
    render() {
        return(
            <div className={css.wrapper}>
                <div className={css.questionContainer}>
                    <h1>{this.props.question}</h1>
                </div>
                <Input className={css.submissionInput} type="textarea" name="text" id="submission"/>
            </div>
        )
    }
}