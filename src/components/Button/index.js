import React from 'react'
import css from './style.css'

class Button extends React.Component {

    _onClick = (e) => {
        e.preventDefault()
        this.props.onClick()
    }

    render() {
        return(
            <div className={css.btn}
                onClick={this._onClick}
            >
                {this.props.text}
            </div>
        )
    }
}

export default Button