import React from 'react'
import css from './style.css'

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
            <div className={css['btn-2a']}
                onClick={this._onClick}
            >
                {this.props.children}
            </div>
        )
    }
}

export default Button