import React, {memo} from "react";
import {mutations, StatesData} from "../../../store/vueStore";
import {Space, Switch, Table} from "antd";
import ModalView from "./Modal";
import DescriptionsList from "./Descriptions";

const TableDa = ({ tabel }: any) => {
    const [tabelData, setTabelData] = tabel;
    const [checkStrictly, setCheckStrictly] = React.useState<boolean>(false);

    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: StatesData) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            if (selectedRows.length > 0) {

                const arrDataList = selectedRows.reduce((total: any, val: StatesData) => {
                    if (val.keyName === "waterproof") {
                        BlockSort(total, val, 10000);
                    }
                    else if (val.keyName === "switch") {
                        BlockSort(total, val, 300);
                    }
                    else if (val.keyName === "sleeve") {
                        BlockSort(total, val, 500);
                    }
                    else if (val.keyName === "mortar") {
                        if (val.sampleName == "干混砌筑砂浆") {
                            BlockSort(total, val, 100);
                        }
                        else {
                            BlockSort(total, val, 50);
                        }
                    }
                    else if (val.keyName === "reinforc") {
                        BlockSort(total, val, 60);
                    }
                    else {
                        total[val.keyName].push(val);
                    }
                    return total;
                }, {
                    concrete: [],
                    brick: [],
                    waterproof: [],
                    switch: [],
                    sleeve: [],
                    mortar: [],
                    ringKnife: [],
                    plainSoil: [],
                    dust: [],
                    reinforc: []
                })

                const objData: any = {};
                Object.keys(arrDataList).map(res => {
                    if (arrDataList[res].length > 0) {
                        objData[res] = arrDataList[res];
                    }
                });
                mutations.addCeckTabel(objData);
            }
            else {
                mutations.addCeckTabel("");
            }
        }
    };

    const deleteRows = (key: string) => {
        let arr = tabelData;
        let newArr: typeof tabelData = [];
        arr.map((res: typeof tabelData) => {
            if (res.key !== key) {
                newArr.push(res);
            }
        });
        setTabelData(newArr);
        mutations.deleteFormData(newArr)
    }

    const columns = [
        {
            title: 'Type',
            dataIndex: 'key',
            key: 'key',
            render: (text: string) => <a>{text.slice(0, text.length - 19)}</a>,
            // render: (text: string) => <a>{text}</a>,
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
            render: (text: string, record: StatesData) => (
                <>
                    <ModalView>
                        <DescriptionsList title={ record.name } dataList={ record }></DescriptionsList>
                    </ModalView>
                    <Space size="middle">
                        <a style={{marginLeft: "10px"}}>change</a>
                        <a onClick={() => deleteRows(record.key)}>delete</a>
                    </Space>
                </>
            ),
        },
    ];

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

// 根据批量生成下一组
const BlockSort = (total: any, val: StatesData, num: number) => {

    let ind = total[val.keyName].length;
    const batch = val.batch;
    if (batch > num) {
        for (let i = 0; i <= Math.floor(batch/num); i++) {
            let obj: any = {};
            Object.keys(val).map(res => {
                obj[res] = val[res];
                obj['index'] = ind + i;
                obj['batch'] = batch - (num * i) > num? num : batch - (num * i)
            });
            total[val.keyName].push(obj);
        }
    }
    else {
        val.index = Math.abs( ind );
        total[val.keyName].push(JSON.parse(JSON.stringify(val)));
    }

}

export default memo(TableDa);
