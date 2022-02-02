import React, {useContext, useEffect} from 'react'
import './filecloud.scss'
import axios from 'axios'
import {AuthContext} from "../../context/AuthContext";
import {Button, Table} from 'react-bootstrap'
import {MdInsertPhoto} from 'react-icons/md'
import {FaFileDownload} from 'react-icons/fa'

const FileCloud = () => {

    const {userId} = useContext(AuthContext)

    let [dirFiles, setDirFiles] = React.useState([])
    let [file, setFile] = React.useState();

    useEffect(() => {
        getDir()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getDir = () => {
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
                    getDir()
                    document.querySelector('#file').value = ''
                    setFile(file = false);
                })
        }
    }

    async function downloadFile (e, file) {
        e.stopPropagation()

        axios.post('api/files/downloadFile',{  userId,
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

    return (
        <div className="FileCloud">
            <input type="file" id="file" onChange={UploadContent}/>
            <Button onClick={(event) => uploadFile(event)} variant="primary">
                Загрузити
            </Button>
            {dirFiles.length > 0 ?
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
                {dirFiles.map(val => {
                    return <tr key={val._id}>
                        <td>{dirFiles.indexOf(val) + 1}</td>
                        <td>{val.type === 'image/jpeg' ?
                            <MdInsertPhoto/> : false}</td>
                        <td onClick={(e) => downloadFile(e, val)}>
                            {val.name}<span style={{'float': 'right'}}>
                            <FaFileDownload className='remove-icon'/></span>
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

export default FileCloud
