import React from 'react';
import UserProfile from './UserProfile';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state={
			inProfile:this.props.inProfile
		}
		
	}

	render () {
		let tempRender;
		
			if (this.props.inProfile){
				console.log("onProfile = true, good!");
				tempRender =

					<div>
						<UserProfile/>
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