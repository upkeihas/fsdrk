import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import UserProfile from './components/UserProfile';
import ImageGallery from './components/ImageGallery';

class App extends Component {
  render() {
    return (
		<div>
		<NavigationBar></NavigationBar>
		<UserProfile></UserProfile>
		<ImageGallery></ImageGallery>
		</div>
    );
  }
}

export default App;
