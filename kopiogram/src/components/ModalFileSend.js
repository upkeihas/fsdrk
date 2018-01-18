import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';


class ModalFileSend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: ''};
    this.props = {show: true};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(file) {
    console.log("handleChange");
    this.state.file = file;
    console.log(file);
  }

  handleSubmit(event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('name', 'file');
    fetch('http://localhost:3000/upload', {
      method:'POST',
      body: formData
    })
    .then((response)=>{
        if(response.ok){
            response.json().then((data)=>{
                console.log("Upload response:");
                console.log(data);
                this.setState({
                    chosenPage:"Main"
                })
                alert("Success!");
            });
        }else{
            console.log("Upload: Something went wrong. "+response);
            alert("Upload: Something went wrong.");
        };
    })
}

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      console.log("show is null!");
      return null;
    }
    console.log("props:");
    console.log(this.props);

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#FFF',
      borderRadius: 5,
      minWidth: 300,
      minHeight: 220,
      margin: '0 auto',
      padding: 30
    };

    return (
      <div className="backdrop" style={backdropStyle}  >
        <div className="modal" style={modalStyle}>
          <form onSubmit={this.handleSubmit}>
            <h3>Upload Image</h3>
            <br/>
            <p>Select an image to upload:</p>
            <input type="file" onChange={ (e) => this.handleChange(e.target.files[0]) } />
            <div className="buttonsGroup">
              <input type="button" className="closeButton" value="Close" onClick={this.props.onClose}/>
              <input type="submit" className="sendButton" value="Send" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ModalFileSend.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default ModalFileSend;