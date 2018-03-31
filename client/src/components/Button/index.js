import React from 'react'

class Button extends React.Component {

    _onClick = () => {
        if (!this.props.disabled) {
            this.props.onClick()
        }
    }

    render() {
        /**
         * primary:
         */
        const className = this.props.disabled ? "disabled" : "success"

        return(
            <button className={`custom-btn ${className}`}
                onClick={this._onClick}
            >
                {this.props.children}
            </button>
        )
    }
}

export default Button
