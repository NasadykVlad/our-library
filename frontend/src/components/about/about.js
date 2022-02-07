import React from 'react';
import './about.scss'
import {Button, Card, Modal} from 'react-bootstrap'
import {withNamespaces} from 'react-i18next';

const About = ({t}) => {
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
                        {t('send-us')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{t('locate')}</h4>

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
                        {t('we-send')}
                    </p>
                    <div className="badged">
                        <a href="tel:+380664074012">
                            {t('tel')}
                        </a>{' '}
                        <a href="mailto:nasadyk@your-mentor.info">{t('mail')}</a>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>{t('close')}</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div className="About">
            <Card>
                <Card.Header as="h5">{t('our-who')}</Card.Header>
                <Card.Body>
                    <Card.Text>{t('electro-library')}</Card.Text>
                </Card.Body>
            </Card>

            <Card>
                <Card.Header as="h5">{t('why-we-created')}</Card.Header>
                <Card.Body>
                    <Card.Text>{t('after-detailing')}</Card.Text>
                </Card.Body>
            </Card>

            <Button className="btn-modal" variant="primary" onClick={() => setModalShow(true)}>
                {t('why-tell')}
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
};

export default withNamespaces()(About);
