import React from "react"
import logo from "@/assests/logo.png"
import { Button, Card, Form, Input, message } from "antd"
import './index.scss'
import { useDispatch, useSelector } from "react-redux";
import { fetchGetToken } from '@/store/modules/user';
import { useNavigate } from "react-router-dom";

/** Login component */
export default function Login() {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userReducer);
    const navigate = useNavigate();
    /** submit user input params */
    const onFinish = async (values) => {
        await dispatch(fetchGetToken(values));
        if (token) {
            navigate('/layout/home');
            message.success("login success");
        }
    };
    /** failed to send input params */
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="login">
            <Card
                className="login-container"
            >
                <img src={logo} className="login-logo" alt="" />
                <Form
                    validateTrigger="onBlur"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phoneNumber!',
                            },
                            {
                                pattern: /^1[3-9]\d{9}/,
                                message: "please input correct phoneNumber!"
                            }
                        ]}>
                        <Input size="large" placeholder="请输入您的手机号码" />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your vertifyCode!',
                            },
                        ]}>
                        <Input size="large" placeholder="请您输入验证码" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>登录</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}