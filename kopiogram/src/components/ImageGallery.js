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
	openViewer(imageId) {
		console.log("Image id to show in viewer: "+imageId); 
		document.getElementById('modalviewer').style.display = "block";
	}

	closeViewer(){
		document.getElementById('modalviewer').style.display = "none";
	}

	render() {

		//TODO: fetch image url list from api
		let imageselection = this.props.typeOfImages;
		let numberofimages = this.props.numberOfImages;
		let imageList = {"images":[{"id":"123","imageUrl":"http://lataamo.eu/kuvat/365x365.png"},
						{"id":"234","imageUrl":"http://lataamo.eu/kuvat/365x365.png"},
						{"id":"234","imageUrl":"http://lataamo.eu/kuvat/365x365.png"},
						{"id":"345","imageUrl":"http://lataamo.eu/kuvat/365x365.png"},
						{"id":"456","imageUrl":"http://lataamo.eu/kuvat/365x365.png"},
						{"id":"567","imageUrl":"http://lataamo.eu/kuvat/365x365.png"},
						{"id":"678","imageUrl":"http://lataamo.eu/kuvat/365x365.png"},
						{"id":"789","imageUrl":"http://lataamo.eu/kuvat/365x365.png"},
						{"id":"890","imageUrl":"http://lataamo.eu/kuvat/365x365.png"},
						{"id":"901","imageUrl":"http://lataamo.eu/kuvat/365x365.png"},
						{"id":"012","imageUrl":"http://lataamo.eu/kuvat/365x365.png"},
						{"id":"210","imageUrl":"http://lataamo.eu/kuvat/365x365.png"}]};
		let elementList=[];
		
		
		if (imageselection == "Main") {
			for (var key in imageList.images){
				elementList.push(<GalleryElement imageUrl={imageList.images[key].imageUrl} openViewer={this.openViewer} isLogged={this.props.isLogged} imageId={imageList.images[key].id} key={key}/>);
			}
		}else{
			for (let i=0; i<numberofimages; i++){
				elementList.push(<GalleryElement imageUrl="images/365kertaa365.png" openViewer={this.openViewer} isLogged={this.props.isLogged} imageId={i} key={i}/>);
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
