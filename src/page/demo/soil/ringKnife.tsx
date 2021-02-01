import React, {memo, useRef} from "react";
import { Select, Button, Form, Input, DatePicker } from 'antd';
import {useCreated, useGetTime} from "../../../utils/hooks";
import moment from "_moment@2.29.1@moment";

// ringKnife 环刀
const RingKnife = () => {

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
            ringKnife 环刀

            <Form {...layout} ref={ formTab } name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={'f'} label="干密度" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'f'} label="含水率" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'a'} label="体积" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name={['a', 'b', 'c']} label="层数厚度标高" rules={[{ required: true }]}>
                    <Input />
                    <Input />
                    <Input />
                </Form.Item>
                <Form.Item name={'f'} label="使用机械" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'f'} label="系数" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'e'} label="日期" rules={[{ required: true }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item name={'f'} label="部位" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'g'} label="数量" rules={[{ required: true }]}>
                    <Input />
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

export default memo(RingKnife);
