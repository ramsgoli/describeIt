import React from 'react'
import css from './style.scss'

class Quote extends React.Component {
    render() {
        return(
            <div className={css.quote}>
                <span>&ldquo;</span>
            </div>
        )
    }
}

export default Quote