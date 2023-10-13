import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import summerFestival from '../images/summerFestival.png';
import { Link } from "react-router-dom";

function CardsEvents(props: any) {
    return (
    <div className="App">
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={summerFestival} />
        <Card.Body>
            <Card.Title>Summer Festival</Card.Title>
            <Card.Text>
            Location : Paris <br />
            Date : 15/08/2023 <br />
            Price starting 0.1 ETH
            </Card.Text>
            <Link to="/buy" relative="path">
                <Button variant="primary">Buy ticket</Button>
            </Link>
        </Card.Body>
        </Card>
    </div>
    );
};

export default CardsEvents;
