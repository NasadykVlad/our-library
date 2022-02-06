import React, {useContext, useEffect} from 'react';
import uuid from 'react-uuid';
import axios from 'axios';
import {Form, Button, ListGroup} from 'react-bootstrap';
import './list-of-books.scss';
import {BsCheckAll, BsFillFlagFill, BsTrash} from 'react-icons/bs';
import {AuthContext} from "../../context/AuthContext";
import { withNamespaces } from 'react-i18next';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Loader from '../../Loader'

const ListOfBooks = ({t}) => {
    useEffect(() => {
        getBooks()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const {userId} = useContext(AuthContext)
    let [error, setError] = React.useState('')
    let [books, setBooks] = React.useState([])
    let [term, changeTerm] = React.useState('');
    let [loading, setLoading] = React.useState(false);

    const getBooks = () => {
        setLoading(loading = true)
        try {
            axios.get('/api/books/get', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    userId
                }
            })
                .then(res => {
                    setBooks(books = res.data)
                    setLoading(loading = false)
                })
        } catch (err) {
            console.log(err)
        }
    }

    const addBook = () => {
        let text = document.querySelector('.mb-3 input').value;

        if (text.length >= 3) {
            setLoading(loading = true)
            setError(error = '')
            axios.post('/api/books/add', {
                id: uuid(),
                text,
                userId
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    books.push(res.data)
                    getBooks()
                    NotificationManager.success(t('book-added'), t('operation-good'));
                    setLoading(loading = false)
                })
                .catch(error => {
                    NotificationManager.error(t('try-again'), t('operation-bad'));
                })

            document.querySelector('.mb-3 input').value = ''
        } else {
            setError(error = 'enter-correctly-name-book')
        }
    }
    
    const deleteBook = (bookId) => {
        setLoading(loading = true)
        axios.post('/api/books/delete', {
            userId,
            bookId
        })
            .then(res => {
                getBooks()
                NotificationManager.success(t('book-deleted'), t('operation-good'));
                setLoading(loading = false)
            })
            .catch(error => {
                NotificationManager.error(t('try-again'), t('operation-bad'));
            })
    }

    const changeBookCompleted = (bookId, completed) => {
        setLoading(loading = true)
        axios.post('/api/books/completed', {
            userId,
            bookId,
            completed
        })
            .then(res => {
                getBooks()
                if (res.data.completed === false) {
                    NotificationManager.success(t('book-read'), t('operation-good'));
                } else {
                    NotificationManager.success(t('book-dont-read'), t('operation-good'));
                }
                setLoading(loading = false)
            })
            .catch(error => {
                NotificationManager.error(t('try-again'), t('operation-bad'));
            })
    }

    const changeBookImportant = (bookId, important, completed) => {
        setLoading(loading = true)
        axios.post('/api/books/important', {
            userId,
            bookId,
            important,
            completed
        })
            .then(res => {
                getBooks()
                if (res.data.important === false) {
                    NotificationManager.success(t('book-important'), t('operation-good'));
                } else {
                    NotificationManager.success(t('book-dont-important'), t('operation-good'));
                }
                setLoading(loading = false)
            })
            .catch(error => {
                NotificationManager.error(t('try-again'), t('operation-bad'));
            })
    }

    const searchBooks = (items, term) => {
        if (term.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.text.indexOf(term) > -1
        })
    }

    function addTerm() {
        changeTerm(term = document.querySelector('.book-name').value)
    }

    const visibleFilteredBooks = searchBooks(books, term);

    return (
        <div className="list-of-books">
            <h4>{t('lead-books')}</h4>
            <h5>{t('add-book')}</h5>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder={t('enter-book-name')} />
                </Form.Group>

                <Button onClick={addBook} variant="primary">
                    {t('add')}
                </Button>
            </Form>
            {error ? <p style={{'color': 'red'}}>{t(error)}</p> : ''}
            {visibleFilteredBooks.length > 0 ?
                <div>
                    <h5>{t('list-book')}</h5>
                    <Form style={{'marginTop': '1rem', 'marginBottom': '2rem'}}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control className="book-name" onChange={() => addTerm()} type="text" placeholder={t('enter-book-name-for-search')} />
                        </Form.Group>
                    </Form>
                </div> : ''}
            <ListGroup>
                {visibleFilteredBooks.map(val => {
                    return <ListGroup.Item key={val.id}>
                        <span className={val.completed ? 'list-group-item-completed' : val.important ? 'list-group-item-important' : ''}>{val.text}</span>
                        <span className="list-group-item-icons">
                            <BsFillFlagFill onClick={() => changeBookImportant(val.id, val.important, val.completed)} />
                            <BsCheckAll onClick={() => changeBookCompleted(val.id, val.completed)} />
                            <BsTrash onClick={() => deleteBook(val.id)} />
                        </span>
                    </ListGroup.Item>
                })}
            </ListGroup>
            <NotificationContainer />
            {loading ? <Loader /> : null}
        </div>
    );
};

export default withNamespaces()(ListOfBooks);
