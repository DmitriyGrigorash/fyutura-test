import React from 'react';
import NavbarHeader from './NavbarHeader';
import routes from '../routes/routes';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <article>
                <NavbarHeader/>
                {routes}
            </article>
        );
    }
}

export default App;
