import React, { Component } from 'react';
import GalleryElement from './GalleryElement';

class ImageGallery extends Component {



	render() {

		//TODO: fetch image url list from db
		
		let elementList=[];
		for (var i=0; i<16; i++){
			elementList.push(<GalleryElement url="images/365x365.png"/>);
		}
		
		return (

		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center"> 
			<div class="gallerycontainer">
				{elementList}
			</div>
		</div>
    );
  }
}

export default ImageGallery;
