import React, { Component } from 'react';
import GalleryElement from './GalleryElement';

class ImageGallery extends Component {



	render() {

		//TODO: fetch image url list from db
		
		let noe = this.props.numberOfElements;
		
		let elementList=[];
		for (var i=0; i<noe; i++){
			elementList.push(<GalleryElement url="images/365x365.png"/>);
		}
		
		return (

		<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center"> 
			<div className="gallerycontainer">
				{elementList}
			</div>
		</div>
    );
  }
}

export default ImageGallery;
