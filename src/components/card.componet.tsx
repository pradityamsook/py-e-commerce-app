import { Card, Row, Col } from 'antd';
import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchProduct } from '../services/product.service';
import { useRecoilState } from 'recoil';

import './view/styles/card.css';
import { productState } from '../state/recoil_state';
import { Content } from 'antd/es/layout/layout';

const imageName = ['jocelyn', 'jaqueline', 'jed', 'jabala', 'jacques', 'jack', 'jeri', 'josh', 'josephine', 'jake', 'jana', 'jenni', 'jolee', 'jai', 'jess', 'joe', 'jeane', 'jon', 'jazebelle', 'jean', 'jane', 'jodi', 'james', 'jordan', 'jerry', 'julie', 'jude', 'jia']

const CardProducts: FC = () => {
    const [products, setProducts] = useRecoilState(productState);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await fetchProduct();
            setProducts(result);
        } catch (e: any) {
            console.error(e)
        }

    }

    const checkImage = (image?: string) => {
        if (!image || image === null || image === "undefined" || image === undefined) {
            return `${process.env.REACT_APP_IMAGE}book.png`
        }
        return `${process.env.REACT_APP_IMAGE}${image}`
    }

    return (
        <div className='div-res-product-card'>
            <Content style={{ padding: "4rem 0 0 4rem"}}>
                <Row>
                    {products && products.length && products.map((product: any, index) => (
                        <Col
                            key={index}
                            xs={{ span: 24, offset: 0 }}
                            lg={{ span: 8, offset: 0 }}
                            md={{ span: 12, offset: 0 }}
                            xl={{ span: 6, offset: 0 }}
                            className={'col-product-card'}
                        >
                            <Card
                                bordered={true}
                                hoverable
                                className={'product-card'}
                                cover={
                                    <img
                                        alt="example"
                                        src={ checkImage(product.image_url)}
                                        className={'img-product-card'}
                                    />
                                }
                            >
                                {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
                                <div style={{ marginBottom: 8 }} />
                                <h2 className='info'>
                                    <NavLink to={`/products/${product.name}/${product.product_id}`} className={"nav-click"}>
                                        {product?.name}
                                    </NavLink>
                                </h2>
                                <div className='product-price-info'>
                                    <span className='price-currency'>
                                        <span>THB {product?.price}</span>
                                    </span>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
            
        </div>
    );
}

export default CardProducts;