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

	// Uploading stuff
	onUpload(uploadInput){
		console.log("App.js: got upload");
		console.log(uploadInput);

//		cloudinary.v2.uploader.upload(JSON.stringify(uploadInput),
//			function(error, result){console.log(result)});
			
		let formData = new FormData();
		formData.append('file', uploadInput);
		
		let uploadFetch={
			method: "POST",
//			headers:{"Content-Type":"multipart/form-data"},
			headers:{"Content-Type":"application/json"},
			mode:"cors",
//			body:formData
			body:JSON.stringify(
			{"imageId":"abcdefasfasf1234",
			 "imageUrl":"http://url.com",
			 "description":"very good photo",
			 "timestamp":"",
			 "userId":"5a2d24a23481f3168025bd35",
			 "likes":"",
			 "tags":"",
			 "comments":[{}]}
			)
		}
		
		fetch("/api/image",uploadFetch).then((response)=>{
			console.log("Fetch response:");
			console.log(response);
			if(response.ok){
				response.json().then((data)=>{
					console.log("App.js: Image Uploaded!");
				});
			}else{
				console.log("App.js: Something went wrong.");
			}
		});	
			
			
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
