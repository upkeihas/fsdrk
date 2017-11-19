import React from 'react';

class NavigationBar extends React.Component {

        render(){
			let tempRender;
			
			if (this.props.isLogged == "true"){
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
							<li><a href="#"><span className="glyphicon glyphicon-cloud-upload" onClick="alert('Upload');"></span>Upload</a></li>
							<li><a href="#"><span className="glyphicon glyphicon-menu-hamburger"></span> Menu</a></li>
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
							<li><a href="#"><span className="glyphicon glyphicon-cloud-upload" onClick="alert('Upload');"></span>Upload</a></li>
							<li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
							<li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
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