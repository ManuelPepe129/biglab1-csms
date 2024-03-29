import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import { MyNavbar } from './NavbarComponents';
import { MainComponent } from './FilmsComponents';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { FilmFormWrapper } from './FilmForm';

const filmList = [
  { id: 1, title: "Pulp Fiction", isFavourite: true, date: '2022-03-10', rating: 5 },
  { id: 2, title: "21 Grams", isFavourite: true, date: '2022-04-17', rating: 5 },
  { id: 3, title: "Star Wars", isFavourite: false, date: '', rating: 0 },
  { id: 4, title: "Matrix", isFavourite: false, date: '', rating: 0 },
  { id: 5, title: "Shrek", isFavourite: false, date: '2021-11-21', rating: 3 }
]

function App() {
  const [films, setFilms] = useState(filmList);
  
  function updateFilm(film) {
    setFilms(films => films.map(
      f => (f.id === film.id) ? Object.assign({}, film) : f
    ));
  }

  function deleteFilm(id) {
    setFilms(films.filter(f => f.id !== id));
  }
  function addFilm(newFilm) {
    setFilms(oldFilms => [...oldFilms, newFilm]);
  }
  return (
    <>
      <MyNavbar></MyNavbar>
      <Container fluid className="mh-100">
        <Router>
          <Routes>
            <Route path='/' element={<MainComponent films={films} deleteFilm={deleteFilm} updateFilm={updateFilm} />}></Route>
            <Route path='/add' element={<FilmFormWrapper addFilm={addFilm} films={films} />}></Route>
            <Route path='/edit/:filmId' element={<FilmFormWrapper addFilm={updateFilm} films={films} />}></Route>
            <Route path='*' element={<h1>Page not found</h1>}> </Route>
            <Route path='/filter/:filter' element={<MainComponent films={films} deleteFilm={deleteFilm} updateFilm={updateFilm}/>}> </Route>
          </Routes>
        </Router>
      </Container>

    </>
  );
}

export default App;
