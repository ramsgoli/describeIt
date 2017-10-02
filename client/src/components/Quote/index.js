import React from 'react'
import css from './style.scss'

export default class extends React.Component {
    render() {
        return(
            <div className={css.quote}>
                <span>&ldquo;</span>
            </div>
        )
    }
}