import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Profile from './Profile';
import ImageGallery from './ImageGallery';
import UserProfile from './UserProfile';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			isLogged:this.props.isLogged,
			onProfile:this.props.onProfile,
		//	token:""
		}
	}

	
	
	render() {
		let tempThis;
		console.log(this.props.numberOfImages);
		if (this.props.isLogged) {
            tempThis =
				<div>
				<UserProfile isLogged={this.state.isLogged}/>
				<ImageGallery numberOfImages={this.props.numberOfImages}/>
				<Profile isLogged={this.state.isLogged} onProfile={this.state.onProfile}/>
				</div>
		} else {

		tempThis = 
            <div>
			<ImageGallery numberOfImages={16}/>
            <UserProfile isLogged={this.state.isLogged}/>
			</div>
			
			


		}
						
			
		
		
		return tempThis;
		
	}
}

export default Main;    