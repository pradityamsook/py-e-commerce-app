import { Card, Row, Col, Divider, Button } from 'antd';
import { FC, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';

import '../components/styles/card.css';
import { loggedState, productIDState, productListState } from '../state/recoil_state';
import { fetchProduct } from '../services/product.service';
import { useLocalStorage } from 'usehooks-ts';

// const imageName = ['jocelyn', 'jaqueline', 'jed', 'jabala', 'jacques', 'jack', 'jeri', 'josh', 'josephine', 'jake', 'jana', 'jenni', 'jolee', 'jai', 'jess', 'joe', 'jeane', 'jon', 'jazebelle', 'jean', 'jane', 'jodi', 'james', 'jordan', 'jerry', 'julie', 'jude', 'jia']
// const { Meta } = Card;

const DashboardPage: FC = (): any => {
    const logged: boolean = useRecoilValue(loggedState);
    const [productId, setProductId] = useRecoilState(productIDState);
    const [productList, setProductList] = useRecoilState(productListState)
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogged, setIsLogged] = useLocalStorage("isLogged", "false");

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (isLogged === "false") {
            navigate("/");
        }
    }, [location.pathname, isLogged]);

    const fetchData = async () => {
        await fetchProduct()
            .then((res) => {
                setProductList(res);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const onClickProduct = (productId: number) => {
        setProductId(productId);
        navigate(`/dashboard/edit_product/${productId}`);
    }
    if (isLogged === null || isLogged === undefined || isLogged === "false") {
        return (<></>);
    }

    return (
        <div className='div-res-product-card'>
            <Divider orientation="left" style={{ textAlign: "left" }}>Product list</Divider>
            {productList && productList.length > 0 && productList.map((product: any, index) => (
                <Row key={product.product_id} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: "2rem" }}>
                    <>
                        <Col style={{ textAlign: "center", paddingLeft: "1rem", alignItems: "center", paddingTop: "0.5rem   " }} span={12}>
                            <div>{product.name}</div>
                        </Col>
                        <Col style={{ textAlign: "center", paddingLeft: "1rem", alignItems: "center", paddingTop: "0.5rem   " }} span={3}>
                            <div>Price: THB {product.price}</div>
                        </Col>
                        <Col style={{ textAlign: "center", paddingLeft: "1rem", alignItems: "center", paddingTop: "0.5rem   " }} span={3}>
                            <div>Amount: {product.amount}</div>
                        </Col>
                        <Col span={6}>
                            <Button onClick={() => onClickProduct(product.product_id)}>Edit</Button>
                            {/* <Button>Edit<NavLink to="/dashboard/edit_product" /></Button> */}
                            <span style={{ marginLeft: "0.5rem" }}></span>
                            <Button>delete</Button>
                        </Col>
                    </>
                </Row>
            ))}
        </div >
    );

}

export default DashboardPage;