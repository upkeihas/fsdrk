import React from 'react';
import LoginDialog from './LoginDialog';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state={
			isLogged:this.props.isLogged,
			onProfile:this.props.onProfile
		}
		
	}

	render () {
		let tempRender;
		
			if (this.props.onProfile){
				console.log("onProfile = true, good!");
				tempRender =

					<div>
						<p> Tähän sivupalkin piirto </p>
						<p> Tähän sivupalkin piirto </p>
						<p> Tähän sivupalkin piirto </p>
						<p> Tähän sivupalkin piirto </p>
						<p> Tähän sivupalkin piirto </p>
						<p> Tähän sivupalkin piirto </p>
						<p> Tähän sivupalkin piirto </p>
					</div>

			}else{
				console.log("Profile button hasn't been pressed - this isnt supposed to show");
				tempRender =
				
				<div>
				<p> Profile -nappia ei oo painettu.
					Vois mahollisesti tehä tästä "jos ei oma profiili, niin näytä eri menu	"
				</p>
				</div>
			}
			return tempRender;
			
	}
}

export default Profile;