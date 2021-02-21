import React, {memo, useRef, useState} from 'react';
import {Button, Form, Input, message} from "antd";
import styled from "styled-components";
import {useCreated, useUpdate} from "../../../utils/hooks";
import {mutations, Store} from "../../../store/vueStore";
import {useStore} from "../../../store/vueStore/store";

const LayoutStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

type TabelType = {
    manufacturer: string
}

const CustomSetting = () => {
    const formTab: any = useRef(null);
    const [manufacturerDa, setManufacturerDa] = useState<string | number>();// 生产厂家追加数据

    const updateTem = useUpdate();
    const data = useStore((store: Store) => {
        const { state } = store;
        const { settingData } = state;
        return {
            settingData
        }
    });
    const [manufacturerTotalDa, setManufacturerTotalDa] = useState(data.settingData.manufacturer || []);// 生产厂家总数据
    useCreated(() => {
        if (formTab != null) {

        }
        formTab.current.setFieldsValue({manufacturer: data.settingData.manufacturer})
    });


    const manufacturerInput = (e: any) => {
        console.log(e.target.value);
        setManufacturerDa(e.target.value);
    }

    const onFinish = (values: TabelType) => {
        console.log(values);
        let dataValue = Object.assign(data.settingData, values)
        console.log(dataValue)
        mutations.changeSetting(dataValue);
        localStorage.setItem('setData', JSON.stringify(dataValue));
        message.success('修改成功');
    }

    const addManufacturer = () => {
        console.log(manufacturerDa)
        // @ts-ignore
        if (manufacturerTotalDa.includes(manufacturerDa)) {
            console.log("存在")
        }
        else {
            let arr: any = manufacturerTotalDa;
            arr.push(manufacturerDa);
            setManufacturerTotalDa(arr);
            console.log(manufacturerTotalDa)
            updateTem();
            formTab.current.setFieldsValue({manufacturer: manufacturerTotalDa})
        }
    }

    const deleteManufacturer = (da: any) => {
        const arr = manufacturerTotalDa;
        const index = manufacturerTotalDa.indexOf(da);
        arr.splice(index, 1);
        console.log(arr)
        setManufacturerTotalDa(arr);
        formTab.current.setFieldsValue({manufacturer: arr})
        updateTem();
    }

    return (
        <LayoutStyle>
            <div>
                <Form {...layout} ref={ formTab } name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={'manufacturer'} label="生产厂家" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div>
                <p>
                    生成厂家：<Input onInput={manufacturerInput}></Input> <button onClick={addManufacturer}>添加</button>
                </p>
                <div>
                    {
                        manufacturerTotalDa.map((res: any) => {
                            return (
                                <span key={res}>
                                    <span>==={ res }=== <button onClick={() => deleteManufacturer(res)}>删除</button> </span>
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        </LayoutStyle>
    );
}

export default memo(CustomSetting);

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};

const validateMessages = {
    required: '${label} is required!'
};

