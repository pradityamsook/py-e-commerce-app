import { Card, Row, Col } from 'antd';
import axios from 'axios';
import type { FC } from 'react';
// import { getImage } from '../API/image'
// import { imageCard } from '../state/recoil_state';

import './styles/card.css';

const imageName = ['jocelyn', 'jaqueline', 'jed', 'jabala', 'jacques', 'jack', 'jeri', 'josh', 'josephine', 'jake', 'jana', 'jenni', 'jolee', 'jai', 'jess', 'joe', 'jeane', 'jon', 'jazebelle', 'jean', 'jane', 'jodi', 'james', 'jordan', 'jerry', 'julie', 'jude', 'jia']
const { Meta } = Card;

let cardList: any[] = [];
for (let i = 0; i < 20; i++) {
    cardList.push(
        <Col xs={{ span: 24, offset: 0 }}
            lg={{ span: 8, offset: 0 }}
            md={{ span: 12, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
            className={'col-product-card'}
        >
            <Card
                bordered={true}
                hoverable
                className={'product-card'}
                cover={<img alt="example" src={`https://joesch.moe/api/v1/${imageName[i]}`} className={'img-product-card'} />}
            >
                <Meta title="Europe Street beat" description="www.instagram.com" />
                <div style={{ marginBottom: 8 }} />
                <h2 className='info'>
                    เสื้อยืด AIRism คอตตอน คอกลม แขน 1/2 ทรงหลวม ลายทาง Uniqlo U
                </h2>
                <div className='product-price-info'>
                    <span className='price-currency'>
                        <span>THB 500.00</span>
                    </span>
                </div>
            </Card>
        </Col>
    );
}
const CardProducts: FC = () => (
    <div className='div-res-product-card'>
        <Row>
            {cardList}
        </Row>
    </div>

);

export default CardProducts;