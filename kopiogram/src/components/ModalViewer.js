import React, {Component} from 'react';
import '../modalviewer.css';
class ModalViewer extends Component {
	constructor(props){
		super(props);		
		this.onPrevImage = this.onPrevImage.bind(this);
		this.onNextImage = this.onNextImage.bind(this);
		this.closeViewer = this.closeViewer.bind(this);
	}
// Modal Viewer 1.0
// Tässä luokassa on sitten hitosti toimintoja. Vielä pitää päättää miten tämä käynnistetään, annetaanko avaamisen yhteydessä esim id jolla kuva noudetaan tietokannasta yms
// Alla muuttujia ja funktioita jotka luokka ainakin toteuttaa:

// TODO:
// this.props.imageId;		näytettävä kuva, sen kommentit ja tagit tulee tän perusteella
// this.props.show();		avaa katselimen
// this.props.onReport();	ilmianto
// this.props.onComment();	kommentointi
// this.props.onFlame();	äänestäminen
// Viewerin staattisen mockup-koodin korvaaminen dynaamisella

	closeViewer() {
		this.props.closeViewer(); // Pyydetään image gallerya sulkemaan Viewer-ikkuna
	}
	onPrevImage(){
		console.log("prevImage()");
		alert("Edellinen kuva");
	}

	onNextImage() {
		console.log("nextImage()");
		alert("Seuraava kuva");
	}

	render() {
		return(
			<div className="w3-container">
				<div id="modalviewer" className="w3-modal">
					<div className="w3-modal-content w3-card-4">
						<header className="w3-container w3-black"> 
							<span onClick={this.closeViewer} className="w3-button w3-display-topright">&times;</span>
							<h3>imageId: {this.props.reference}</h3>
						</header>
						<div className="w3-container">
							<div className="imagecontainer">
								<span><i className="glyphicon glyphicon-triangle-left bigtext" onClick={this.onPrevImage} title="Edellinen"></i></span>
								<a href={this.props.imageurl}><img src="images/600x400.png" title="image"></img></a>
								<span><i className="glyphicon glyphicon-triangle-right bigtext" onClick={this.onNextImage} title="Seuraava"></i></span>
							</div>
							<div className="row">
								<span><i className="glyphicon glyphicon-fire bigtext" onClick="increment()" title="Liekitä!"></i></span>
							</div>
							<span id="result" className="flamers"></span>
							<div className="infocontainer row">
								<div className="col-sm-2">
									<i className="glyphicon glyphicon-user biggertext" onClick="alert('Lisääjän profiilisivu')"></i>
								</div>
								<div className="col-sm-8">
									<span className="imageinfo commentmessage">Lorem ipsum hieno kuva kekeke otitko itse? Single-origin coffee succulents shabby chic irony poke.</span>
								</div>
								<div className="col-sm-2">
									<button className="btn btn-default glyphicon glyphicon-menu-hamburger" onClick="alert('Kuvamenu')"></button>
								</div>
							</div>
							<span className="tags">#tagi #toinentagi #kolmastagi #fsdrk #reactonkivaa</span>

							<div className="commentsection">
								<div className="well well-sm">
									<div className="row commentrow">
										<div className="col-sm-2">
											<div className="well well-sm"><i className="glyphicon glyphicon-user biggertext" onClick="alert('Profiilisivu');"></i></div>
										</div>
										<div className="col-sm-8">
											<div className="commentmessage">Single-origin coffee succulents shabby chic irony poke. Bicycle rights gluten-free brunch, cred slow-carb air plant microdosing cardigan organic photo booth jean shorts. Edison bulb gastropub literally, irony pop-up echo park mustache fam blue bottle whatever. Gentrify vape franzen, waistcoat hammock selvage ethical sustainable green juice four loko succulents shoreditch. Stumptown neutra hexagon chicharrones, knausgaard adaptogen austin pok pok poke kickstarter jianbing venmo pug synth. Actually pug craft beer offal.</div>
										</div>
										<div className="col-sm-2">	
											<button className="btn btn-default commentmenu glyphicon glyphicon-option-horizontal bigtext" onClick="alert('Kommenttimenu');"></button>
										</div>
									</div>
								</div>

								<div className="well well-sm">
									<div className="row commentrow">
										<form>
											<div className="form-group">
												<label for="comment" className="col-sm-2 col-form-label"><i className="glyphicon glyphicon-user biggertext" onClick="alert('Profiilisivu');"></i></label>			
												<div className="col-sm-8">
													<input type="text" className="form-control" id="comment" placeholder="Write a comment"></input>								
												</div>
												<div className="col-sm-2">	
													<button onClick="alert('Comment submitted')" className="btn btn-primary"><i className="glyphicon glyphicon-comment" title="Comment!"></i></button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default ModalViewer;