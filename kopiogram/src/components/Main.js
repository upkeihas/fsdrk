import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import ImageGallery from './ImageGallery';
import Profile from './Profile';

class Main extends React.Component {
		
	render() {
		let tempThis;
		if (this.props.chosenPage == "Profile" && this.props.isLogged) {
            tempThis =
				<div>
				<ImageGallery typeOfImages={this.props.typeOfImages} numberOfImages={this.props.numberOfImages}/>
				<Profile chosenPage={this.props.chosenPage}/>
				</div>
		} else {

		tempThis = 
            <div>
				<ImageGallery typeOfImages={this.props.typeOfImages} numberOfImages={this.props.numberOfImages}/>
			</div>
		}
						
		return tempThis;
		
	}
}

export default Main;    