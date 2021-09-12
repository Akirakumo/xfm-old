import React,{ useContext, useState } from 'react'
import { Typography, Avatar, Divider, Card, Button, Switch  } from 'antd'
import { UserOutlined, HighlightOutlined, SmileOutlined, SmileFilled } from '@ant-design/icons';
import { AppContext,UPDATA_USERNAME } from '../../context'
// import Card from '../../components/Card'
import './index.css'

const { Title, Paragraph, Text, Link } = Typography;

export default function Setting () {
    const { state:{userName}, dispatch } = useContext(AppContext);
    const [editUserName, setEditUserName] = useState(userName);
    const [editPassword, seteditPassword] = useState('******');
    const [path, setPath] = useState('D:/Storage/');

    return (
        <>
            <div className="avatar">
            <Avatar
                size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 80, xxl: 100 }}
                icon={<UserOutlined />}
            />
            </div>
            <Title level={2} className="title">欢迎使用，{userName}</Title>
            <p className="text">管理自己的信息、隐私和安全，让程序更好地满足您的需求。</p>
            <div className="site-card-border-less-wrapper">
                <Card title="用户" className="card">
                    <Title level={5}>用户名:</Title>
                    <Paragraph 
                    editable={{ 
                        tooltip: '点击修改用户名',
                        onChange: setEditUserName 
                    }}>
                        {editUserName}
                    </Paragraph>
                    <Divider />
                    <Title level={5}>密码:</Title>
                    <Paragraph 
                    editable={{ 
                        tooltip: '点击修改密码',
                        onChange: seteditPassword
                    }}>
                        {editPassword}
                    </Paragraph>
                    <Divider />
                </Card>
                <Card title="全局设置" className="card">
                    <Title level={5}>档案文件目录:</Title>
                    <Paragraph editable={{ 
                        tooltip: '点击修改路径',
                        onChange: setPath
                    }}>
                        {path}
                    </Paragraph>
                    <Divider />
                </Card>
                <Card title="安全" className="card">
                <Title level={5}>是否启用密码: <Switch /></Title>
                </Card>
                <Card title="后台服务" className="card">
                    <Button>重启后台监视器</Button>
                    <Divider />
                    <Button>清理临时文件夹</Button>
                    <Divider />
                    <Button>清理数据库</Button>
                    <Divider />
                    <Button danger>重置数据库</Button>
                </Card>
            </div>
        </>
    )
}