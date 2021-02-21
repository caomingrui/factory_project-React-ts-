import React, {memo, useRef} from "react";
import {Button, DatePicker, Form, Input, message, Select} from "antd";
import {DateDiff, useCreated, useGetTime} from "../../utils/hooks";
import moment from "_moment@2.29.1@moment";
import {mutations, Store} from "../../store/vueStore";
import {useStore} from "../../store/vueStore/store";

// 试样名称
const sampleName = ['干混砌筑砂浆', '湿拌砌筑砂浆'];
// 强度
const strength = ['M5', 'Mb5', 'M7.5', 'M10'];

// mortar 砂浆
const Mortar = () => {

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

    const calculationGroup = (e: any) => {
        let number = e.target.value;
        const maintenance = formTab.current.getFieldValue("sampleName");
        let group;
        if (maintenance == '干混砌筑砂浆') {
            group = parseInt(number)/100;
        }
        else if (maintenance == '湿拌砌筑砂浆') {
            group = parseInt(number)/50;
        }
        else {
            group = '/';
        }
        formTab.current.setFieldsValue({groupNum: group})
    }

    const onFinish = (values: any) => {
        console.log(values)
        const da: typeof values= {};
        da.time = moment(values.time).format('YYYY-MM-DD')
        da.experimentalDate = moment(values.experimentalDate).format('YYYY-MM-DD')
        da.type = values.strength + '70*70*70'
        da.keyName = "mortar";
        da.key = "mortar" + times;
        da.impending = '28d';
        let testDa = Object.assign(data.settingData, values,  da);
        mutations.addTabelData(testDa);
        message.success('提交成功');
    };

    return (
        <>
            mortar 砂浆 --- 实验日期提醒

            <Form {...layout} ref={ formTab } name="nest-messages" initialValues={{'supplyMarket': '厂供', 'maintenance': '标准养护'}}
                  onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={'sampleName'} label="试样名称" rules={[{ required: true }]}>
                    <Select>
                        {
                            sampleName.map(res => <Select.Option value={ res } key={ res }>{ res }</Select.Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={'strength'} label="强度" rules={[{ required: true }]}>
                    <Select>
                        {
                            strength.map(res => <Select.Option value={ res } key={ res }>{ res }</Select.Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={'manufacturer'} label="生产厂家" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name={'supplyMarket'} label="供销" rules={[{ required: true }]}>
                    <Input disabled/>
                </Form.Item>
                <Form.Item name={'time'} label="日期" rules={[{ required: true }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item name={'useParts'} label="部位" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'batch'} label="批量" rules={[{ required: true }]}>
                    <Input onInput={calculationGroup} onClick={calculationGroup}/>
                </Form.Item>
                <Form.Item name={'groupNum'} label="组数" rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name={'experimentalDate'} label="实验日期" rules={[{ required: true }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item name={'maintenance'} label="养护" rules={[{ required: true }]}>
                    <Input disabled />
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
