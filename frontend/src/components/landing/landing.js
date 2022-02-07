import React from 'react';
import {Button, Carousel} from 'react-bootstrap';
import {withNamespaces} from 'react-i18next';
import './landing.scss'

const Landing = ({t}) => {
    return (
        <div className="Landing" style={{backgroundImage: "url('./images/background-landing.png')"}}>
            <h1>{t("read-today")}, <br/> {t("read-tomorrow")}</h1>

            <h5>{t('webAppImprove')}</h5>

            <Button href='/register' variant="warning">{t('startUseSelfCabinet')}</Button>

            <h5 className="why-us">{t('why-we')}</h5>

            <Carousel>
                <Carousel.Item>
                    <Carousel.Caption>
                        <h3>{t('salesDontHaveConc')}</h3>
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
                        <h3>{t('our-cabinet-users')}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./images/books-slider-one.png"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>{t('online-support-24/7')}</h3>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./images/books-slider-one.png"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>{t('free-access')}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        </div>
    );
};

export default withNamespaces()(Landing);
