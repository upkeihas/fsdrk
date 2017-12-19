import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Main from './components/Main';
import cloudinary from 'cloudinary';

class App extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			numberOfImages:16,
			chosenPage:"Main",
			isLogged:false,
			typeOfImages:"Main",
//			token:"",
			userName:""
		};
		this.onRegister = this.onRegister.bind(this);
		this.onLogin = this.onLogin.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.onUpload = this.onUpload.bind(this);
		this.onChosenPage = this.onChosenPage.bind(this);
		
		cloudinary.config({
			cloud_name: 'fsdrk',
			api_key: '659274845159812',
			api_secret: '4tcWnRrxsrqzgPxKWRS78ACsMrM'
		});
	}

	onUpload(uploadInput){
		console.log(uploadInput);

		cloudinary.v2.uploader.upload('https://dncache-mauganscorp.netdna-ssl.com/thumbseg/1448/1448278-bigthumbnail.jpg',
			function(error, result){console.log(result)});

		// Tuo toimii, esimerkki kuva lentää cloudinaryyn... Mutta pitäs tosiaan saada tuo file heitettyä sillä fetchillä backendin kautta.
		// Tunnukset: huthut92@gmail.com	pw: Fsdrk123

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
						userName:userinfo.username,
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
						userName:"",
						chosenPage:"Main"
					})
				});
			}
		});
	}

	onChosenPage(chosenpage){
		//Tännekki switch rakenne..?
		console.log("App.js chosenPage()");
		if (chosenpage == "Main") {
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
			<NavigationBar isLogged={this.state.isLogged} onUpload={this.onUpload} onLogout={this.onLogout} onLogin={this.onLogin} onRegister={this.onRegister} onChosenPage={this.onChosenPage} chosenPage={this.state.chosenPage}/>
			<Main typeOfImages={this.state.typeOfImages} onUpload={this.onUpload} isLogged={this.state.isLogged} chosenPage={this.state.chosenPage} numberOfImages={this.state.numberOfImages} userName={this.state.userName}/>
		</div>
    );
  }
}

export default App;
