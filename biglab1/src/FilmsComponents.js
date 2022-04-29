import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import React from 'react';
import { Sidebar } from './SidebarComponents';
import './FilmsComponents.css';

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
        <Films films={props.films} filter={filter} />
      </Col>
    </Row>
  );

}


function Films(props) {
  const [films, setFilms] = useState(props.films);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [watch, setWhatch] = useState(undefined);
  const [favorite, setFavorite] = useState(false);
  const [rate, setRate] = useState(0);

  const handleClose = () => setShowForm(false);
  const handleShow = () => setShowForm(true);

  function addFilm(event) {
    event.preventDefault();
    if (title === '') {

    } else {
      const id = films.at(-1).id + 1;
      const newFilm = { id: id, title: title, isFavourite: favorite, date: watch, rating: rate }
      setFilms(oldFilms => [...films, newFilm]);
    }
    handleClose();
  }

  return (
    <>
      <h1 class="mb-2" id="filter-title">{props.filter}</h1>
      <ul class="list-group list-group-flush" id="list-films">
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
          }).map((f) => <FilmData film={f} key={f.id} />)
        }
      </ul>

      <button type="button" class=" btn-lg btn-primary fixedButton rounded-circle" onClick={handleShow}>+</button>
      <Modal show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Film</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={title}
                onChange={ev => setTitle(ev.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Whatch Date</Form.Label>
              <Form.Control
                type="date"
                value={watch}
                onChange={ev => setWhatch(ev.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <span class="custom-control custom-checkbox col-3">
                <input type="checkbox" id="check" class="custom-control-input" />
                <label class="custom-control-label" for="check"> Favorite</label>
              </span>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rate</Form.Label>
              <ReactStars
                value={rate}
                count={5}
                edit={true}
                half={false}
                size={24}
                color2={'#ffd700'}
                onChange={ev => setRate(ev.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addFilm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function FilmData(props) {

  const ratingChanged = (newRating) => {
    props.film.rating = newRating;
  }

  const favoriteChanged = (oldValue) => {
    props.film.isFavourite = !oldValue;
  }

  return (
    <>
      <li class="list-group-item">
        <div class="d-flex w-100 justify-content-between">
          <p class="favorite text-start col-5">{props.film.title}</p>
          <span class="custom-control custom-checkbox col-3">
            <input type="checkbox" id="check" class="custom-control-input" onChange={() => favoriteChanged(props.film.isFavourite)} checked={props.film.isFavourite} />
            <label class="custom-control-label" for="check"> Favorite</label>
          </span>
          <p class="col-2">{(props.film.date !== undefined) ? props.film.date.format('YYYY-MM-DD') : ""}</p>
          <div class="col-3">
            <ReactStars
              value={props.film.rating}
              count={5}
              edit={true}
              half={false}
              onChange={ratingChanged}
              size={24}
              color2={'#ffd700'} />
          </div>
        </div>
      </li>

    </>
  );
}




export { MainComponent };