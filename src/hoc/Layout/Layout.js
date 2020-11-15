import React, { Component } from 'react';
import Aux from '../Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import './Layout.scss'

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState( { showSideDrawer: false } );
  }

  sideDrawerToggleHandler = () => {
    this.setState( (prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    });
  }

  render () {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className="container">
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;