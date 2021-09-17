import React, {useEffect, useState} from 'react'
import { Form, Input, Button, Checkbox, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { get } from '../../ajax'
import './index.css'

const { Title, Paragraph, Text, Link } = Typography;
const key = 'login';
const url_login = 'http://192.168.31.190:8081/login'

export default function Login () {

    const [ logining, setLogining ] = useState(false)
    
    useEffect(()=>{
        console.log('登录',localStorage);
    },[])
    
    const onFinish = (values) => {
        
        setLogining(true)

        get(url_login,values)
        .then( 
            res => {
                console.log('登录信息', res)
                const { remember } = res
                message.success({ content: '登陆成功!', key, duration: 2 })
                if (remember === 'true') localStorage.setItem('isLogin','true')
                setLogining(false)
                window.location.reload()
            },
            err => {
                message.error({ content: '登陆失败!', key, duration: 2 })
                console.log('登录信息',err)
                setLogining(false)
            }
        )
        .catch(
            err => 
            {
                console.log('登录信息',err)
                setLogining(false)
            }
        )
    };

    return (
        <div className="login-box">
            <Title level={2}>登 录</Title>
            <Text style={{padding: '15px',color: '#999'}}>输入任意用户名密码登录</Text>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item 
                name="username" 
                rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input 
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                    placeholder="用户名" 
                    />
                </Form.Item>
                <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item 
                    name="remember" 
                    valuePropName="checked" 
                    noStyle>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="login-form-button"
                    loading={logining}
                    >
                        {logining?'登录中…':'登录'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}