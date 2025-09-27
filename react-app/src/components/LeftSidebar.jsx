import React from "react";
import '../App.css'

export default class LeftSidebar extends React.Component {
    state = {
        menuExpanded: false,
        //menuItemSelected: 'products' <-- Ezt nem látja a szülő
    }
    
    handleNavMouseEnter = e => this.setState({menuExpanded: true})
    handleNavMouseLeave = e => this.setState({menuExpanded: false})

    handleProductsMenuItemClick = e => this.props.onMenuItemSelected('products')
    handleAboutMenuItemClick = e => this.props.onMenuItemSelected('about')

    render() {
        return (
            <div>
                <nav id="navbar" title="Select a menu item" className={this.state.menuExpanded ? "expanded" : "" } 
                    onMouseEnter={this.handleNavMouseEnter}
                    onMouseLeave={this.handleNavMouseLeave}>
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
            </div>
        )
    }
}