import React from "react"
import logo from "@/assests/logo.png"
import { Button, Card, Form, Input } from "antd"
import './index.scss'

/** Login component */
export default function Login() {
    /** submit user input params */
    const onFinish = (values) => {
        console.log('Success:', values);
    };
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
                        name="userPhone"
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
                        name="vertiCode"
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