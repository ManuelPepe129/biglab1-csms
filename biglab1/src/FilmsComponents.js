import { useState } from 'react';
import { Row, Col, Form} from 'react-bootstrap';
import FormCheck  from 'react-bootstrap/FormCheck'
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
       
      <button type="button" class=" btn-lg btn-primary fixedButton rounded-circle">+</button>
     
    </>
  );
}

function FilmData(props) {

  const ratingChanged = (newRating) => {
    props.film.rating=newRating;
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
            <input type="checkbox" id="check" class="custom-control-input" onChange={()=>favoriteChanged(props.film.isFavourite)} checked={props.film.isFavourite}/>
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