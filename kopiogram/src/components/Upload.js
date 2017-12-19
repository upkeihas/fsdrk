import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
//import cloudinary from 'cloudinary';
/*
var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/fsdrk/upload';
var CLOUDINARY_UPLOAD_PRESET = 'fp1kc60l';
/*
var imgPreview = document.getElementById('img-preview');
var fileUpload = document.getElementById('file-upload');
*/

class Upload extends Component {
    
    constructor(props) {
        super(props);
		this.state={
			uploadInput:""
		}
    
    this.onUpload = this.onUpload.bind(this);
	this.onChange = this.onChange.bind(this);

    }
    
    onUpload(){
		this.props.onUpload(this.state.uploadInput);
		this.setState=({
			uploadInput:""
		});
    }

	onChange(event){
			this.setState({
				uploadInput:event.target.files[0]
			});
	}

	render() {

	   return ( 
		<div>
			Description: <br></br>
			Tags:    <br></br><br></br>
			<form id="file-form" method="post" encType="multipart/form-data">
				<input id="uploadinput" type="file" name="file" multiple="multiple" onChange={this.onChange}></input><br></br><br></br>
			</form>
			<button className="btn btn-lg upload-btn" type="button" onClick={this.onUpload}>Upload File</button>
		</div>
	   )

	}
}

export default Upload;
