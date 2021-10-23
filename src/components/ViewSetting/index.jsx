import React, { useState } from 'react'
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch
} from 'antd'


export default function ViewSetting() {

    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        console.log();
        setComponentSize(size);
    };

    return (
        <>
        <Form
            labelCol={{
            span: 6,
            }}
            wrapperCol={{
            span: 12,
            }}
            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
        >
            <Form.Item label="模式" name="type">
                <Radio.Group>
                    <Radio.Button value="default">普通</Radio.Button>
                    <Radio.Button value="comic">漫画</Radio.Button>
                    <Radio.Button value="music">音乐</Radio.Button>
                </Radio.Group>
            </Form.Item>
            
            <Form.Item label="名称">
                <Input />
            </Form.Item>

            <Form.Item label="路径">
                <Input />
            </Form.Item>

            <Form.Item label="Select">
                <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
            
            <Form.Item label="Switch" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item>
                <Button>保存</Button>
            </Form.Item>
        </Form>
        </>
    )
}
