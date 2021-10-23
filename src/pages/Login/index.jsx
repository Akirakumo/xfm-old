import React, { useEffect, useState, useCallback } from "react"
import { Form, Input, Button, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { get } from "../../ajax";
import "./index.less";

const key = "login";

export default function Login(props) {

  const [logining, setLogining] = useState(false)

  const onFinish = useCallback( values => {
      // 改变状态 禁用登录按钮
      setLogining(true);
  
      get('/login', values)
      .then( res => {
        // 登录成功
        console.log('登录成功', res)
  
        message.success({ content: '登陆成功!', key, duration: 2 })
        setLogining(false)
  
        // 记录登录状态
        localStorage.setItem('isLogin', 'true')

        // 跳转
        props.history.push('/home');
        
      }, 
      err => {
        // 登录失败
        console.log('登录失败', err)
        message.error({ content: '登陆失败!', key, duration: 2 })
        setLogining(false)
      })
      .catch( err => {
        // 出现错误
        console.log('登录错误', err)
        message.error({ content: '出现错误!请稍后重试', key, duration: 2 })
        setLogining(false)
      })
    }
  ) 

  useEffect(() => {

    const isLogin = localStorage.getItem('isLogin')

    if( isLogin === 'true' ) props.history.push('/home')

  }, [])

  return (
    <div className="login">
      <Form
        name="loginForm"
        className="login-form"
        size="large"
        onFinish={onFinish}
      >
        <p className="login-title">欢迎使用</p>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="login-form-button"
            type="primary"
            htmlType="submit"
            block
            loading={logining}
          >
            { logining ? "登录中…" : "登录" }
          </Button>
        </Form.Item>
        <p className="tips">用户名密码随意填写</p>
      </Form>
    </div>
  );
}
