import React from 'react'
import css from './style.scss'

class Button extends React.Component {

    _onClick = (e) => {
        e.preventDefault()
        this.props.onClick()
    }

    render() {
        /**
         * primary:
         */
        return(
            <div className={css.btn}
                onClick={this._onClick}
            >
                {this.props.children}
            </div>
        )
    }
}

export default Button