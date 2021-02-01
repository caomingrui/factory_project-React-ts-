import React, {memo, useRef} from "react";
import { Select, Button, Form, Input, DatePicker } from 'antd';
import {useCreated, useGetTime} from "../../utils/hooks";
import moment from "_moment@2.29.1@moment";

// switch 混泥土
const Switch = () => {

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
            switch 电渣压力焊

            <Form {...layout} ref={ formTab } name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={'a'} label="规格" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name={'f'} label="部位" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name={'h'} label="组数" rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name={'h'} label="批量" rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name={'e'} label="日期" rules={[{ required: true }]}>
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

export default memo(Switch);
