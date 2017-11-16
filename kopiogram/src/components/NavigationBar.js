import React from 'react';

class NavigationBar extends React.Component {

        render(){
			return (
				<nav class="navbar navbar-inverse navbar-fixed-top">
					<div class="container-fluid">
						<div class="navbar-header">
							<a class="navbar-brand" href="/">KopioGram Logo</a>
						</div>
										

						<form class="nav navbar-form navbar-left">

							<div class="input-group">
								<input type="text" class="form-control" placeholder="Search"/>
								<div class="input-group-btn">
									<button class="btn btn-default" type="submit">
										<i class="glyphicon glyphicon-search"></i>
									</button>
								</div>
							</div>
						</form>

						<ul class="nav navbar-nav navbar-right">
							<li><a href="#"><span class="glyphicon glyphicon-cloud-upload" onclick="alert('Upload');"></span>Upload</a></li>
							<li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
							<li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
							<li><a href="#"><span class="glyphicon glyphicon-menu-hamburger"></span> Menu</a></li>
						</ul>
					</div>
				</nav>
                )
        }
}

export default NavigationBar;