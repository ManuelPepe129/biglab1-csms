import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import React from 'react';
import { times } from 'underscore'
import _default from 'react-bootstrap/esm/Accordion';
import { Sidebar } from './SidebarComponents';
import StarRating from 'react-bootstrap-star-rating';
//import './FilmsComponents.css';
import {Star,StarFill} from 'react-bootstrap-icons';
import dayjs from 'dayjs';

function MainComponent(props){
    const [filter, setFilter] = useState("All");

    function changeFilter(fil){
      setFilter(fil);
    }
    return(
      <Row>
        <Col xs={3}>      
          <Sidebar filter={changeFilter}/>
        </Col>
        <Col xs={9}>
          <Films films = {props.films} filter={filter} />
        </Col> 
      </Row>
    );

}


function Films(props){
    const [films, setFilms] = useState(props.films);
    return(
        <>
        <h1 class="mb-2" id="filter-title">{props.filter}</h1>
        <ul class="list-group list-group-flush" id="list-films">
        {
          films.filter(f=>{switch(props.filter)
                        {
                            case 'Favorites':
                             return f.isFavourite;
                              
                            case 'Best Rated':
                              return f.rating==5;
                              
                            case 'Seen Last Month':
                              if(f.date!=undefined)
                             return f.date.isAfter(dayjs().subtract(30,'day'));
                              else return false;
                            case 'Unseen':
                             return f.date==undefined;
                              
                            default:
                              return true;
                        }}).map((f) => <FilmData film={f} key={f.id} />)
        }
        </ul>
        <button type="button" class="btn btn-lg btn-primary fixed-right-bottom">&#43;</button>
        </>
    );
}

function FilmData(props){
    return(
        <>
        <li class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <p class="favorite text-start col-5">{props.film.title}</p>
              <span class="custom-control custom-checkbox col-3">
                { (props.film.isFavourite) ?
                    <input type="checkbox" class="custom-control-input" id="check" checked/>
                    : <input type="checkbox" class="custom-control-input" id="check"/>
                }
                <label class="custom-control-label" for="check"> Favorite</label>
              </span>
              <p class="col-2">{(props.film.date != undefined) ? props.film.date.format('YYYY-MM-DD') : ""}</p>
              <div class = "col-3">
              { times(5, (i) => (
                (props.film.rating != undefined) ?
                    (props.film.rating > i) ? <StarFill/> : <Star/>
                    : ""
              ))} 
              
              </div>              
            </div>
          </li>

        </>
    );
}




export { MainComponent };