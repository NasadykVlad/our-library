import React, {useContext, useEffect} from 'react'
import './filecloud.scss'
import axios from 'axios'
import {AuthContext} from "../../context/AuthContext";
import {Button, Form, ProgressBar, Table} from 'react-bootstrap'
import {withNamespaces} from 'react-i18next';
import {BsBook, BsSortNumericDownAlt, BsSortNumericUpAlt} from 'react-icons/bs'
import {MdMenuBook} from 'react-icons/md'
import {FaFileDownload} from 'react-icons/fa'
import {FiShare2, FiTrash2} from 'react-icons/fi'
import {AiOutlineSortAscending, AiOutlineSortDescending} from 'react-icons/ai'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Loader from '../../Loader'

const FileCloud = ({t}) => {
    const {userId} = useContext(AuthContext)

    let [dirFiles, setDirFiles] = React.useState([])
    let [file, setFile] = React.useState();
    let [term, changeTerm] = React.useState('');
    let [errorEnterBook, changeErrorEnterBook] = React.useState('')
    let [loading, setLoading] = React.useState(false);
    let [space, setSpace] = React.useState(0)

    useEffect(() => {
        getFiles()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getFiles = () => {
        setLoading(loading = true)

        axios.get('/api/files/get', {
            params: {
                userId
            }
        })
            .then(res => {
                setDirFiles(dirFiles = res.data.files)
                setLoading(loading = false)
                setSpace(space = 0)
                dirFiles.forEach(book => {
                    setSpace(space += book.size / 1024 / 1024)
                })
            })
    }

    const UploadContent = (event) => {
        setLoading(loading = true)
        event.preventDefault();

        if (event.target.files[0]) {
            changeErrorEnterBook(errorEnterBook = '')
            setFile(event.target.files[0]);
            setLoading(loading = false)
        }
    };

    const uploadFile = (e) => {
        e.preventDefault()
        changeErrorEnterBook(errorEnterBook = '')
        if (file) {
            if (file.type !== 'text/plain' && file.type !== 'application/octet-stream' && file.type !== 'application/epub+zip' && file.type !== 'application/pdf' && file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                changeErrorEnterBook(errorEnterBook = t('you-dont-download-other-formats'))
                setFile(file = false);
                document.querySelector('#file').value = ''
            } else {
                setLoading(loading = true)
                const formData = new FormData()
                formData.append('file', file)

                axios.post('api/files/upload', formData, {
                    params: {
                        userId,
                        name: file.name
                    }
                })
                    .then(res => {
                        if (res.data.error) {
                            changeErrorEnterBook(errorEnterBook = t(res.data.error))
                            NotificationManager.error(t('try-again'), t('operation-bad'));
                        } else {
                            getFiles()
                            document.querySelector('#file').value = ''
                            setFile(file = false);
                            NotificationManager.success(t('file-uploading'), t('operation-good'));
                        }
                        setLoading(loading = false)
                    })
            }
        } else {
            changeErrorEnterBook(errorEnterBook = t('firstly-download-up'))
        }
    }

    const downloadFile = (e, file) => {
        e.stopPropagation()
        setLoading(loading = true)

        axios.post('api/files/downloadFile', {
            userId,
            id: file._id
        }, {
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
                setLoading(loading = false)
                NotificationManager.success(t('file-downloading'), t('operation-good'));
            })
    }

    const deleteFile = (id) => {
        setLoading(loading = true)
        axios.post('api/files/removeFile', {
            userId,
            id
        })
            .then(res => {
                getFiles()
                setLoading(loading = false)
                NotificationManager.success(t('file-removed'), t('operation-good'));
            })
    }

    const changeSort = (sort) => {
        setLoading(loading = true)
        axios.get('/api/files/get', {
            params: {
                userId,
                sort
            }
        })
            .then(res => {
                setDirFiles(dirFiles = res.data.files)
                setLoading(loading = false)
                NotificationManager.success(t('sort-changed'), t('operation-good'));
            })
            .catch(err => {
                console.log(err)
            })
    }

    const shareBook = (id) => {
        setLoading(loading = true)
        axios.post('/api/files/share', {
            userId,
            id
        })
            .then(res => {
                navigator.clipboard.writeText(res.data.link)
                setLoading(loading = false)
                NotificationManager.success(t('link-copied'), t('operation-good'));
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
            <h4>{t('in-this-page')}</h4>

            {dirFiles.length > 0 ? <div>
                <p style={{'marginBottom': '0'}}>{t('you-powerfull')} {+space.toFixed(1)} МБ {t('as')} 500 МБ</p>
                <ProgressBar style={{'width': '100%', 'marginBottom': '1rem'}} animated now={+space.toFixed(1) / 5}/>
            </div> : ''}

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>{t('pick-up')}</Form.Label>
                <Form.Control id="file" onChange={UploadContent} type="file"
                              accept=".pdf, .doc, .docx, .fb2, .epub, .mobi, .txt, .djvu"/>
                {errorEnterBook ? <p style={{'color': 'red', 'marginBottom': '0'}}>{errorEnterBook}</p> : ''}
                <Button style={{'backgroundColor': 'black', 'border': 'none', 'marginTop': '10px'}}
                        onClick={(event) => uploadFile(event)} variant="primary">
                    {t('down-book')}
                </Button>
            </Form.Group>
            <Form style={{'marginTop': '1rem', 'marginBottom': '2rem'}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control className="book-names" onChange={() => addTerm()} type="text"
                                  placeholder={t('enter-book-name-for-search')}/>
                </Form.Group>
            </Form>
            {visibleFilteredBooks.length > 0 ?
                <div>
                    <div className='sorting'>
                        <h5>{t('use-sort')}</h5>
                        <div className='other-sort'>
                            <p>{t('sort-by-name')}</p>
                            <div>
                                <AiOutlineSortAscending onClick={() => changeSort('name1')}/>
                                <AiOutlineSortDescending onClick={() => changeSort('name-1')}/>
                            </div>
                        </div>
                        <div className='other-sort'>
                            <p>{t('sort-by-date')}</p>
                            <div>
                                <BsSortNumericDownAlt onClick={() => changeSort('date-1')}/>
                                <BsSortNumericUpAlt onClick={() => changeSort('date1')}/>
                            </div>
                        </div>
                        <div className='other-sort'>
                            <p>{t('sort-by-size')}</p>
                            <div>
                                <BsSortNumericDownAlt onClick={() => changeSort('size-1')}/>
                                <BsSortNumericUpAlt onClick={() => changeSort('size1')}/>
                            </div>
                        </div>
                    </div>
                </div> : ''}
            {visibleFilteredBooks.length > 0 ?
                <Table striped bordered hover variant="dark" style={{'marginTop': '1rem'}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>{t('type')}</th>
                        <th>{t('name1')}</th>
                        <th>{t('date')}</th>
                        <th>{t('size')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visibleFilteredBooks.map(val => {
                        return <tr key={val._id}>
                            <td>{dirFiles.indexOf(val) + 1}</td>
                            <td>
                                {val.type === 'text/plain' || val.type === 'application/pdf' ? <MdMenuBook/> :
                                    <BsBook/>}
                            </td>
                            <td>
                                {val.name}
                                <span style={{'float': 'right'}}>
                                {val.type === 'text/plain' || val.type === 'application/pdf' ?
                                    <FiShare2 className='share-ic' onClick={() => shareBook(val._id)}/> : ''}
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
            <NotificationContainer/>
            {loading ? <Loader/> : null}
        </div>
    )
}

export default withNamespaces()(FileCloud)
