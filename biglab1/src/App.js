import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import dayjs from 'dayjs';
import React from 'react';
import { Container } from 'react-bootstrap';
import { MyNavbar } from './NavbarComponents';
import { MainComponent } from './FilmsComponents';

const filmList = [
  {id: 1, title: "Pulp Fiction", isFavourite: true, date: dayjs('2022-03-10'), rating: 5},
  {id: 2, title: "21 Grams", isFavourite: true, date: dayjs('2022-04-17'), rating: 5},
  {id: 3, title: "Star Wars", isFavourite: false, date: undefined, rating: undefined},
  {id: 4, title: "Matrix", isFavourite: false, date: undefined, rating: undefined},
  {id: 5, title: "Shrek", isFavourite: false, date: dayjs('2021-11-21'), rating: 3}
]

function App() {
  return (
    <>
    <MyNavbar></MyNavbar>
    <br/>
    <Container fluid className="mh-100">
      <MainComponent films={filmList}/>
    </Container>
    </>
  );
}

export default App;
