import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import UserProfile from './components/UserProfile';
import ImageGallery from './components/ImageGallery';

class App extends Component {

// LOGIN-JUTUT

/*	constructor(props){
		super(props);
		this.state = {
				isLogged:false,
				token:""
		}
		this.onLogin = this.onLogin.bind(this);
		this.onLogout = this.onLogout.bind(this);
	}


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
		<NavigationBar isLogged="true"/>
		<UserProfile isVisible="true"/>
		<ImageGallery numberOfElements="20"/>
		</div>
    );
  }
}

export default App;
