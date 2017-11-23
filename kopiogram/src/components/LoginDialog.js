import React, { Component } from 'react';


class LoginDialog extends Component {

	constructor(props){
		super(props);
		this.state={
			username:"",
			password:""
		}
	this.onChange = this.onChange.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event){
		if(event.target.name === "usernameInput"){
			this.setState({
				username:event.target.value
			})
		}
		if(event.target.name === "passwordInput"){
			this.setState({
				password:event.target.value
			})
		}
	}

	onSubmit(event){
		let userinfo = {
			username:this.state.username,
			password:this.state.password
		}
		if (event.target.name === "registerButton"){
			this.props.onRegister(userinfo);
		}
		if (event.target.name === "loginButton"){
			this.props.onLogin(userinfo);
		}
		this.setState({
			username:"",
			password:""
		})
		event.preventDefault();
	}
	
	render(){
		return(
			<div className="logindialog">
				<form>
					User name:
					<input type="text"
						name="usernameInput"
						value={this.state.username}
						onChange={this.onChange}/>
					Password:
					<input type="password"
						name="passwordInput"
						value={this.state.password}
						onChange={this.onChange}/>
					<input type="button" onClick={this.onSubmit} name="registerButton" value="Register"/>
					<input type="button" onClick={this.onSubmit} name="loginButton" value="Login"/>
				</form>
			</div>
		);
	}
}

export default LoginDialog