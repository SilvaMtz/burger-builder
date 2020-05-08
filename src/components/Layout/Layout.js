import React from 'react';
import Aux from '../../hoc/Aux';
import './Layout.scss'

const layout = (props) => (
  <Aux>
    <div>
      Toolbar, Sidedrawem, backdrop
    </div>
    <main className="container">
      {props.children}
    </main>
  </Aux>
);

export default layout;