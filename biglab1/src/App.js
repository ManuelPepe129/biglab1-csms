import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row} from 'react-bootstrap';
import MyNavigationBar from './NavigationBar';
import MySideBar from './SideBar';
import MyFilmList from './FilmList.js';

function App() {
  return (
    <>
      <MyNavigationBar></MyNavigationBar>
      <br />
      <Container fluid className="mh-100">
        <Row>
          <MySideBar></MySideBar>
          <MyFilmList></MyFilmList>
        </Row>
      </Container>
      <br />
    </>
  );
}


export default App; 
