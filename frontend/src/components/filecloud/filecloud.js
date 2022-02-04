import React, {useContext, useEffect} from 'react'
import './filecloud.scss'
import axios from 'axios'
import {AuthContext} from "../../context/AuthContext";
import {Button, Form, Table} from 'react-bootstrap'
import { withNamespaces } from 'react-i18next';
import {MdInsertPhoto} from 'react-icons/md'
import {FaFileDownload} from 'react-icons/fa'
import {FiTrash2, FiShare2} from 'react-icons/fi'
import {AiOutlineSortAscending, AiOutlineSortDescending} from 'react-icons/ai'
import {BsSortNumericDownAlt, BsSortNumericUpAlt} from 'react-icons/bs'

const FileCloud = ({t}) => {

    const {userId} = useContext(AuthContext)

    let [dirFiles, setDirFiles] = React.useState([])
    let [file, setFile] = React.useState();
    let [term, changeTerm] = React.useState('');

    useEffect(() => {
        getFiles()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getFiles = () => {
        axios.get('/api/files/get', {
            params: {
                userId
            }
        })
            .then(res => {
                setDirFiles(dirFiles = res.data.files)
            })
    }

    const UploadContent = (event) => {
        event.preventDefault();
        if (event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const uploadFile = (e) => {
        e.preventDefault()
        if (file) {
            const formData = new FormData()
            formData.append('file', file)

            axios.post('api/files/upload', formData, {
                params: {
                    userId
                }
            })
                .then(res => {
                    getFiles()
                    document.querySelector('#file').value = ''
                    setFile(file = false);
                })
        }
    }

    async function downloadFile (e, file) {
        e.stopPropagation()

        axios.post('api/files/downloadFile',{
            userId,
            id: file._id}, {
            responseType: 'blob'
        })
            .then(res => {
                const downloadUrl = window.URL.createObjectURL(res.data)
                const link = document.createElement('a')
                link.href = downloadUrl
                link.download = file.name
                document.body.appendChild(link)
                link.click()
                link.remove()
            })
    }

    const deleteFile = (id) => {
        axios.post('api/files/removeFile', {
            userId,
            id
        })
            .then(res => {
                getFiles()
            })
    }

    const changeSort = (sort) => {
        axios.get('/api/files/get', {
            params: {
                userId,
                sort
            }
        })
            .then(res => {
                setDirFiles(dirFiles = res.data.files)
            })
    }

    const searchBooks = (items, term) => {
        if (term.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    function addTerm() {
        changeTerm(term = document.querySelector('.book-names').value)
    }

    const visibleFilteredBooks = searchBooks(dirFiles, term);

    return (
        <div className="FileCloud">
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Виберіть книгу, яку хочете завантажити у файлову хмару:</Form.Label>
                <Form.Control id="file" onChange={UploadContent} type="file" />
                <Button style={{'backgroundColor': 'black', 'border': 'none', 'marginTop': '10px'}} onClick={(event) => uploadFile(event)} variant="primary">
                    Завантажити книгу
                </Button>
            </Form.Group>
            <Form style={{'marginTop': '1rem', 'marginBottom': '2rem'}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control className="book-names" onChange={() => addTerm()} type="text" placeholder={t('enter-book-name-for-search')} />
                </Form.Group>
            </Form>
            <div className='sorting'>
                <h5>Щоб скористатись сортування натисніть на відповідну іконку</h5>
                <div className='other-sort'>
                    <p>Сортування по імені</p>
                    <div>
                        <AiOutlineSortAscending onClick={() => changeSort('name1')}/>
                        <AiOutlineSortDescending onClick={() => changeSort('name-1')}/>
                    </div>
                </div>
                <div className='other-sort'>
                    <p>Сортування по даті додавання</p>
                    <div>
                        <BsSortNumericDownAlt onClick={() => changeSort('date-1')}/>
                        <BsSortNumericUpAlt onClick={() => changeSort('date1')}/>
                    </div>
                </div>
                <div className='other-sort'>
                    <p>Сортування по розміру</p>
                    <div>
                        <BsSortNumericDownAlt onClick={() => changeSort('size-1')}/>
                        <BsSortNumericUpAlt onClick={() => changeSort('size1')}/>
                    </div>
                </div>
            </div>
            {visibleFilteredBooks.length > 0 ?
                 <Table striped bordered hover variant="dark" style={{'marginTop': '1rem'}}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Тип</th>
                    <th>Ім'я</th>
                    <th>Дата</th>
                    <th>Розмір</th>
                </tr>
                </thead>
                <tbody>
                {visibleFilteredBooks.map(val => {
                    return <tr key={val._id}>
                        <td>{dirFiles.indexOf(val) + 1}</td>
                        <td>{val.type === 'image/jpeg' ?
                            <MdInsertPhoto/> : false}</td>
                        <td>
                            {val.name}
                            <span style={{'float': 'right'}}>
                                <FiShare2 className='share-ic' />
                                <FaFileDownload onClick={(e) => downloadFile(e, val)} className='download-icon'/>
                                <FiTrash2 onClick={() => deleteFile(val._id)} className='remove-icon'/>
                            </span>
                        </td>
                        <td>{val.date.slice(0, 10)}</td>
                        <td>{(val.size / 1024 / 1024).toFixed(1)} МБ</td>
                    </tr>
                })}
                </tbody>
            </Table> : ''
            }
        </div>
    )
}

export default withNamespaces()(FileCloud)
