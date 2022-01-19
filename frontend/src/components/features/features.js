import React from 'react';
import {Accordion, ListGroup, CardGroup, Card} from 'react-bootstrap'
import './features.scss'

const Features = () => {
    return (
        <div className="Features">
            <h1>Топ книг у жанрах</h1>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Українська література</Accordion.Header>
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
                    <Accordion.Header>Світова література</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup.Item>ИОГАНН ВОЛЬФГАНГ ГЁТЕ, «ФАУСТ», 1774-1831</ListGroup.Item>
                        <ListGroup.Item>УИЛЬЯМ ШЕКСПИР, «ГАМЛЕТ. РИЧАРД ІІІ», 1600</ListGroup.Item>
                        <ListGroup.Item>ЖОРЖ САНД, “КОНСУЕЛЛО”, 1842–1843</ListGroup.Item>
                        <ListGroup.Item>ДЖОНАТАН СВІФТ, “МАНДРИ ГУЛІВЕРА”, 1726</ListGroup.Item>
                        <ListGroup.Item>ДЖЕЙН ОСТИН, “ДОВОДИ РОЗСУДКУ”, 1817</ListGroup.Item>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <h2 class="last-news">Останні новини</h2>

            <CardGroup>
                <Card>
                    <Card.Body>
                        <Card.Title>1 лютого 2022 р. Українська бібліотечна асоціація святкує свій 27-й День народження!</Card.Title>
                        <Card.Text>
                            Запрошуємо долучитися до святкування і взяти участь у відеочеленджі.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Востаннє оновлено 19.01.2022</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>Щедрий вівторок у бібліотеках</Card.Title>
                        <Card.Text>
                            «Щедрий вівторок» об’єднав усю країну навколо добрих справ. До різних бібліотек ‒ публічних, шкільних, університетських, наукових ‒ за попередніми підрахунками було подаровано більше 4-х тисяч нових книг!
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Востаннє оновлено 19.01.2022</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>1 листопада стартував Місяць цифрової грамотності!</Card.Title>
                        <Card.Text>
                            1 листопада 2021 р. в межах проєкту Міністерства цифрової трансформації Дія. Цифрова освіта стартував Місяць цифрової грамотності.

                            Долучаємось до масштабної інформаційної кампанії, щоб надихнути користувачів бібліотек на набуття цифрових навичок!
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Востаннє оновлено 19.01.2022</small>
                    </Card.Footer>
                </Card>
            </CardGroup>

        </div>
    );
};

export default Features;
