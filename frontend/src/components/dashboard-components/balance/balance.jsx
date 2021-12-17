import React from "react";
import {
    Card,
    CardBody,
    CardTitle,
} from 'reactstrap';

const Balance = ({ balance }) => {
    return (
        <Card>
            <CardBody>
                <CardTitle>Balance - Ultra fix prendido fuego</CardTitle>
                <div className="feed-widget">
                    <h1>$ { balance }</h1>
                </div>
            </CardBody>
        </Card>
    );
}

export default Balance;
