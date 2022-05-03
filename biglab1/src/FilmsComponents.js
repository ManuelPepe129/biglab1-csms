import { useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import React from 'react';
import { Sidebar } from './SidebarComponents';
import './FilmsComponents.css';
import { Trash } from 'react-bootstrap-icons';

import dayjs from 'dayjs';

import ReactStars from 'react-stars'

function MainComponent(props) {
  const [filter, setFilter] = useState("All");

  function changeFilter(fil) {
    setFilter(fil);
  }

  return (
    <Row>
      <Col xs={3}>
        <Sidebar filter={changeFilter} />
      </Col>
      <Col xs={8}>
        <FilmTable films={props.films} filter={filter} />
        <button type="button" className=" btn-lg btn-primary fixedButton rounded-circle" >+</button>
      </Col>
    </Row>
  );

}

function FilmTable(props) {
  const [films, setFilms] = useState(props.films);

  function updateFilm(film) {
    setFilms(films => films.map(
      f => (f.id === film.id) ? Object.assign({}, film) : f
    ));
  }

  function deleteFilm(id) {
    setFilms(films.filter(f => f.id !== id));
  }

  return (
    <Table>
      <tbody>
        {
          films.filter(f => {
            switch (props.filter) {
              case 'Favorites':
                return f.isFavourite;

              case 'Best Rated':
                return f.rating === 5;

              case 'Seen Last Month':
                if (f.date !== undefined)
                  return f.date.isAfter(dayjs().subtract(30, 'day'));
                else return false;
              case 'Unseen':
                return f.date === undefined;

              default:
                return true;
            }
          }).map((film) => <FilmRow film={film} key={film.id} deleteFilm={deleteFilm} updateFilm={updateFilm} />)
        }
      </tbody>
    </Table>
  )
}

function FilmRow(props) {
  return (
    <tr>
      <FilmData film={props.film} deleteFilm={props.deleteFilm} updateFilm={props.updateFilm} />
    </tr>
  )
}

function FilmData(props) {

  const ratingChanged = (newRating) => {
    const newFilm = { id: props.film.id, title: props.film.title, isFavourite: props.film.isFavourite, date: props.film.date, rating: newRating };
    props.updateFilm(newFilm);
  }

  const toggleFavourite = (event) => {
    const newFilm = { id: props.film.id, title: props.film.title, isFavourite: event.target.checked, date: props.film.date, rating: props.film.rating };
    props.updateFilm(newFilm);
  }

  return (
    <>
      <td className={`favorite text-start col-4 ${(props.film.isFavourite) ? "red" : false}`}>
        {props.film.title}
      </td>
      <td>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check inline type="checkbox" label="Favorite" defaultChecked={props.film.isFavourite}
            onChange={(event) => {
              toggleFavourite(event);
            }} />
        </Form.Group>
      </td>
      <td>
        {(props.film.date !== undefined) ? props.film.date.format('YYYY-MM-DD') : ""}
      </td>
      <td>
        <ReactStars
          value={props.film.rating}
          count={5}
          edit={true}
          half={false}
          onChange={ratingChanged}
          size={24}
          color2={'#ffd700'} />
      </td>
      <td>
        <Button variant='light' onClick={() => { props.deleteFilm(props.film.id) }} ><Trash></Trash></Button>
      </td>
    </>
  );
}

export { MainComponent };