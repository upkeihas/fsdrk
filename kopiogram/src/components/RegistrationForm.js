import React, { Component } from 'react';
import '../registrationform.css';

class RegistrationForm extends Component {

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
		
  <div id="id01" class="w3-modal" style={{ display: 'block' }}>
    <div class="w3-modal-content w3-card-4 w3-animate-zoom">

      <div class="w3-center"><br></br>
        <span class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
        <img src="img_avatar4.png" alt="Avatar" class="w3-circle w3-margin-top"></img>
      </div>

      <form class="w3-container">
        <div class="w3-section">
          <label><b>Username</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter Username" name="usernameInput" value={this.state.username} onChange={this.onChange} required/>
          <label><b>Password</b></label>
          <input class="w3-input w3-border" type="password" placeholder="Enter Password" name="passwordInput" value={this.state.password} onChange={this.onChange} required/>
          <button class="w3-button w3-block w3-green w3-section w3-padding" onClick={this.onSubmit} name="loginButton" value="Login">Login</button>
        </div>
      </form>

      <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
        <button type="button" class="w3-button w3-red">Cancel</button>
        <span class="w3-right w3-padding w3-hide-small">Forgot <a href="#">password?</a></span>
      </div>

    </div>
  </div>
		
			
		);
	}
}

export default RegistrationForm