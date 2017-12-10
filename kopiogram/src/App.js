import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Main from './components/Main';

class App extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			numberOfImages:16,
			chosenPage:"Main",
			isLogged:false,
			typeOfImages:"asd",
//			token:"",
			username:"",
			password:""
		};
		this.onRegister = this.onRegister.bind(this);
		this.onLogin = this.onLogin.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.onUpload = this.onUpload.bind(this);
		this.onChosenPage = this.onChosenPage.bind(this);
		
		
	}

//	When upload button is pressed in NavigationBar.js this function is called
	onUpload(){
		console.log("Upload images logic goes here");
	}

// Calling more functions from navbar: register, in and out

	onRegister(userinfo) {
		
		let registerFetch={
		method: "POST",
		headers:{"Content-Type":"application/json"},
		mode:"cors",
		body:JSON.stringify({"username":userinfo.username,
							 "password":userinfo.password,
							 "email":"Dummy@mail.com"}) // TODO "email":userinfo.email, <- edit LoginForm
		}
		
		fetch("/register",registerFetch).then((response)=>{
			if(response.ok){
				response.json().then((data)=>{
					console.log("Registered username: " +userinfo.username);
					this.setState({
						isLogged:false,
						chosenPage:"Main"
					})
				});
			}
		});
	}
	
	onLogin(userinfo){
		
		let loginFetch={
		method: "POST",
		headers:{"Content-Type":"application/json"},
		mode:"cors",
		body:JSON.stringify({"username":userinfo.username,
							 "password":userinfo.password,
							 "email":"Dummy@mail.com"}) // TODO "email":userinfo.email, <- edit LoginForm
		}
		
		fetch("/login",loginFetch).then((response)=>{
			if(response.ok){
				response.json().then((data)=>{
					console.log("Logged in: " +userinfo.username);
					this.setState({
						isLogged:true,
						username:userinfo.username,
						chosenPage:"Main"
					})
				});
			}else{
				console.log("Login: Something went wrong.");
			}
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
					this.setState({
						isLogged:false,
						username:"",
						chosenPage:"Main"
					})
				});
			}
		});
	}

	onChosenPage(){
		//Tännekki switch rakenne..?
		console.log("App.js chosenPage()");
		if (this.state.chosenPage == "Main") {
			this.setState({
				chosenPage:"Profile",
				typeOfImages:"Profile"
			})
		}else{
			this.setState({
				chosenPage:"Main",
				typeOfImages:"Main"
			})
		}
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
			<NavigationBar isLogged={this.state.isLogged} onUpload={this.onUpload} onLogout={this.onLogout} onLogin={this.onLogin} onRegister={this.onRegister} onChosenPage={this.onChosenPage} chosenPage={this.chosenPage}/>
			<Main typeOfImages={this.state.typeOfImages} isLogged={this.state.isLogged} chosenPage={this.state.chosenPage} numberOfImages={this.state.numberOfImages}/>
		</div>
    );
  }
}

export default App;
