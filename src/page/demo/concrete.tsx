import React, {memo, useRef, useState} from "react";
import {Select, Button, Form, Input, DatePicker, message} from 'antd';
import {useCreated, useGetTime, DateDiff, useChangeDoc} from "../../utils/hooks";
import moment from "_moment@2.29.1@moment";
import {useStore} from "../../store/vueStore/store";
import {Store, mutations} from "../../store/vueStore";

// concrete 混泥土
const Concrete = () => {

    const formTab: any = useRef(null);
    const {state,  changeDoc} = useChangeDoc();
    const [BooleanVal, setBooleanVal] = useState<boolean>(false); // test显示
    const time = useGetTime();
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
        const maintenance = formTab.current.getFieldValue("maintenance");
        let group;
        if (maintenance == 0) {
            group = parseInt(number)/100;
        }
        else if (maintenance == 1) {
            group = parseInt(number)/2000;
        }
        else {
            group = '/';
        }
        formTab.current.setFieldsValue({groupNum: group})
    }

    const onFinish = (values: any) => {
        const maintenance = formTab.current.getFieldValue("maintenance");
        let sampleName;
        if (maintenance == 0 || maintenance == 1) {
            sampleName = "混凝土抗压试块";
        }
        else {
            sampleName = "拆模混凝土抗压试块";
        }
        const da: any = {};
        da.experimentalDate = moment(values.experimentalDate).format('YYYY-MM-DD')
        da.time = moment(values.time).format('YYYY-MM-DD')
        da.period = DateDiff(da.time, da.experimentalDate);
        da.batch = values.batch + 'm³';
        da.groupNum = values.groupNum + '组';
        da.key = "concrete";
        da.maintenance = values.maintenance == 0?'标准养护': values.maintenance == 1?'同条件养护': '拆模同条件养护';
        da.strength = values.strength + '100*100*100'
        let testDa = Object.assign(data.settingData, values, {sampleName: sampleName}, da);
        if (BooleanVal) {
            changeDoc('concrete.docx', testDa);
        }
        else {
            mutations.addTabelData(testDa);
            message.success('提交成功');
        }
    };


    return (
        <>
            concrete 混泥土 --- 实验日期提醒
            <Form {...layout} ref={ formTab } name="nest-messages" initialValues={{'supplyMarket': '厂家', 'manufacturer': data.settingData.manufacturer}}
                  onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={'strength'} label="强度" rules={[{ required: true }]}>
                    <Select>
                        {
                            strengthList.map(res => {
                                return (
                                    <Select.Option value={ res.val } key={ res.key }>{ res.val }</Select.Option>
                                );
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={'maintenance'} label="养护" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="0">标准养护</Select.Option>
                        <Select.Option value="1">同条件养护</Select.Option>
                        <Select.Option value="2">拆模同条件养护</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name={'manufacturer'} label="厂家" rules={[{ required: true }]}>
                    <Input disabled/>
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
                <Form.Item name={'experimentalDate'} label="试验日期" rules={[{ required: true }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item name={'batch'} label="批量" rules={[{ required: true }]}>
                    <Input onInput={calculationGroup} onClick={calculationGroup}/>
                </Form.Item>
                <Form.Item name={'groupNum'} label="组数" rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            <button onClick={() => {setBooleanVal(true);message.success('开启成功');}}>测试 doc open</button>
            <button onClick={() => {setBooleanVal(false);message.success('关闭成功');}}>测试 doc close</button>
        </>
    );
}

// 强度

type StrengthList = {
    key: string,
    val: string
}
const strengthList: StrengthList[] = [
    {key: 'C15', val: 'C15'},
    {key: 'C20', val: 'C25'},
    {key: 'C35', val: 'C30'},
    {key: 'C40', val: 'C45'},
    {key: 'C50', val: 'C50'},
    {key: 'C55', val: 'C55'},
    {key: 'C60', val: 'C60'},
    {key: 'C65', val: 'C65'},
    {key: 'C70', val: 'C70'},
    {key: 'C75', val: 'C75'},
    {key: 'C80', val: 'C80'},
    {key: 'P4', val: 'P4'},
    {key: 'P6', val: 'P6'},
    {key: 'P8', val: 'P8'},
    {key: 'P10', val: 'P10'},
    {key: 'P12', val: 'P12'},
];

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

export default memo(Concrete);
