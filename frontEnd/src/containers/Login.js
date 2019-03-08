import React, { Component } from 'react';
import { singIn } from '../API';
import { withRouter } from 'react-router-dom'
class Login extends Component {
    state = {
        login: "",
        password: "",
        visible: "hidden"
    }

    inputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async event => {
        event.preventDefault();
        const passess = {
            login: this.state.login,
            password: this.state.password
        }
        await singIn(passess)
            .then((data) => {
                if (data === "wrong") {
                    this.setState({ visible: "visible" })
                }
                else {
                    this.props.history.push({
                        pathname: '/main',
                        state: { detail: data }
                    });
                }

            })

    }

    render() {
        return (
            <div className="App">
                <main style={{ width: 320 }} className="container">
                    <form onSubmit={this.handleSubmit}>

                        <label>Login</label>
                        <input autoComplete="off" onChange={this.inputChange} className="form-control" value={this.state.login} name="login" ></input>


                        <label>hasło</label>
                        <input type="password" autoComplete="off" onChange={this.inputChange} className="form-control" value={this.state.password} name="password" ></input>
                        <br />
                        <button className="btn btn-success">zaloguj</button>
                    </form>
                    <span style={{ visibility: this.state.visible }}>zły login lub hasło</span>
                </main>
            </div>
        );
    }
}

export default withRouter(Login);