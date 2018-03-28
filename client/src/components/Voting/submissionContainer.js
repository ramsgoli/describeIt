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

    select = (userId, name) => {
        this.setState({
            selected: name
        });
        this.props.vote(this.props.submission.get('id'), userId)
    }

    render() {
        return (
            <div className="submission-container">
                <div className="quote-container">
                    <Quote className="red"/>
                    <div className="submission-text">
                        {this.props.submission.get('text')}
                    </div>
                </div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        {this.state.selected}
                    </DropdownToggle>
                    <DropdownMenu>
                        {this.props.players.map(player => {
                            return <DropdownItem onClick={() => this.select(player.get('id'), player.get('name'))}>{player.get('name')}</DropdownItem>
                        })}
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }
}

export default SubmissionContainer