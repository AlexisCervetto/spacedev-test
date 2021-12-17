import React, { useState, useEffect, Fragment } from "react";
import { Link } from 'react-router-dom'
import {
    Card,
    CardBody,
    CardTitle,
    Table,
    Button,
    Alert
} from 'reactstrap';
import axios from 'axios';

const MovementsTable = ({ movements, showActions, title }) => {
    
    const [message, setMessage] = useState();
    const [stateMovements, setMovements] = useState([]);
    const [filteredMovements, setFilteredMovements] = useState([]);
    
    const handleTypeClick = (type) => {
        const filteredMovements = stateMovements.filter((item) => item.type === type);
        setFilteredMovements(filteredMovements);
    }

    const handleDelete = (id) => {
        axios.post(`http://localhost:3001/api/movements/delete`, {id})
        .then(response => {

            setMessage(response.data.message);
            // Acá podemos tomar dos caminos, o bien persistir los movimientos actuales contra la DB , o modificar lo que hay en el estado. 
            // Queda a gusto del consumidor jaja.. 
            const currentMovements = stateMovements.filter((item) => item.id !== id);
            setMovements(currentMovements);

        });
    }

    useEffect(() => {
        setMovements(movements);
    }, [movements]);

    const loopMovements = filteredMovements.length > 0  ? filteredMovements : stateMovements;
    return (
        <Card>
            <CardBody>
                <div className="d-flex align-items-center">
                    <div>
                        <CardTitle>{ title }</CardTitle>
                    </div>
                </div>
                {message && 
                    <Alert color="primary">
                        { message }
                    </Alert>
                }

                {showActions &&
                    <Fragment>
                        <Button className="btn mr-1" size="sm" color="primary" onClick={() => handleTypeClick("debit")}>Debit Movements</Button>
                        <Button className="btn" size="sm" color="secondary" onClick={() => handleTypeClick("credit")}>Credit Movements</Button>
                    </Fragment>
                }
                <Table className="no-wrap v-middle" responsive>
                    <thead>
                        <tr className="border-0">
                            <th className="border-0">Concept</th>
                            <th className="border-0">Amount</th>
                            <th className="border-0">Type</th>
                            {showActions && (<th className="border-0">Actions</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {loopMovements !== 0 && loopMovements.map((movement, index) => (
                            <tr key={index}>
                                <td>{movement.concept}</td>
                                <td>{movement.amount}</td>
                                <td>{movement.type}</td>
                                {showActions && (
                                    <td>
                                        <Link to={`/editmovement/${movement.id}`}>
                                            <Button className="btn mr-2" size="sm" color="primary" >Modificar</Button>
                                        </Link>
                                        <Button className="btn" size="sm" color="danger" onClick={() => handleDelete(movement.id)}>Eliminar</Button> 
                                    </td>)}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card >
    );
}

export default MovementsTable;
