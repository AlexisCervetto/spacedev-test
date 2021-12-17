import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import {
    Row,
    Col,
    Button
} from 'reactstrap';
import { MovementsTable } from 'components/dashboard-components';
import axios from 'axios';

const Movements = () => {
    const [movements, setMovements] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3001/api/movements/all')
        .then(response => {
            setMovements(response.data.movements);
        });
    }, []);

    return (
        <div>
            <Row>
                <Col sm={12}>
                    <MovementsTable movements={movements} title={ "All Movements" } showActions/>
                    <Link to={`/addmovement`}>
                        <Button className="btn" color="primary" size="lg">
                            Add movement
                        </Button>
                    </Link>
                </Col>
            </Row>
        </div>
    );
}

export default Movements;
