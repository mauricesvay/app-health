import React, {Component} from 'react';
import Api from './services/Api';

import ApplicationsList from './components/ApplicationsList';
import HeaderUser from './components/HeaderUser';
import Login from './components/Login';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            applications: [],
            currentApplication: null,
            currentUser: null
        };
    }

    fetchData = () => {
        if (this.state.user) {
            const api = new Api(this.state.user);
            api.getApplications().then((response) => {
                this.setState({
                    applications: response.data,
                    currentApplication: response.data[0]._id
                });
            });
        }
    };

    handleApplicationSelected = (appid) => {
        this.setState({
            currentApplication: appid
        });
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
                </div>
            );
        }
    }
}

export default App;
