import React from 'react';
import NavbarHeader from './NavbarHeader';
import { Button } from 'react-bootstrap';
import routes from '../routes/routes';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <article>
                <NavbarHeader/>
                <Button variant="primary" size="lg" href="invoice">
                    New invoice
                </Button>
                {routes}
            </article>
        );
    }
}

export default App;
