import React from 'react'
import css from './style.scss'

class Button extends React.Component {

    _onClick = () => {
        this.props.onClick()
    }

    render() {
        /**
         * primary:
         */

        return(
            <button className={css.btnSuccess}
                onClick={this._onClick}
            >
                {this.props.children}
            </button>
        )
    }
}

export default Button