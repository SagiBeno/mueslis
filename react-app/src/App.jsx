import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default class App extends React.Component {
  state = {
    muesliData: {
      result: []
    }
  }

  render() {
    return (
      <div className='page-container'>
        <nav id="navbar" title="Toggle menu width">
          <div className="menu-item" tabIndex="0" data-content="products">
            <span className="menu-icon">📦</span>
            <span className="menu-text">Products</span>
          </div>
          <div className="menu-item" tabIndex="0" data-content="prices">
            <span className="menu-icon">💰</span>
            <span className="menu-text">Prices</span>
          </div>
          <div className="menu-item" tabIndex="0" data-content="about">
            <span className="menu-icon">ℹ️</span>
            <span className="menu-text">About</span>
          </div>
        </nav>

        <main id="content-area">
          {/*Default content is Products/Prices table*/}
          <h1>My mueslis</h1>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {/*<tr><td>1</td><td>Classic Muesli</td><td>$4.65</td></tr>*/}
              {/*JSON.stringify(this.state.muesliData)*/}
              { this.state.muesliData.result.map(muesli => 
                <tr key={muesli.id}>
                  <td>{muesli.id}</td>{/* Ha nem stringként akarjuk akkor: +muesli.id */}
                  <td>{muesli.name}</td>
                  <td>{muesli.price}</td>
                </tr>)}
            </tbody>
          </table>
        </main>
      </div>
    )
  }

  async componentDidMount() {
    try {
      let muesliData = await fetch('http://localhost:3333/mueslis')
      console.log('muesliData ', muesliData)
      muesliData = await muesliData.json()
      console.log('muesliData ', muesliData)

      this.setState({muesliData})
    } catch (e) {
      console.warn(e)
    }

  }
}