import React from 'react';
import '../sidebar.css';

class UserProfile extends React.Component {

		render(){
			return(
				<div id="mySidenav" className="sidenav">
					<div className="well well-sm text-center">
						<h2>{this.props.userName}</h2>
					</div>
					<a href="/">Vaihda kuva</a>
					<a href="/">Muokkaa tietoja</a>
					<a href="/">Nappula</a>
					<a href="/">Seuratut käyttäjät</a>
					<a href="/">Joku muu</a>
				</div>
			)
		}
}

export default UserProfile;