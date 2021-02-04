import React, {memo, useRef, useState} from "react";
import {Select, Button, Form, Input, DatePicker, message} from 'antd';
import {useChangeDoc, useCreated, useGetTime} from "../../utils/hooks";
import moment from "_moment@2.29.1@moment";
import {useStore} from "../../store/vueStore/store";
import {mutations, Store} from "../../store/vueStore";

// 名称类别
const category: string[] = ["烧结砖空心砖", "烧结多孔砖", "烧结普通砖",
    "承重混凝土多孔砖", "混凝土普通砖", "混凝土实心砖", "蒸汽加压混凝土砌块", "普通混凝土小型空心砌块"];

type ConcreteData = {
    time: string,
    samplingDate: string,
    monitor: string,
    accordingTo: string,
    sampleName: string,
    type: string,
    keyName: string,
    key: string
}

// brick 砖
const Concrete = () => {
    const [ levelIntensity, setLevelIntensity ] = useState<string[]>([]);// 等级

    const formTab: any = useRef(null);
    const time = useGetTime();
    const times = useGetTime(2);
    const {state,  changeDoc} = useChangeDoc();
    const [BooleanVal, setBooleanVal] = useState<boolean>(false); // test显示
    const data = useStore((store: Store) => {
        const { state } = store;
        const { settingData } = state;
        return {
            settingData
        }
    });

    useCreated(() => {
        if (formTab != null) {
            formTab.current.setFieldsValue({time: moment(time)});
        }}
    );

    const onFinish = (values: any) => {
        console.log(values);
        let da: Partial<ConcreteData> = {};
        da.time = moment(values.time).format('YYYY-MM-DD');
        da.samplingDate = moment(values.samplingDate).format('YYYY-MM-DD');
        da.monitor = values.category == "蒸汽加压混凝土砌块"?"抗压强度、干密度": "抗压强度";
        da.accordingTo = getAccordingTo(values.category);
        da.sampleName = values.category;
        da.type = values.strength + values.spec;
        da.keyName = "brick";
        da.key = "brick" + times;
        let testDa = Object.assign(data.settingData, values,  da);
        if (BooleanVal) {
            changeDoc('brick.docx', testDa);
        }
        else {
            mutations.addTabelData(testDa);
            message.success('提交成功');
        }
    };

    // 获取检验依据
    const getAccordingTo = (values: string): string | undefined => {
        let accordingTo;
        if (values == '烧结空心砖') {
            accordingTo = "GB 13545-2014";
        }
        else if (values == '称重混凝土多孔砖') {
            accordingTo = "GB 25779-2010";
        }
        else if (values == '混凝土普通砖') {
            accordingTo = "NY/T 671-2003";
        }
        else if (values == '混凝土实心砖') {
            accordingTo = "GB/T 21144-2007";
        }
        else if (values == '烧结多孔砖') {
            accordingTo = "GB 13544-2011";
        }
        else if (values == '烧结普通砖') {
            accordingTo = "GB/T 5101-2017";
        }
        else if (values == '蒸汽加压混凝土砌块') {
            accordingTo = "GB 11968-2006";
        }
        else if (values == '普通混凝土小型空心砌块') {
            accordingTo = "GB/T 8239-2014";
        }
        return accordingTo;
    }

    const categoryCheck = () => {
        const value: string = formTab.current.getFieldValue("category");
        formTab.current.setFieldsValue({spec: ''});
        if (value != undefined) {
            setLevelIntensity([]);
            if (value == "烧结砖空心砖") {
                setLevelIntensity(['MU3.5', 'MU5.0', 'MU7.5', 'MU10']);
            }
            else if (value == "烧结多孔砖" || value == "烧结普通砖") {
                setLevelIntensity(['MU10', 'MU15', 'MU20', 'MU25', 'MU30']);
            }
            else if (value == "承重混凝土多孔砖" || value == "混凝土普通砖" || value == "混凝土实心砖") {
                setLevelIntensity(['MU15', 'MU20', 'MU25']);
            }
            else if (value == "蒸汽加压混凝土砌块") {
                setLevelIntensity(['A1.0', 'A2.0', 'A2.5', 'A3.5', 'A5.0', 'A7.5', 'A10.0','等级为B03', 'B04', 'B05', 'B06', 'B07','B08']);
            }
            else {
                setLevelIntensity(['MU3.5', 'MU5.0', 'MU7.5', 'MU10.0', 'MU15.0', 'MU20.0']);
            }
        }
    }

    return (
        <>
            brick 砖

            <Form {...layout} ref={ formTab } name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}
                  initialValues={{'supplyMarket': '厂家', 'manufacturer': data.settingData.manufacturer, "batch": "1万块", "groupNum": "10块",
                      "category": "123", "strength": 'asd', "spec": '0000', "useParts": '123123'
                  }}>
                <Form.Item name={'category'} label="类别" rules={[{ required: true }]}>
                    <Select onClick={ categoryCheck }>
                        {
                            category.map(res =>
                                <Select.Option value={ res } key={ res }>{ res }</Select.Option>
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={'strength'} label="强度" rules={[{ required: true }]}>
                    <Select>
                        {
                            levelIntensity.map(res =>
                                <Select.Option value={ res } key={ res }>{ res }</Select.Option>
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={'spec'} label="规格" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'manufacturer'} label="生产场地" rules={[{ required: true }]}>
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
                    <Input disabled/>
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

export default memo(Concrete);
