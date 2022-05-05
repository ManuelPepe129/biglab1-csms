import { useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import React from 'react';
import { Sidebar } from './SidebarComponents';
import './FilmsComponents.css';
import { Trash, Pencil } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';

import dayjs from 'dayjs';

import ReactStars from 'react-stars'

function MainComponent(props) {
  const [filter, setFilter] = useState('All');
  const { filterId } = useParams();
  const navigate = useNavigate();

  if(filter==='NotFound'){
    navigate(`/${filter}`) 
  }
  else{

  return (
    <Row>
      <Col xs={3}>
        <Sidebar setFilter={setFilter}/>
      </Col>
      <Col xs={8}>
        <FilmTable films={props.films} filterId={filterId} deleteFilm={props.deleteFilm} filter={filterId? filterId : filter} setFilter={setFilter} />

      </Col>
    </Row>
  );
  }

}

function FilmTable(props) {

  const navigate = useNavigate();

  function wrongURL(){
  
    props.setFilter('NotFound');
   
  }
  return (
    <>
      <h1 className='fs-1'>{props.filter ? props.filter : 'All'}</h1>
      <Table>

        <tbody>
          {
            props.films.filter(f => {
              switch (props.filter) {
                case 'All':
                  return true;

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
                  wrongURL();
              }
            }).map((film) => <FilmRow film={film} key={film.id} deleteFilm={props.deleteFilm} updateFilm={props.updateFilm} />)
          }
        </tbody>
      </Table>
      <button type="button" className=" btn-lg btn-primary fixedButton rounded-circle" onClick={() => navigate('/add')}>+</button>
    </>
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
  const navigate = useNavigate();

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
            }} disabled />
        </Form.Group>
      </td>
      <td>
        {(props.film.date !== undefined) ? props.film.date.format('YYYY-MM-DD') : ""}
      </td>
      <td>
        <ReactStars
          value={props.film.rating}
          count={5}
          edit={false}
          half={false}
          onChange={ratingChanged}
          size={24}
          color2={'#ffd700'} />
      </td>


      <td><Button variant='light' className='edit'
        onClick={() => navigate(`/edit/${props.film.id}`)}
      ><Pencil></Pencil></Button></td>

      <td><Button variant='light' className='delete'
        onClick={() => { props.deleteFilm(props.film.id) }}
      ><Trash></Trash></Button></td>


    </>
  );
}

export { MainComponent };