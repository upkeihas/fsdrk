import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import ImageGallery from './ImageGallery';
import Profile from './Profile';
import RegistrationForm from './RegistrationForm';
import Upload from './Upload';

class Main extends React.Component {
	
	constructor(props){
		super(props);	
		this.onUpload = this.onUpload.bind(this);

	}

	onUpload(uploadInput){
		this.props.onUpload(uploadInput); // this prop function is the parent component's (App.js) function onUpload()
	}
	
	render() {
		let tempRender;

		if (this.props.chosenPage == "Profile" && this.props.isLogged) {
            tempRender =
				<div>
				<ImageGallery typeOfImages={this.props.typeOfImages} numberOfImages={this.props.numberOfImages} isLogged={this.props.isLogged}/>
				<Profile chosenPage={this.props.chosenPage} userName={this.props.userName}/>
				</div>
		} else {

		tempRender = 
            <div>
				<ImageGallery typeOfImages={this.props.typeOfImages} numberOfImages={this.props.numberOfImages} isLogged={this.props.isLogged}/>
				<Upload onUpload={this.onUpload}/>
			</div>
		}
						
		return tempRender;
		
	}
}

export default Main;
  