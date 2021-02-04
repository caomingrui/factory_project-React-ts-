import React, {memo} from "react";
import {mutations} from "../../../store/vueStore";
import {Space, Switch, Table} from "antd";
import ModalView from "./Modal";
import DescriptionsList from "./Descriptions";

const TableDa = ({ tabelData }: any) => {
    const [checkStrictly, setCheckStrictly] = React.useState<boolean>(false);

    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            if (selectedRows.length > 0) {
                console.log(selectedRows)
                const arrDataList = selectedRows.reduce((total: any, val: any, index: any) => {
                    total[val.keyName].push(val)
                    return total;
                }, {
                    concrete: [],
                    brick: [],
                })
                console.log(arrDataList);
                const objData: any = {};
                Object.keys(arrDataList).map(res => {
                    if (arrDataList[res].length > 0) {
                        objData[res] = arrDataList[res];
                    }
                });
                console.log(objData)
                // mutations.addCeckTabel(selectedRowKeys);
                // 修改分类
                mutations.addCeckTabel(objData);
            }
            else {
                mutations.addCeckTabel("");
            }
        },
        onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
            console.log(selected, selectedRows, changeRows);
        },
    };

    return (
        <>
            <Space align="center" style={{ marginBottom: 16 }}>
                CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
            </Space>
            <Table
                columns={columns}
                rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={tabelData}
            />
        </>
    );
}

const columns = [
    {
        title: 'Type',
        dataIndex: 'key',
        key: 'key',
        // render: (text: string) => <a>{text.slice(0, text.length - 19)}</a>,
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: '试样名称',
        dataIndex: 'sampleName',
        key: 'sampleName',
    },
    {
        title: '型号规格',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '生产厂家',
        dataIndex: 'manufacturer',
        key: 'manufacturer',
    },
    {
        title: '供销单位',
        dataIndex: 'supplyMarket',
        key: 'supplyMarket',
    },
    {
        title: '使用部位',
        dataIndex: 'useParts',
        key: 'useParts',
    },
    {
        title: '取（制）样数量',
        dataIndex: 'groupNum',
        key: 'groupNum',
    },
    {
        title: '代表批量',
        dataIndex: 'batch',
        key: 'batch',
    },
    {
        title: '养护条件',
        dataIndex: 'maintenance',
        key: 'maintenance',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text: any, record: any) => (
            <>
                <ModalView>
                    <DescriptionsList title={ record.name } dataList={ record }></DescriptionsList>
                </ModalView>
                <Space size="middle">
                    <a>Delete</a>
                </Space>
            </>
        ),
    },
];

export default memo(TableDa);