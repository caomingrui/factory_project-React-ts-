import moment from "_moment@2.29.1@moment";
import {useChangeDoc, useGetTime} from "../../../utils/hooks";
import {useStore} from "../../../store/vueStore/store";
import {mutations, Store} from "../../../store/vueStore";
import {useState} from "react";
import {message} from "antd";

export type Data = {
    time: string,
    type: string,
    sampleName: string
    supplyMarket: string,
    manufacturer: string,
    key: string,
    uuid: string
}

// use 套筒 模板
export function useSleeve() {
    const {state,  changeDoc} = useChangeDoc();
    const [BooleanVal, setBooleanVal] = useState<boolean>(false); // test显示
    const times = useGetTime(2);
    const data = useStore((store: Store) => {
        const { state } = store;
        const { settingData } = state;
        return {
            settingData
        }
    });

    const perform = (values: any) => {
        let da: Partial<Data> = {};
        da.time = moment(values.time).format('YYYY-MM-DD');
        da.type = values.level + values.specification;
        da.sampleName = "直螺纹套筒连接";
        da.supplyMarket = "厂供";
        da.key = "sleeve";
        da.uuid = da.key + times;
        da.manufacturer = data.settingData.manufacturer;
        let testDa = Object.assign(values, da);

        if (BooleanVal) {
            if (values.groupNum <= 1) {
                testDa = Object.assign(data.settingData, testDa);
                changeDoc('sleeve.docx', testDa);
            }
            else {
                let dataList: typeof testDa = {};
                for (let i = 0; i < 3; i++) { //当批量大于500 生成多列
                    Object.keys(testDa).map(res => {
                        if (res == 'groupNum') {
                            dataList['groupNum' + i] = Math.ceil(values.groupNum) > i?"1组": ''; // 组数
                        }
                        else if (res == 'batch') {
                            dataList['batch' + i] = (values.batch - (500 * i)) > 0?(values.batch - (500 * i))>500? 500: (values.batch - (500 * i)): ''; // 批量数
                        }
                        else {
                            dataList[res + i] = Math.ceil(values.groupNum) > i? testDa[res]: "";
                            dataList['id' + i] = Math.ceil(values.groupNum) > i? (i + 1): ''; // 序号
                        }
                    });
                }
                testDa = Object.assign(data.settingData, dataList);
                changeDoc('sleeve.docx', testDa);
            }
        }
        else {
            mutations.addTabelData(testDa);
            message.success('提交成功');
        }
    }

    return {
        state,
        perform,
        setBooleanVal
    }
}
