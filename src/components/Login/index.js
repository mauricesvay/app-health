import React, {Component} from 'react';
import Api from '../../services/Api';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: false
        };
        this.userInput = React.createRef();
    }

    checkLogin(token) {
        const api = new Api(token);
        return api.getCurrentUser();
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            error: null,
            isLoading: true
        });
        const value = this.userInput.current.value;
        try {
            const currentUser = await this.checkLogin(value);
            this.setState({
                isLoading: false
            });
            this.props.onLogin({
                currentUser: currentUser.data,
                user: this.userInput.current.value
            });
        } catch (error) {
            this.setState({
                error: 'Token is not valid',
                isLoading: false
            });
        }
    };

    render() {
        return (
            <div className="Login">
                <form className="Login__form" onSubmit={this.handleSubmit}>
                    <h1 className="Login__title">App Health</h1>
                    <label htmlFor="Login-user">
                        Sign in with your user token:
                    </label>
                    {this.state.error && (
                        <div className="Login__error">{this.state.error}</div>
                    )}
                    <input
                        id="Login-user"
                        name="user"
                        type="text"
                        className="input --text --large"
                        defaultValue=""
                        placeholder=""
                        autoCorrect="false"
                        size="32"
                        ref={this.userInput}
                        required
                    />
                    <button
                        type="submit"
                        className="button --primary --large"
                        disabled={this.state.isLoading}
                    >
                        Sign in
                    </button>
                </form>
            </div>
        );
    }
}

export default Login;
