import React, { Component } from 'react';
import GalleryElement from './GalleryElement';
import ModalViewer from './ModalViewer';

class ImageGallery extends Component {
	
	constructor(props){
		super(props);
		this.openViewer = this.openViewer.bind(this);
		this.closeViewer = this.closeViewer.bind(this);
	}
	
	// Image Gallery owns modal viewer, and this is the way it should be
	openViewer() {
		document.getElementById('modalviewer').style.display = "block";
	}

	closeViewer(){
		document.getElementById('modalviewer').style.display = "none";
	}

	render() {

		//TODO: fetch image url list from db
		let imageselection = this.props.typeOfImages;
		let numberofimages = this.props.numberOfImages;
		let elementList=[];
		
		
		if (imageselection == "Main") {
			for (var i=0; i<numberofimages; i++){
				elementList.push(<GalleryElement url="images/365kertaa365.png" openViewer={this.openViewer} isLogged={this.props.isLogged}/>);
		}
		}else{
			for (var i=0; i<numberofimages; i++){
				elementList.push(<GalleryElement url="images/365x365.png" openViewer={this.openViewer} isLogged={this.props.isLogged}/>);
			}
		}
		
		return (

		<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center"> 
			<div className="gallerycontainer">
				{elementList}
			</div>
			<ModalViewer closeViewer={this.closeViewer}/>
		</div>
    );
  }
}

export default ImageGallery;
