import React, { Component } from 'react';
import GalleryElement from './GalleryElement';

class ImageGallery extends Component {



	render() {

		//TODO: fetch image url list from db
		let imageselection = this.props.typeOfImages;
		let numberofimages = this.props.numberOfImages;
		let elementList=[];
		elementList.pop(GalleryElement);
		elementList.pop(GalleryElement);
		elementList.pop(GalleryElement);
		elementList.pop(GalleryElement);
		if (imageselection == "Main") {
		for (var i=0; i<numberofimages; i++){
			elementList.push(<GalleryElement url="images/365kertaa365.png"/>);
		}
	} else {
		for (var i=0; i<numberofimages; i++){
			elementList.push(<GalleryElement url="images/365x365.png"/>);
		}
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
