import React, {memo, useRef} from "react";
import { Select, Button, Form, Input, DatePicker } from 'antd';
import {useCreated, useGetTime} from "../../utils/hooks";
import moment from "_moment@2.29.1@moment";

// waterproof 防水卷材
const Waterproof = () => {

    const formTab = useRef(null);
    const time = useGetTime();

    useCreated(() => {
        if (formTab != null) {
            // @ts-ignore
            formTab.current.setFieldsValue({e: moment(time)})
        }}
    );

    const onFinish = (values: any) => {
        console.log(values);
    };

    return (
        <>
            waterproof 防水卷材

            <Form {...layout} ref={ formTab } name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={'a'} label="规格型号等级" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name={'g'} label="出厂编号" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'c'} label="生产厂家" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name={'d'} label="供销" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name={'e'} label="进场日期" rules={[{ required: true }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item name={'f'} label="部位" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'g'} label="批量" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'h'} label="数量" rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name={'e'} label="取样日期" rules={[{ required: true }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

export default memo(Waterproof);
