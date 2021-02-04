import React, {memo, useRef, useState} from "react";
import {Select, Button, Form, Input, DatePicker, message} from 'antd';
import {useBooleans, useChangeDoc, useCreated, useGetTime} from "../../utils/hooks";
import moment from "_moment@2.29.1@moment";
import {mutations, Store} from "../../store/vueStore";
import {useStore} from "../../store/vueStore/store";

// 等级列表
const level: string[] = ['HPB235', 'HPB300', 'HRB335', 'HRB335E', 'HRB400', 'HRB400E', 'HRB500', 'HRB500E'];

// 规格
const size: number[] = [12, 14, 16, 18, 20];

// switch 电渣压力焊 -- ok
const Switch = () => {

    const formTab: any = useRef(null);
    const [BooleanVal, setBooleanVal] = useState<boolean>(false); // test显示
    const {state,  changeDoc} = useChangeDoc();
    const time = useGetTime();
    const data = useStore((store: Store) => {
        const { settingData } = store.state;
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
        let da: typeof values = {};
        da.time = moment(values.time).format('YYYY-MM-DD');
        da.key = "switch";
        da.sampleName = "电渣压力焊";
        da.type = values.level + values.size;
        let testDa = Object.assign(data.settingData, values, da);
        if (BooleanVal) {
            changeDoc('switch.docx', testDa);
        }
        else {
            mutations.addTabelData(testDa);
            message.success('提交成功');
        }
    };

    return (
        <>
            switch 电渣压力焊

            <Form {...layout} ref={ formTab } name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}
                  initialValues={{'groupNum': '1组'}}>
                <Form.Item name={'level'} label="等级" rules={[{ required: true }]}>
                    <Select>
                        {
                            level.map(res =>
                                <Select.Option value={ res } key={ res }>{ res }</Select.Option>
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={'size'} label="规格" rules={[{ required: true }]}>
                    <Select>
                        {
                            size.map(res =>
                                <Select.Option value={ res } key={ res }>{ res }</Select.Option>
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={'useParts'} label="部位" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name={'groupNum'} label="组数" rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name={'batch'} label="批量" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'time'} label="日期" rules={[{ required: true }]}>
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
    )
};

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!'
};

export default memo(Switch);
