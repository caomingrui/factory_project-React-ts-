import React, {memo, useRef} from "react";
import {Select, Button, Form, Input, DatePicker, message} from 'antd';
import { useCreated, useGetTime } from "../../../utils/hooks";
import moment from 'moment'
import {mutations, Store} from "../../../store/vueStore";
import {useStore} from "../../../store/vueStore/store";

// 试样名称
const sampleName = ['素土', '2:8灰土', '3:7灰土'];

// 灰土
const Dust = () => {
    const formTab: any = useRef(null);
    const time = useGetTime();
    const times = useGetTime(2);
    const data = useStore((store: Store) => {
        const { state } = store;
        const { settingData } = state;
        return {
            settingData
        }
    });

    useCreated(() => {
        if (formTab != null) {
            formTab.current.setFieldsValue({time: moment(time)})
        }}
    );

    const onFinish = (values: any) => {
        console.log(values);
        let da: typeof values = {};
        da.time = moment(values.time).format('YYYY-MM-DD');
        da.samplingDate = moment(values.samplingDate).format('YYYY-MM-DD');
        da.factory = '土：' + values.factorySoil + '\n白灰：' + values.factoryWhite;
        da.batch = '素土：50kg\n白灰：30kg'
        da.keyName = "dust";
        da.key = "dust" + times;
        let testDa = Object.assign(data.settingData, values,  da);

        mutations.addTabelData(testDa);
        message.success('提交成功');
    };


    return (
        <div>
            灰土 Dust

            <Form {...layout} ref={ formTab } name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={'sampleName'} label="试样名称" rules={[{ required: true }]}>
                    <Select>
                        {
                            sampleName.map(res => <Select.Option value={ res } key={ res }>{ res }</Select.Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item name={'factorySoil'} label="生产厂家 - 土" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name={'factoryWhite'} label="生产厂家 - 白灰" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name={'supplyMarketingUnits'} label="供销单位" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name={'time'} label="进厂日期" rules={[{ required: true }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item name={'useParts'} label="部位" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name={'samplingDate'} label="取样日期" rules={[{ required: true }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
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

export default memo(Dust);
