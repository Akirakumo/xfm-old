import React, {useEffect} from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, PoweroffOutlined } from '@ant-design/icons';
import { login } from '../../ajax'
import './index.css'

const key = 'login';

export default function Login () {
    
    useEffect(()=>{
        console.log('登录',localStorage);
    },[])
    
    const onFinish = (values) => {
        message.loading({ content: '登录中...', key });
        login(values)
        .then( res => {
            console.log('登录信息',res);
            const {login_state, remember} = res.data
            if (login_state === 200) {
                message.success({ content: '登陆成功!', key, duration: 2 });
                window.location.reload()
                if (remember === 'true') localStorage.setItem('isLogin','true')
            }
        },err => {
            message.error({ content: '登陆失败!', key, duration: 2 });
            console.log('登录信息',err);
        })
    };

    return (
        <div className="login-box">

            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
                </Form.Item>
                <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                </Form.Item>

                <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}