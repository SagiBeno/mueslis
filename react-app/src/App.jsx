import React from 'react'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import MueslisPage from './pages/MueslisPage'
import AboutPage from './pages/AboutPage'
import LeftSidebar from './components/LeftSidebar'

import './App.css'

export default class App extends React.Component {
  state = {
    menuItemSelected: 'products',
  }

  handleSelectMenuItem = menuItem => this.setState({menuItemSelected: menuItem})

  render() {
    return (
      <div className='page-container'>
        <LeftSidebar onMenuItemSelected={this.handleSelectMenuItem} />        

        {this.state.menuItemSelected == 'products' && <MueslisPage />}
        {this.state.menuItemSelected == 'about' && <AboutPage />}
      </div>
    )
  }
}