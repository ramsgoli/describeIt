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

        const className = this.props.disabled ? css.btnSuccessDisabled : css.btnSuccess

        return(
            <button className={className}
                onClick={this._onClick}
            >
                {this.props.children}
            </button>
        )
    }
}

export default Button