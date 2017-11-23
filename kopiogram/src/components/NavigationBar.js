import React from 'react';
import LoginDialog from './LoginDialog';

class NavigationBar extends React.Component {
	constructor(props){
		super(props);
		this.state={
			isLogged:this.props.isLogged
		}
		this.onRegister = this.onRegister.bind(this);
		this.onUpload = this.onUpload.bind(this);
		this.onLogin = this.onLogin.bind(this);
		this.onLogout = this.onLogout.bind(this);
	}

	onRegister(userinfo){
		this.props.onRegister(userinfo);
	}
	
	onUpload(){
		console.log("Upload button pressed, calling parents onUpload()");
		this.props.onUpload(); // this prop function is the parent component's (App.js) function onUpload()
	}
	
	onLogin(userinfo){
		console.log("Login button pressed");
		this.setState({
			isLogged:true
		})
		this.props.onLogin(userinfo); // Calling parent's onLogin function again
	}
	
	onLogout() {
		console.log("Logout button pressed");
		this.setState({
			isLogged:false
		});
		this.props.onLogout();
	}

        render(){

			let tempRender;
			
			if (this.props.isLogged){
				tempRender =
					<nav className="navbar navbar-inverse navbar-fixed-top">
					<div className="container-fluid">
						<div className="navbar-header">
							<a className="navbar-brand" href="/">KopioGram Logo</a>
						</div>

						<form className="nav navbar-form navbar-left">
							<div className="input-group">
								<input type="text" className="form-control" placeholder="Search"/>
								<div className="input-group-btn">
									<button className="btn btn-default" type="submit">
										<i className="glyphicon glyphicon-search"></i>
									</button>
								</div>
							</div>
						</form>

						<ul className="nav navbar-nav navbar-right">
							<li><a href="#"><span className="glyphicon glyphicon-cloud-upload bigtext" onClick={this.onUpload}></span>Upload</a></li>
							<li><a href="#"><span className="glyphicon glyphicon-log-out bigtext" onClick={this.onLogout}></span> Logout</a></li>
							<li><a href="#"><span className="glyphicon glyphicon-menu-hamburger bigtext"></span></a></li>
						</ul>
					</div>
				</nav>

			}else{

				tempRender =
					<nav className="navbar navbar-inverse navbar-fixed-top">
					<div className="container-fluid">
						<div className="navbar-header">
							<a className="navbar-brand" href="/">KopioGram Logo</a>
						</div>

						<form className="nav navbar-form navbar-left">
							<div className="input-group">
								<input type="text" className="form-control" placeholder="Search"/>
								<div className="input-group-btn">
									<button className="btn btn-default" type="submit">
										<i className="glyphicon glyphicon-search"></i>
									</button>
								</div>
							</div>
						</form>

						<ul className="nav navbar-nav navbar-right">
							<li><a href="#"><span className="glyphicon glyphicon-cloud-upload bigtext" onClick={this.onUpload}></span>Upload</a></li>
							<li><a href="#"><span className="glyphicon glyphicon-user bigtext"></span> Sign Up</a></li>
							<li><LoginDialog onLogin={this.onLogin} onRegister={this.onRegister}/></li>
						</ul>
					</div>
				</nav>
			}

			return (
				<div>
					{tempRender}
				</div>
                )
        }
}

export default NavigationBar;