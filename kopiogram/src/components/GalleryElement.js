import React, {Component} from 'react';

class GalleryElement extends Component {
	
	constructor(props){
		super(props);
		this.openViewer = this.openViewer.bind(this);
	}
	
	openViewer() {
		this.props.openViewer();
	}

	// Tarkistetaan onko käyttäjä kirjautunut ettei etusivujen kuvien klikkaaminen avaa ImageVieweria (onClick={this.openViewer})
	// Jos käyttäjä ei ole kirjautunut, thumbnailin klikkaaminen vain avaa kuvan isommaksi
	render(){
		
		let tempRender;
		
		if(this.props.isLogged){
			tempRender = 
				<div className="galleryelement col-lg-3 col-md-4 col-sm-6 col-xs-12"><a onClick={this.openViewer}><img src={this.props.url} alt="galleryElement" title="galleryElement"></img></a></div>
		}else {
			tempRender = 
				<div className="galleryelement col-lg-3 col-md-4 col-sm-6 col-xs-12"><a href={this.props.url}><img src={this.props.url} alt="galleryElement" title="galleryElement"></img></a></div>
		}
		return(
			tempRender
		);
	}

}
export default GalleryElement;