import React, {Component} from 'react';
import "./HeaderUser.css";

class HeaderUser extends Component {
    render() {
        return (
            <div className="HeaderUser">
                {this.props.currentUser? this.props.currentUser.profile.full_name: ''}
            </div>
        );
    }
}

export default HeaderUser;
