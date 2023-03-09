import { useState } from "react";
import type { FC } from "react";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { useRecoilState } from "recoil";
import { loggedState } from "../state/recoil_state";
import { redirect, useNavigate } from "react-router-dom";


const onFinish = (values: string) => {
    console.log("success", values);
}

const onFinishFailed = (values: any) => {
    console.log("Failed", values)
}

const LoginPage: FC = (): any => {
    const [logged, setLogged] = useRecoilState(loggedState);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (username && password) {
            setLogged(true)
        }
        if (logged === true) {
            navigate("/dashboard");
        }
    }

    return (
        <div style={{ margin: "17rem 0 0 17rem", maxHeight: 1200 }}>
            <Row>
                <Col span={6} offset={6}>
                    <Form
                        name="complex-form"
                        onSubmitCapture={handleSubmit}
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            label="Username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            rules={[{
                                required: true,
                                message: "Please input your password"
                            }]}
                        >
                            <Input.Password
                                type="text"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked" style={{ paddingLeft: "5rem", textAlign: "center" }}>
                            <Checkbox>Remember me</Checkbox>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage;