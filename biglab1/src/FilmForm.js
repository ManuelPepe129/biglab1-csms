import { Form, Button, Alert } from 'react-bootstrap';
import ReactStars from 'react-stars';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useParams, useLocation } from 'react-router-dom';


function FilmForm(props) {
    const { filmId } = useParams();
    const filmToEdit = props.films.find((f) => f.id.toString() === filmId);
    const [title, setTitle] = useState(filmToEdit ? filmToEdit.title : '');
    const [date, setDate] = useState(filmToEdit ? filmToEdit.date : '');
    const [favorite, setFavorite] = useState(filmToEdit ? filmToEdit.isFavourite : false);
    const [rate, setRate] = useState(filmToEdit ? filmToEdit.rating : 0);
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const location = useLocation().pathname;

    const newRate = (newRating) => {
        setRate(newRating);
    }
    function handleSubmit(event) {
        event.preventDefault();
        const dateObject = dayjs(date);

        if (title.trim().length === 0) {
            setErrorMsg('Title name can not be empty');

        } else if (dateObject.isValid() && dateObject.isAfter(dayjs())) {
            setErrorMsg('Date can not be in a future day');
        }
        else {
            const id = filmToEdit ? filmToEdit.id : props.films.at(-1).id + 1;
            const newDate = dateObject.isValid() ? date : '';
            const newFilm = { id: id, title: title.trim(), isFavourite: favorite, date: newDate, rating: rate }
            props.addFilm(newFilm);
            navigate('/');
        }

    }

    function displayForm() {
        if (!filmToEdit && location !== '/add') {
            return (<>
                <h1>Film id not valid</h1>
                <Button className='mx-3' variant="secondary" onClick={() => navigate('/')}>
                    Cancel
                </Button>
            </>);
        } else {
            return (<>
                {errorMsg ? <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible>{errorMsg}</Alert> : false}
                <Form onSubmit={handleSubmit}>
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
                            value={dayjs(date).format('YYYY-MM-DD')}
                            onChange={ev => setDate(dayjs(ev.target.value))}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check inline type="checkbox" label="Favorite" onChange={(event) => setFavorite(event.target.value)} defaultChecked={favorite} />

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
                            onChange={newRate}
                        />
                    </Form.Group>
                    <br />

                    <Button type='submit' variant="primary">
                        {filmToEdit ? 'Save' : 'Add Film'}
                    </Button>

                    <Button className='mx-3' variant="secondary" onClick={() => navigate('/')}>
                        Return to home
                    </Button>


                </Form>
            </>);
        }
    }

    return (
        displayForm()
    );
}
export { FilmForm };