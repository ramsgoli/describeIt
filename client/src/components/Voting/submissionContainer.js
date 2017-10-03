import React from 'react'
import Quote from '../Quote'
import Select from 'react-select';


import css from './style.scss'

class SubmissionContainer extends React.Component {
    render() {
        return (
            <div className={css.submissionContainer}>
                <Quote />
                <div className={css.submissionText}>
                    {this.props.submission}
                </div>
            </div>
        )
    }
}

export default SubmissionContainer