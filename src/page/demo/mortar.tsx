import React, {memo, useRef} from "react";
import {Button, DatePicker, Form, Input, Select} from "antd";
import {useCreated, useGetTime} from "../../utils/hooks";

// mortar 砂浆
const Mortar = () => {

    const formTab = useRef(null);
    const time = useGetTime();

    useCreated(() => {
        if (formTab != null) {

        }}
    );

    const onFinish = (values: any) => {
        console.log(values);
    };

    return (
        <>
            mortar 砂浆 --- 实验日期提醒

            <Form {...layout} ref={ formTab } name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={'a'} label="强度" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name={'c'} label="厂家" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
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
                <Form.Item name={'h'} label="批量" rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name={'e'} label="实验日期" rules={[{ required: true }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item name={'c'} label="养护" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="demo">标准养护</Select.Option>
                    </Select>
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

export default memo(Mortar);
