import React from 'react'
import css from './style.scss'

export default class extends React.Component {
    render() {
        return(
            <div className={css.wrapper}>
                <div className={css.instructions}>
                    Select who you think each submission belongs to
                </div>

            </div>
        )
    }
}
