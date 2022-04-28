import Nav from 'react-bootstrap/Nav'
function Sidebar(props) {
    return (
        
    <Nav defaultActiveKey="1" className="flex-column">
        <Nav.Link className="list-group-item list-group-item-action" eventKey="1" onClick={() => { props.filter('All') }}>All</Nav.Link>
        <Nav.Link className="list-group-item list-group-item-action" eventKey="2" onClick={() => { props.filter('Favorites') }}>Favorites</Nav.Link>
        <Nav.Link className="list-group-item list-group-item-action" eventKey="3" onClick={() => { props.filter('Best Rated') }}>Best Rated</Nav.Link>
        <Nav.Link className="list-group-item list-group-item-action" eventKey="4" onClick={() => { props.filter('Seen Last Month') }}>Seen Last Month</Nav.Link>
        <Nav.Link className="list-group-item list-group-item-action" eventKey="5" onClick={() => { props.filter('Unseen') }}>Unseen</Nav.Link>
    </Nav>
    
    );
}

export { Sidebar };
