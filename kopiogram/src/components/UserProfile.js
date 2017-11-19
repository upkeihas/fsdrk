import React from 'react';
import '../sidebar.css';

class UserProfile extends React.Component {

		render(){
			let tempRender;
			if (this.props.isVisible == "true") {
				tempRender =
				<div id="mySidenav" className="sidenav">
						<a href="#">Vaihda kuva</a>
						<a href="#">Muokkaa tietoja</a>
						<a href="#">Nappula</a>
						<a href="#">Seuratut käyttäjät</a>
						<a href="#">Joku muu</a>
					</div>
			}else{
				tempRender =
					<div>plaa</div>
			}
			return (
				<div>
					{tempRender}
				</div>
			)
		}
}

export default UserProfile;