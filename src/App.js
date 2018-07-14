import React, {Component} from 'react';
import Api from './services/Api';

import ApplicationsList from './components/ApplicationsList';
import HeaderUser from './components/HeaderUser';
import Login from './components/Login';
import Summary from './components/Summary';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.api = null;
        this.state = {
            user: null,
            applications: [],
            currentApplication: null,
            currentUser: null,
            hosts: null,
            timeline: null
        };
    }

    fetchData = () => {
        if (this.state.user) {
            this.api = new Api(this.state.user);
            this.api.getApplications().then((response) => {
                const currentApp = response.data[0]._id;
                this.setState(
                    {
                        applications: response.data,
                        currentApplication: currentApp
                    },
                    this.fetchDataForCurrentApp
                );
            });
            this.api.getCurrentUser().then((response) => {
                this.setState({
                    currentUser: response.data
                });
            });
        }
    };

    fetchDataForCurrentApp = async () => {
        this.api
            .getAppHosts(this.state.currentApplication)
            .then((hostsResponse) => {
                this.setState({
                    hosts: hostsResponse.data
                });
            });
        this.api
            .getAppTimeline(this.state.currentApplication)
            .then((timelineResponse) => {
                this.setState({
                    timeline: timelineResponse.data
                });
            });
    };

    handleApplicationSelected = (appid) => {
        this.setState(
            {
                currentApplication: appid
            },
            this.fetchDataForCurrentApp
        );
    };

    handleLogin = (login) => {
        this.setState(
            {
                currentUser: login.currentUser,
                user: login.user
            },
            this.fetchData
        );
    };

    render() {
        if (!this.state.user) {
            return <Login onLogin={this.handleLogin} />;
        } else {
            return (
                <div className="App">
                    <header className="App__header">
                        <ApplicationsList
                            applications={this.state.applications}
                            currentApplication={this.state.currentApplication}
                            onApplicationSelected={
                                this.handleApplicationSelected
                            }
                        />
                        <HeaderUser currentUser={this.state.currentUser} />
                    </header>
                    <div className="App__content">
                        <Summary
                            hosts={this.state.hosts}
                            timeline={this.state.timeline}
                        />
                    </div>
                </div>
            );
        }
    }
}

export default App;
