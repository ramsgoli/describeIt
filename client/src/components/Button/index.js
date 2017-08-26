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
            <button className={css.btn}
                onClick={this._onClick}
            >
                {this.props.children}
            </button>
        )
    }
}

export default Button