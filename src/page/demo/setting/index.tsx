import React, {memo, useRef, useState} from "react";
import {Button, DatePicker, Form, Input, message} from "antd";
import {useCreated, useUpdata, useMount} from "../../../utils/hooks";
import {useStore} from "../../../store/vueStore/store";
import {Store, mutations} from "../../../store/vueStore";

const Setting = () => {
        const formTab = useRef(null);
        const [localData, localSetData] = useState<string | null>(null);

        const data = useStore((store: Store) => {
            const { state } = store;
            const { settingData } = state;
            return {
                settingData
            }
        });

        useCreated(() => {
            if (formTab != null) {
                const localStorageData: string | null = localStorage.getItem('setData');
                // @ts-ignore
                formTab.current.setFieldsValue(JSON.parse(localStorageData));
                localSetData(localStorageData);
            }
        });

        useUpdata(localData, () => {
            if (formTab != null) {
                if (localData !== null) {
                    if (typeof localData === "string") {
                        mutations.changeSetting(JSON.parse(localData));
                    }
                }
            }
        })

        // 提交表单
        const onFinish = (values: any) => {
            mutations.changeSetting(values);
            localStorage.setItem('setData', JSON.stringify(values));
            message.success('修改成功');
        };

        return (
            <>
                设置公共区域 --
                { data.settingData.buildUnit } --
                <Form {...layout} ref={ formTab } name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={'buildUnit'} label="建设单位" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={'projectName'} label="工程名称" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={'entrustUnit'} label="委托单位" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={'monitorUnit'} label="监测单位" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={'constructionUnit'} label="施工单位" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={'supervisionUnit'} label="监理单位" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={'peopleDirect'} label="送样人" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={'operator'} label="试验员" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={'qualifiedNum'} label="考核合格证号" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={'manufacturer'} label="生产厂家" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={'contentIs'} label="内容和对情况" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={'witnessPerson'} label="见证人员" rules={[{ required: true }]}>
                        <Input />
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

export default memo(Setting);

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
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
