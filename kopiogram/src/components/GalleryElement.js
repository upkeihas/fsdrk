import React, {Component} from 'react';

class GalleryElement extends Component {
	
	render(){
		return(
			<div className="galleryelement col-lg-3 col-md-4 col-sm-6 col-xs-12"><a href={this.props.url}><img src={this.props.url} alt="galleryElement" title="galleryElement"></img></a></div>
		);
	}

}
export default GalleryElement;