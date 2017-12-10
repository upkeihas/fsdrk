import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import ImageGallery from './ImageGallery';
import Profile from './Profile';

class Main extends React.Component {
		
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
			</div>
		}
						
		return tempRender;
		
	}
}

export default Main;    