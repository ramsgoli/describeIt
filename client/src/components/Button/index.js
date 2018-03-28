import React from 'react'

class Button extends React.Component {

    _onClick = () => {
        this.props.onClick()
    }

    render() {
        /**
         * primary:
         */
        const className = this.props.disabled ? "success disabled" : "success"

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
