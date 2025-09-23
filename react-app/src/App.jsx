import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MueslisPage from './pages/MueslisPage'
import './App.css'
import AboutPage from './pages/AboutPage'

export default class App extends React.Component {
  state = {
    menuItemSelected: 'products'
  }

  handleProductsMenuItemClick = e => this.setState({menuItemSelected: 'products'})
  handleAboutMenuItemClick = e => this.setState({menuItemSelected: 'about'})

  render() {
    return (
      <div className='page-container'>
        <nav id="navbar" title="Select a menu item" className='expanded' >
          <div className="menu-item" tabIndex="0" data-content="products" onClick={this.handleProductsMenuItemClick}>
            <span className="menu-icon">📦</span>
            <span className="menu-text">Products</span>
          </div>
          <div className="menu-item" tabIndex="0" data-content="prices">
            <span className="menu-icon">💰</span>
            <span className="menu-text">Prices</span>
          </div>
          <div className="menu-item" tabIndex="0" data-content="about" onClick={this.handleAboutMenuItemClick}>
            <span className="menu-icon">ℹ️</span>
            <span className="menu-text">About</span>
          </div>
        </nav>

        {this.state.menuItemSelected == 'products' && <MueslisPage />}
        {this.state.menuItemSelected == 'about' && <AboutPage />}
      </div>
    )
  }
}