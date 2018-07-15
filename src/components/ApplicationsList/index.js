import React, {Component} from 'react';
import './ApplicationList.css';

class ApplicationsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggleOpen = (e) => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    handleApplicationClicked = (e) => {
        const target = e.currentTarget;
        const appid = target.getAttribute('data-id');
        this.setState({
            isOpen: false
        });
        this.props.onApplicationSelected(appid);
    };

    render() {
        const currentApp = this.props.applications.reduce((acc, curr) => {
            return curr._id === this.props.currentApplication ? curr : acc;
        }, {});

        return (
            <div className="ApplicationList">
                <button onClick={this.toggleOpen}>
                    <div
                        className={[
                            'ApplicationList__item',
                            currentApp.enabled ? '--enabled' : ''
                        ].join(' ')}
                    >
                        <b>{currentApp.name}</b>
                        <span>{currentApp.environment}</span>
                    </div>
                </button>
                <ul
                    className={[
                        'ApplicationList__list',
                        this.state.isOpen ? '--visible' : ''
                    ].join(' ')}
                >
                    {this.props.applications.map((app) => {
                        const classNames = [
                            'ApplicationList__item',
                            app.enabled ? '--enabled' : '',
                            app._id === this.props.currentApplication
                                ? '--selected'
                                : ''
                        ]
                            .filter((c) => c !== '')
                            .join(' ');

                        return (
                            <li
                                key={app._id}
                                data-id={app._id}
                                className={classNames}
                                onClick={this.handleApplicationClicked}
                            >
                                <b title={app.name}>{app.name}</b>
                                <span>{app.environment}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ApplicationsList;
