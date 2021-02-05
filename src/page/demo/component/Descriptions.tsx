import { Descriptions } from 'antd';
import { memo } from "react";

type Props = {
    title: string,
    dataList: any
};
const DescriptionsList = ({ title, dataList }: Props) => {

    return (
        <Descriptions title={ title }>
            {
                Object.keys(dataList).map(res =>
                        <Descriptions.Item label={ detailsDataKey[res] } key={ res }>{ dataList[res] }</Descriptions.Item>
                   )
            }
        </Descriptions>
    );
}

export default memo(DescriptionsList);

const detailsDataKey: any = {
    buildUnit: "建设单位",
    projectName: "工程名称",
    entrustUnit: "委托单位",
    monitorUnit: "监测单位",
    constructionUnit: "施工单位",
    supervisionUnit: "监理单位",
    peopleDirect: "送样人",
    operator: "试验员",
    qualifiedNum: "考核合格证号",
    manufacturer: "生产厂家",
    contentIs: "内容和对情况",
    witnessPerson: "见证人员",
    category: "类别",
    strength: "强度",
    spec: "规格",
    supplyMarket: "供销",
    time: "当前时间|进厂日期",
    useParts: "使用部位",
    batch: "代表批量",
    groupNum: "取（制）样数量",
    samplingDate: "取样日期",
    monitor: "监测单位",
    sampleName: "试样名称",
    type: "型号、规格、等级、牌号",
    keyName: "类型",
    key: "id",
}
