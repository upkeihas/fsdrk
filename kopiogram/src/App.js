import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import UserProfile from './components/UserProfile';
import ImageGallery from './components/ImageGallery';

class App extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			numberOfImages:16,
			isLogged:true,
//			token:""
		}
		this.onLogin = this.onLogin.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.onUpload = this.onUpload.bind(this);
	}

//	When upload button is pressed in NavigationBar.js this function is called
	onUpload(){
		console.log("Upload images logic goes here");
	}

// Calling more functions from navbar: in and out

	onRegister(userinfo) {
			console.log(userinfo);
	}
	
	onLogin(userinfo){
		console.log(userinfo);
		this.setState({
			isLogged:true
		})
	}

	onLogout(){
		console.log("Logged out!");
		this.setState({
			isLogged:false
		})
	}
		
// LOGIN-JUTUT

/*
	onLogin(token){
		this.setState({
			isLogged:true,
			token:token
		});
	}

	onLogout(){
		let logoutFetch={
		method: "POST",
		headers:{"Content-Type":"application/json"},
		mode:"cors",
		body:JSON.stringify({"token":this.state.token})
		}
		
		fetch("/logout",logoutFetch).then((response)=>{
			if(response.ok){
				response.json().then((data)=>{
					console.log(data);
					this.setState({
						isLogged:false
					})
				});
			}
		});
	}

*/	
	
//	Gör så här:
//		<NavigationBar isLogged={this.state.isLogged} onLogout={this.onLogout}/>


  render() {
    return (
		<div>
		<NavigationBar isLogged={this.state.isLogged} onUpload={this.onUpload} onLogout={this.onLogout} onLogin={this.onLogin}/>
		<UserProfile isLogged={this.state.isLogged}/>
		<ImageGallery numberOfImages={this.state.numberOfImages}/>
		</div>
    );
  }
}

export default App;
