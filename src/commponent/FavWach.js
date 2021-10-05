import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import{Card, Button, Modal , Form } from 'react-bootstrap';



export class FavWach extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watchCRUDdataApi: [],
            watch: {},
            show: false
        };
    }


    componentDidMount = () => {
        axios.get(`${process.env.REACT_BAK_URL}/watch-user?email=${this.props.auth.user.email}`).then(res =>
            this.setState({
                watchCRUDdataApi: res.data
            })
        ).catch(err => console.log(err));
    }

    handleToggle = () => {
        this.setState({

            show: !this.state.show
        })

    }

    handelWatch = (watch) => {
        this.setState({
            watch: watch,
            show: !this.state.show
        })
    }

    handeldelete = (watch) => {
        axios.delete(`${process.env.REACT_BAK_URL}/delete-watch/${watch}`).then(res => {
            console.log("deleted *_*");
            this.setState({
                watchCRUDdataApi: res.data
            })

        }).catch(err => console.log(err));

    }

    handelSubmit = (e) => {
        e.preventDefault();
        let data ={
            tilte : e.target.tilte.value,
            description:  e.target.description.value,
            toUSD : e.target.toUSD.value,
        }

        axios.put(`${process.env.REACT_BAK_URL}/update-watch/${this.state.watch._id}`,data).then(res => {
            console.log("deleted *_*");
            this.setState({
                watchCRUDdataApi: res.data
            })

        }).catch(err => console.log(err));



    }


    render() {


        return (
            <div>
                {this.props.watchCRUDdataApi.map(watch => {
                    return <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={watch.image_url} />
                        <Card.Body>
                            <Card.Title>{watch.tilte}</Card.Title>
                            <Card.Text>
                                {watch.description} /
                                {watch.toUSD}
                            </Card.Text>
                            <Button variant="primary" onClick={(e) => this.props.handelWatch(watch)}>update</Button>
                            <Button variant="primary" onClick={(e) => this.props.handeldelete(watch._id)}>delete</Button>

                        </Card.Body>
                    </Card>
                })

                }

                {this.state.show &&
                    <Modal show={this.state.show} onHide={this.handleToggle}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.handelSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>title</Form.Label>
                                    <Form.Control type="text" placeholder={this.state.watch.title} name='title' />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>description</Form.Label>
                                    <Form.Control type="text" placeholder={this.state.watch.description} name='description' />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>toUSD</Form.Label>
                                    <Form.Control type="number" placeholder={this.state.watch.description} name='toUSD' />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    save
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleToggle}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>

                }





            </div>
        )
    }
}

export default withAuth0(FavWach);
