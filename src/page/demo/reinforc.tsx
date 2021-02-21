import React, {memo, useRef} from "react";
import {Select, Button, Form, Input, DatePicker, message} from 'antd';
import { useCreated, useGetTime } from "../../utils/hooks";
import moment from 'moment'
import {useStore} from "../../store/vueStore/store";
import {mutations, Store} from "../../store/vueStore";

// 试样名称
const sampleName = ['钢筋混凝土用钢热轧带肋钢筋', '钢筋混凝土用钢热轧光圆钢筋'];
// 牌号
const brand = ['HPB235', 'HPB300', 'HRB335', 'HRB335E', 'HRB400', 'HRB400E', 'HRB500', 'HRB500E'];
// 规格
const specifications = ['11', '6', '8', '10', '12', '14', '16', '18', '20', '22', '25', '28', '32', '35'];

// 钢筋原料
const Reinforc = () => {
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
        da.type = values.brand + values.specifications;
        da.groupNum = "1组";
        da.keyName = "reinforc";
        da.key = "reinforc" + times;
        let testDa = Object.assign(data.settingData, values,  da);

        mutations.addTabelData(testDa);
        message.success('提交成功');
    };


    return (
        <div>
            钢筋原料

            <Form {...layout} ref={ formTab } name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>

                <Form.Item name={'sampleName'} label="试样名称" rules={[{ required: true }]}>
                    <Select>
                        {
                            sampleName.map(res => <Select.Option value={ res } key={ res }>{ res }</Select.Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item name={'brand'} label="牌号" rules={[{ required: true }]}>
                    <Select>
                        {
                            brand.map(res => <Select.Option value={ res } key={ res }>{ res }</Select.Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item name={'specifications'} label="规格" rules={[{ required: true }]}>
                    <Select>
                        {
                            specifications.map(res => <Select.Option value={ res } key={ res }>{ res }</Select.Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={'productionBatchNum'} label="出厂批号" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'manufacturer'} label="生产厂家" rules={[{ required: true }]}>
                    <Select>
                        { data.settingData.manufacturer.map((res: number| string) => <Select.Option value={ res } key={ res }>{ res }</Select.Option>) }
                    </Select>
                </Form.Item>
                <Form.Item name={'supplyMarketingUnits'} label="供销单位" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name={'time'} label="进场日期" rules={[{ required: true }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item name={'useParts'} label="部位" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'batch'} label="批量" rules={[{ required: true }]}>
                    <Input/>
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

export default memo(Reinforc);
