import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    CardBody,
    Card,
    Alert
} from 'reactstrap';
import axios from 'axios';

const EditMovement = (props) => {

    const [data, setData] = useState({
        concept: '',
        amount: 0,
        type: '',
        id: 0,
    });
    const [message, setMessage] = useState();

    useEffect(() => {
        const id = props.match.params.id;

        axios.get(`http://localhost:3001/api/movements/get/${id}`)
        .then(response => {
            setData({ ...response.data.movement });
        });
    }, []);

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`http://localhost:3001/api/movements/edit`, data)
        .then(response => {
            setMessage(response.data.message);
        });

        console.log('enviando datos...' + data.concept + ' ' + data.amount )
    }

    return (
        <Card>
            <CardBody>
                <Row>
                    <Col sm={12}>
                        <h5 className='card-title'>Edit Movement</h5>
                        {message && 
                            <Alert color="primary">
                                { message }
                            </Alert>
                        }
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="concept">Concept</Label>
                                <Input
                                    id="concept"
                                    name="concept"
                                    type="text"
                                    onChange={handleInputChange}
                                    value={data.concept}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    onChange={handleInputChange}
                                    value={data.amount}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Type</Label>
                                <p>{ data.type }</p>
                            </FormGroup>

                            <FormGroup>
                                <Label>Date</Label>
                                <p>{ data.createdAt }</p>
                            </FormGroup>
                            
                            <Button className="btn" color="primary">Save</Button>
                        
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default EditMovement;
