import React, {memo, useState} from "react";
import {Table, Switch, Space, Button, DatePicker} from 'antd';
import {useStore} from "../../../store/vueStore/store";
import {mutations, Store} from "../../../store/vueStore";
import DescriptionsList from "../component/Descriptions";
import ModalView from "../component/Modal";
import {useChangeDoc} from "../../../utils/hooks";

const type = [
    {key: 'reinforc', val: '钢筋原料'},
    {key: 'concrete', val: '混泥土'},
    {key: 'mortar', val: '砂浆'},
    {key: 'switch', val: '电渣压力焊'},
    {key: 'sleeve', val: '直螺纹套筒'},
    {key: 'brick', val: '砖'},
    {key: 'waterproof', val: '防水卷材'},
    {key: 'soil', val: '土'},
];

export default memo(() => {
    const data = useStore((store: Store) => {
        const { tabelData, checkTabelData } = store.state;
        return {
            tabelData,
            checkTabelData
        }
    });
    const [tabelData, setTabelData] = useState(data.tabelData);
    const {state,  changeDoc} = useChangeDoc();

    // 过滤
    function filter<T extends []>(data: T, key: string) {
        let arr: any = [];
        data.map((res: any) => {
            if (res.keyName == key) {
                arr.push(res);
            }
        });
        setTabelData([]);
        setTimeout(() => {
            setTabelData(arr);
        }, 200)
    }

    // 处理多列
    const multipleCol = (resInd: any, index: any, da: any, i: number = 0) => {
        console.log(index)
        data.tabelData.map((res: typeof data.tabelData) => {
            if (res.key === resInd) {
                console.log(res);

                Object.keys(res).map(list => {
                    if (i == 0) {
                        console.log('11111111111111111111111111111')
                        if (index == 0) {
                            da[list] = res[list];
                            da['ind0'] = 1;
                            da[list + 1] = "";
                            da[list + 2] = "";
                            da['ind' + 1] = "";
                            da['ind' + 2] = "";
                        }

                        if (index == 1) {
                            da[list + '1'] = res[list];
                            da['ind1'] = 2;
                            da[list + 2] = "";
                            da['ind' + 2] = "";
                        }

                        if (index == 2) {
                            da[list + '2'] = res[list];
                            da['ind2'] = 3;

                        }

                        // if (index <= 2) {
                        //     da[list + (index + 1)] = res[list];
                        //     da['ind' + index] = index + 1;
                        // }
                    }
                    if ( i != 0) {
                        if (index > 2) {
                            console.log('222222222222222222222222222222222')
                            if (index%3 == 0) {
                                da[list] = res[list];
                                da['ind0'] = 1;
                                da['ind1'] = "";
                                da['ind2'] = "";
                                da[list + 1] = "";
                                da[list + 2] = "";
                            }

                            if (index%3 == 1) {
                                da[list + 1] = res[list];
                                da['ind1'] = 2;
                                da[list + 2] = "";
                                da['ind2'] = "";
                            }

                            if (index%3 == 2) {
                                da[list + 2] = res[list];
                                da['ind2'] = 3;
                            }

                            // da[list + (index%3 - 2)] = res[list];
                            // da['ind' + index%3] = index + 1;
                        }
                    }
                });
            }
        });
        return da;
    }

    // 单导出
    const exportData = (): void => {
        const key = data.checkTabelData;
        if (key && key.constructor == Array) {
            let da: any = {};
            let dd: any = {};
            key.map((resInd, index) => {
                const aa = multipleCol(resInd, index, dd);
                if (key.length < 4) {
                    console.log(index)
                    console.log('dddddddddddddddd')
                    const aa = multipleCol(resInd, index, da);
                    if (index == key.length - 1) {
                        data.tabelData.map((res: typeof data.tabelData) => {
                            if (res.key === resInd) {
                                changeDoc(res.keyName + '.docx', aa);
                            }
                        })
                    }
                }
                else {
                    console.log(index)
                    let arr: any[] = [];
                    // ((index + 1)%3 + Math.floor((index + 1)/3))
                    for (let i = 0; i < Math.floor((index)/3) + 1; i++) {
                        console.log(i)
                       let dacmr =  multipleCol(resInd, index, da, i);
                        console.log(dacmr)
                        arr.push(JSON.parse(JSON.stringify(dacmr)));
                        console.log(arr)
                        let list = [...arr, aa];
                        let hash: any = {};

                        const newArr = list.reduceRight((item, next) => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            hash[next.key] ? '' : hash[next.key] = true && item.push(next);
                            return item
                        }, []);
                        console.log(newArr)
                        // if (index == key.length - 1) {
                        //     data.tabelData.map((res: typeof data.tabelData) => {
                        //         if (res.key === resInd) {
                        //             changeDoc(res.keyName + '.docx', arr[i]);
                        //         }
                        //     })
                        // }
                    }
                }
            });
        }
    }

    return (
        <>
         我是查询界面
            <label htmlFor="">查询条件</label>
            <p>类型:
                {
                    type.map(res => <Button key={res.key} onClick={() => filter(data.tabelData, res.key)}>{ res.val }</Button>)
                }
            </p>
            <p>时间: <DatePicker format="YYYY-MM-DD" /></p>
            <button onClick={exportData}>单导出</button>
            <button>多导出</button>
            <TableDa tabelData={ tabelData }/>

        </>
    );
})


const TableDa = ({ tabelData }: any) => {
        const [checkStrictly, setCheckStrictly] = React.useState<boolean>(false);

        const rowSelection = {
            onChange: (selectedRowKeys: any, selectedRows: any) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                if (selectedRows.length > 0) {
                    mutations.addCeckTabel(selectedRowKeys);
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


