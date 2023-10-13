import Card from 'react-bootstrap/Card';
import summerFestival from '../images/summerFestival.png';
import { Form, InputGroup, Button } from 'react-bootstrap';

function CardsSend(props: any) {
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
            <InputGroup className="mb-3" >
                <Form.Control
                placeholder="0x48fa..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                type='string'
                id='address_to'
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={props.send}>
                    Send Ticket
                </Button>
            </InputGroup>
        </Card.Body>
        </Card>
    </div>
    );
};

export default CardsSend;
