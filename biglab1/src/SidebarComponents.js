import Nav from 'react-bootstrap/Nav'
import { useNavigate } from 'react-router-dom';
function Sidebar(props) {
    const navigate = useNavigate();

    return (

        <Nav defaultActiveKey="1" className="flex-column">
            <Nav.Link className="list-group-item list-group-item-action" eventKey="1" onClick={() => {props.setFilter('All'); navigate('/filter/All') }}>All</Nav.Link>
            <Nav.Link className="list-group-item list-group-item-action" eventKey="2" onClick={() => {props.setFilter('Favorites'); navigate('/filter/Favorites') }}>Favorites</Nav.Link>
            <Nav.Link className="list-group-item list-group-item-action" eventKey="3" onClick={() => {props.setFilter('Best Rated'); navigate('/filter/Best Rated') }}>Best Rated</Nav.Link>
            <Nav.Link className="list-group-item list-group-item-action" eventKey="4" onClick={() => {props.setFilter('Seen Last Month'); navigate('/filter/Seen Last Month') }}>Seen Last Month</Nav.Link>
            <Nav.Link className="list-group-item list-group-item-action" eventKey="5" onClick={() => {props.setFilter('Unseen');  navigate('/filter/Unseen') }}>Unseen</Nav.Link>
        </Nav>

    );
}

export { Sidebar };
