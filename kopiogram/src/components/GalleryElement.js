import React, {Component} from 'react';

class GalleryElement extends Component {
	
	render(){
		return(
			<div class="galleryelement col-lg-3 col-md-4 col-sm-6 col-xs-12"><a href={this.props.url}><img src={this.props.url}></img></a></div>
		);
	}

}
export default GalleryElement;