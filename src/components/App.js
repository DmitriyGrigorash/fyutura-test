import React from 'react';
import PropTypes from 'prop-types';
import NavbarHeader from './NavbarHeader';

const App = ({ children }) =>
    <div>
      <NavbarHeader/>
      <div className="body-container">
        { children }
      </div>
    </div>;

App.propTypes = {
    children: PropTypes.object
};

export default App;
