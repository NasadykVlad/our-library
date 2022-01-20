import React from 'react';
import {Button, Carousel} from 'react-bootstrap';
import './landing.scss'

const Landing = () => {
    return (
        <div className="Landing" style={{backgroundImage: "url('./images/background-landing.png')"}}>
            <h1>Читай Сьогодні, <br/> Читай Завтра</h1>

            <h5>Веб-сервіс "Наша бібліотека" допоможе Вам у цьому!</h5>

            <Button href='/register' variant="warning">Почніть користуватись особистим кабінетом просто зараз</Button>

            <h5 class="why-us">Чому ви повинні вибрати нас?</h5>

            <Carousel>
                <Carousel.Item>
                    <Carousel.Caption>
                        <h3>Немає конкурентів на ринку</h3>
                    </Carousel.Caption>
                    <img
                        className="d-block w-100"
                        src="./images/books-slider-one.png"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./images/books-slider-one.png"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Особисті кабінети користувачів</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./images/books-slider-one.png"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Онлайн підтримка 24/7</h3>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./images/books-slider-one.png"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Безкоштовний доступ </h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        </div>
    );
};

export default Landing;
