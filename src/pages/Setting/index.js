import React,{ useContext } from 'react'
import { Typography,Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { AppContext,UPDATA_USERNAME } from '../../context'
import Card from '../../components/Card'
import './index.css'

const { Title, Paragraph, Text, Link } = Typography;

export default function Setting () {
    const { state:{userName},dispatch } = useContext(AppContext);
    return (
        <>
            <div className="avatar">
            <Avatar
                size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 80, xxl: 100 }}
                icon={<UserOutlined />}
            />
            </div>
            <h1 className="title">欢迎使用，{userName}</h1>
            <p className="text">管理自己的信息、隐私和安全，让程序更好地满足您的需求。</p>
            <div className="site-card-border-less-wrapper">
                <Card title="用户" />
                <Card title="全局设置" />
                <Card title="安全" />
                <Card title="后台服务" />
            </div>
        </>
    )
}