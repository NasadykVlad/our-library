import React from 'react';
import {Accordion, Card, CardGroup, ListGroup} from 'react-bootstrap'
import './features.scss'
import {withNamespaces} from 'react-i18next';

const Features = ({t}) => {
    return (
        <div className="Features">
            <h1>{t('top-books')}</h1>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{t('ukr-literat')}</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup>
                            <ListGroup.Item>ТАМАРА ГОРІХА ЗЕРНЯ, «ДОЦЯ», 2019</ListGroup.Item>
                            <ListGroup.Item>ПОЛІНА КУЛАКОВА, «УСІ ЇХНІ ДЕМОНИ», 2020</ListGroup.Item>
                            <ListGroup.Item>SAIGON, “ЮПАК”, 2020</ListGroup.Item>
                            <ListGroup.Item>КИРИЛО КРУТОРОГОВ, “#БОМБАРДИР”, 2017</ListGroup.Item>
                            <ListGroup.Item>ВОЛОДИМИР ЛИС, “СТОЛІТТЯ ЯКОВА”, 2016</ListGroup.Item>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>{t('our-literat')}</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup.Item>ИОГАНН ВОЛЬФГАНГ ГЁТЕ, «ФАУСТ», 1774-1831</ListGroup.Item>
                        <ListGroup.Item>УИЛЬЯМ ШЕКСПИР, «ГАМЛЕТ. РИЧАРД ІІІ», 1600</ListGroup.Item>
                        <ListGroup.Item>ЖОРЖ САНД, “КОНСУЕЛЛО”, 1842–1843</ListGroup.Item>
                        <ListGroup.Item>ДЖОНАТАН СВІФТ, “МАНДРИ ГУЛІВЕРА”, 1726</ListGroup.Item>
                        <ListGroup.Item>ДЖЕЙН ОСТИН, “ДОВОДИ РОЗСУДКУ”, 1817</ListGroup.Item>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <h2 className="last-news">{t('last-news')}</h2>

            <CardGroup>
                <Card>
                    <Card.Body>
                        <Card.Title>{t('first-febryary')}</Card.Title>
                        <Card.Text>{t('invite-you')}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">{t('last-updated')}</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>{t('our-tuesday')}</Card.Title>
                        <Card.Text>{t('our-tuesday-decription')}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">{t('last-updated')}</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>{t('first-november')}</Card.Title>
                        <Card.Text>{t('first-november-description')}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">{t('last-updated')}</small>
                    </Card.Footer>
                </Card>
            </CardGroup>

        </div>
    );
};

export default withNamespaces()(Features);
