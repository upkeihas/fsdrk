import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import ImageGallery from './components/ImageGallery';

class App extends Component {
  render() {
    return (
		<div>
		<NavigationBar></NavigationBar>
		<ImageGallery></ImageGallery>
		</div>
    );
  }
}

export default App;
