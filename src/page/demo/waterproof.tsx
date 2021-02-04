import React, {memo, useRef, useState} from "react";
import {Select, Button, Form, Input, DatePicker, message} from 'antd';
import {useChangeDoc, useCreated, useGetTime} from "../../utils/hooks";
import moment from "_moment@2.29.1@moment";
import {useStore} from "../../store/vueStore/store";
import {Store, mutations} from "../../store/vueStore";

const rankList: string[] = ['SBS Ⅰ PY PE PE 3 10', 'SBS Ⅱ PY PE PE 3 10', 'SBS Ⅱ PY PE PE 4 10', 'SBS Ⅱ PY PE PE 4 10'];

// waterproof 防水卷材 -- ok
const Waterproof = () => {

    const formTab: any = useRef(null);
    const time = useGetTime();
    const [BooleanVal, setBooleanVal] = useState<boolean>(false); // test显示
    const {state,  changeDoc} = useChangeDoc();
    const data = useStore((store: Store) => {
        const { state } = store;
        const { settingData, tabelData } = state;
        return {
            settingData,
            tabelData
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
        da.key = "waterproof";
        da.sampleName = "弹性体改性沥青防水卷材";
        let testDa = Object.assign(data.settingData, values, da);
        if (BooleanVal) {
            changeDoc('waterproof.docx', testDa);
        }
        else {
            mutations.addTabelData(testDa);
            message.success('提交成功');
        }
    };

    return (
        <>
            waterproof 防水卷材
            { data.tabelData.length }
            <Form {...layout} ref={ formTab } name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}
                  initialValues={{'supplyMarket': '厂家', 'manufacturer': data.settingData.manufacturer, "groupNum": "1.5㎡"}}>
                <Form.Item name={'type'} label="规格型号等级" rules={[{ required: true }]}>
                    <Select>
                        {
                            rankList.map((res, index) =>
                                <Select.Option value={res} key={index}>{ res }</Select.Option>
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={'factoryNum'} label="出厂编号" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'manufacturer'} label="生产厂家" rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name={'supplyMarket'} label="供销" rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name={'time'} label="进场日期" rules={[{ required: true }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item name={'useParts'} label="部位" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'batch'} label="批量" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'groupNum'} label="数量" rules={[{ required: true }]}>
                    <Input disabled />
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
            <button onClick={() => {setBooleanVal(true);message.success('开启成功');}}>测试 doc open</button>
            <button onClick={() => {setBooleanVal(false);message.success('关闭成功');}}>测试 doc close</button>
        </>
    );
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!'
};

export default memo(Waterproof);
