import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import ImageGallery from './ImageGallery';
import Profile from './Profile';

class Main extends React.Component {
		
	render() {
		let tempThis;
		if (this.props.inProfile && this.props.isLogged) {
            tempThis =
				<div>
				<ImageGallery numberOfImages={this.props.numberOfImages}/>
				<Profile inProfile={this.props.inProfile}/>
				</div>
		} else {

		tempThis = 
            <div>
				<ImageGallery numberOfImages={this.props.numberOfImages}/>
			</div>
		}
						
		return tempThis;
		
	}
}

export default Main;    