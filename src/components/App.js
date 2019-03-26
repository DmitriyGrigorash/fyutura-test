import React from 'react';
import NavbarHeader from './NavbarHeader';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import routes from '../routes/routes';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: false };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }
    render() {
        return (
            <article>
                <NavbarHeader/>
                <Button variant="primary" size="lg" onClick={this.handleShow}>New Invoice</Button>
                {routes}

                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </article>
        );
    }
}

export default App;
