import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import summerFestival from '../images/summerFestival.png';

async function redirectToBuy() {
    window.history.pushState({}, '', '/buy');
    window.dispatchEvent(new PopStateEvent('popstate'));
}

function CardsTickets(props: any) {
    return (
    <div className="App">
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={summerFestival} />
        <Card.Body>
            <Card.Title>{props.ticket}</Card.Title>
            <Card.Text>
            Price : {props.price}
            </Card.Text>
            <Button variant="primary" onClick={props.mint}>Buy ticket</Button>
        </Card.Body>
        </Card>
    </div>
    );
};

export default CardsTickets;
