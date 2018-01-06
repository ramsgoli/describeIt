import React from 'react'
import Quote from '../Quote'
import Select from 'react-select'

import css from './style.scss'

class SubmissionContainer extends React.Component {
    render() {
        const options = this.props.players.map(player => {
            return {
                label: player,
                value: player
            }
        }).toJS()

        return (
            <div className={css.submissionContainer}>
                <Quote />
                <div className={css.submissionText}>
                    {this.props.submission}
                </div>
                <Select
                    options={options}
                />
            </div>
        )
    }
}

export default SubmissionContainer