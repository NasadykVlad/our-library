import React from 'react';
import './about.scss'
import {Card, Modal, Button} from 'react-bootstrap'

const About = () => {

    const [modalShow, setModalShow] = React.useState(false);

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Напишіть Нам!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Місцезнаходження:</h4>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.0078296050606!2d24.708930416029883!3d48.91524307929308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4730c16a0a7c0e47%3A0x8bf87c6dfb153463!2z0KPQvdC40LLQtdGA0YHQuNGC0LXRgiDQmtC-0YDQvtC70Y8g0JTQsNC90LjQuNC70LA!5e0!3m2!1sru!2sua!4v1642851647808!5m2!1sru!2sua"
                        width="90%"
                        title="iframe"
                        height="250vh"
                        frameBorder="0"
                        allowFullScreen=""
                        loading="lazy"
                        aria-hidden="false"
                        tabIndex="0"
                    />
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p>
                    <div className="badged">
                        <a href="tel:+380664074012">
                            Натисни, щоб подзвонити
                        </a>{' '}
                        <a href="mailto:nasadyk@your-mentor.info"> Натисни, щоб написати листа</a>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div className="About">
            <Card>
                <Card.Header as="h5">Хто ми?</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Електронна бібліотека «Наша бібліотека» — онлайн-бібліотека, започаткована та підтримується з 22.02.2022. У особистих кабінетах ви можете додати ресурси, що зберігаються на ваших ПК з метою безпеки та економії місця. Також після реєстрації Вам буде доступна функція додавати книги у список для прочитання, позначати їх, як прочитаними та важливими для прочитання, видаляти ці книги, та в загальному керувати цим функціоналом.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card>
                <Card.Header as="h5">Для чого ми створені?</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Після детального вивчення ринку, ми отримали інформацію, що таким функціоналом як у компанії "Наша бібліотека" можуть похвалитись досить не багато конкурентів. Адже, наш софт забезпечує в собі всі функції популярних інструментів для зручності і комфортного прочитання книг. Наприклад функція збереження книг схожа на "Google Drive", а список книг це типові "Нотатки".
                    </Card.Text>
                </Card.Body>
            </Card>

            <Button className="btn-modal" variant="primary" onClick={() => setModalShow(true)}>
                Як до Нас звернутись?
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
};

export default About;
