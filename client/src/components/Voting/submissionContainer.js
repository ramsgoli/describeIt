import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Quote from '../Quote'

import css from './style.scss'

class SubmissionContainer extends React.Component {
    state = {
        dropdownOpen: false,
        selected: null,
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    select = name => {
        this.setState({
            selected: name
        });
    }

    render() {
        return (
            <div className="submission-container">
                <div className="quote-container">
                    <Quote />
                    <div className="submission-text">
                        {this.props.submission}
                    </div>
                </div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        {this.state.selected}
                    </DropdownToggle>
                    <DropdownMenu>
                        {this.props.players.map(player => {
                            return <DropdownItem onClick={e => this.select(e.currentTarget.textContent)}>{player}</DropdownItem>
                        })}
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }
}

export default SubmissionContainer