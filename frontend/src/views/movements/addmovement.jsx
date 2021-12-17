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

const AddMovement = (props) => {

    const [data, setData] = useState({
        concept: '',
        amount: 0,
        type: 'debit',
    });
    const [message, setMessage] = useState();
    const [error, setError] = useState();

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const emptyChecker = () => {
        if (data.amount === 0 && data.concept === ""){
            setError("No se admiten campos vacíos");
            return false;
        }
        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(emptyChecker()){
            axios.post(`http://localhost:3001/api/movements/add`, data)
            .then(response => {
                setMessage(response.data.message);
            });
        }
    }

    return (
        <Card>
            <CardBody>
                <Row>
                    <Col sm={12}>
                        <h5 className='card-title'>Add Movement</h5>
                        {message && 
                            <Alert color="primary">
                                { message }
                            </Alert>
                        }

                        {error && 
                            <Alert color="danger">
                                { error }
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
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    onChange={handleInputChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Type</Label>
                                <Input type="select" name="type" onChange={handleInputChange}>
                                    <option value="debit">Debit</option>
                                    <option value="credit">Credit</option>
                                </Input>
                            </FormGroup>                            
                            <Button className="btn" color="primary">Save</Button>
                        
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default AddMovement;
