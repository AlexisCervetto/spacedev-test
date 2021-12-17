import React, { useEffect, useState } from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import { MovementsTable, Balance } from 'components/dashboard-components';
import axios from 'axios';

const Starter = () => {
    const [movements, setMovements] = useState(0);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3001/api/movements')
        .then(response => {
            setMovements(response.data.movements);
        });

        axios.get('http://localhost:3001/api/movements/balance')
        .then(response => {
            setBalance(response.data.balance);
        });
    }, []);

    return (
        <div>
            <Row>
                <Col sm={4}>
                    <Balance balance={ balance }/>
                </Col>
                <Col sm={8}>
                    <MovementsTable movements={ movements } title={ "Last Movements" }/>
                </Col>
            </Row>
        </div>
    );
}

export default Starter;
