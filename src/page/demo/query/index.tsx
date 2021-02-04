import React, {memo, useState} from "react";
import {Table, Switch, Space, Button, DatePicker} from 'antd';
import {useStore} from "../../../store/vueStore/store";
import {mutations, Store} from "../../../store/vueStore";
import DescriptionsList from "../component/Descriptions";
import TableDa from "../component/tabel";
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
    function multipleCol<T> (resInd: any, index: number, da: any, i: number = 0) {
        data.tabelData.map((res: typeof data.tabelData) => {
            if (res.key === resInd.key) {

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
        console.log(key)
        Object.keys(key).map((res, ind) => {

            let da: any = {};
            let dd: any = {};
            if (key && key[res].constructor == Array) {
                // 获取名称
                let documentName = res;
                key[res].map((resInd: any, index: number) => {
                    console.log(index)
                    // 第一份数据
                    const firstData = multipleCol(resInd, index, dd);

                    // 数据小于 3的时候
                    if (key[res].length < 4) {
                        // if (Object.keys(key).length > 1) {

                            console.log(documentName, index)
                            const data = multipleCol(resInd, index, da);

                            if (index == key[res].length - 1) {
                                console.log(data)
                                changeDoc( documentName + '.docx', data);
                            }
                        // }
                        // else {
                        //     if (index == key[res].length - 1) {
                        //         console.log(resInd)
                        //         const data = multipleCol(resInd, index, da);
                        //         console.log(data)
                        //         console.log(documentName, index)
                        //         // changeDoc( documentName + '.docx', data);
                        //     }
                        // }
                    }
                    // 反之多张数据
                    else {
                        let newArr;
                        let arr: any[] = [];
                        // ((index + 1)%3 + Math.floor((index + 1)/3))
                        // 判断导出几次
                        for (let i = 0; i < Math.floor((index) / 3) + 1; i++) {
                            // 获取每次循环拿到的数据
                            let dacmr = multipleCol(resInd, index, da, i);

                            arr.push(JSON.parse(JSON.stringify(dacmr)));
                            console.log(arr)
                            // 存在一个问题 第一次数据不准确， 所以直接那现成的拼凑，存在重复数据
                            let list = [...arr, firstData];
                            console.log(list)
                            let hash: any = {};

                            // 去除重复数据
                            newArr = list.reduceRight((item, next) => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                hash[next.key] ? '' : hash[next.key] = true && item.push(next);
                                return item
                            }, []);
                        }

                        console.log(newArr)
                        // 当外层循环执行完时触发 --- 防止多次触发
                        if (index == key[res].length - 1) {
                            newArr.map((res: any) => {
                                changeDoc(documentName + '.docx', res);
                            });
                        }
                    }
                });
            }
        });
        // if (key && key.constructor == Array) {
        //     let da: any = {};
        //     let dd: any = {};
        //     let documentName: string[] = [];
        //     key.map((resInd, index) => {
        //         // 第一份数据
        //         const firstData = multipleCol(resInd, index, dd);
        //
        //         // 遍历数据获取名称
        //         data.tabelData.map((res: typeof data.tabelData) => {
        //             if (res.key === resInd) {
        //                 documentName.push(res.keyName)
        //                 // documentName = res.keyName;
        //             }
        //         })
        //
        //         // 数据小于 3的时候
        //         if (key.length < 4) {
        //             if (index == key.length - 1) {
        //                 const data = multipleCol(resInd, index, da);
        //                 console.log(documentName)
        //                 // changeDoc( documentName + '.docx', data);
        //             }
        //         }
        //         // 反之多张数据
        //         else {
        //             let newArr;
        //             let arr: any[] = [];
        //             // ((index + 1)%3 + Math.floor((index + 1)/3))
        //             // 判断导出几次
        //             for (let i = 0; i < Math.floor((index) / 3) + 1; i++) {
        //                 // 获取每次循环拿到的数据
        //                 let dacmr = multipleCol(resInd, index, da, i);
        //
        //                 arr.push(JSON.parse(JSON.stringify(dacmr)));
        //                 console.log(arr)
        //                 // 存在一个问题 第一次数据不准确， 所以直接那现成的拼凑，存在重复数据
        //                 let list = [...arr, firstData];
        //                 console.log(list)
        //                 let hash: any = {};
        //
        //                 // 去除重复数据
        //                 newArr = list.reduceRight((item, next) => {
        //                     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        //                     hash[next.key] ? '' : hash[next.key] = true && item.push(next);
        //                     return item
        //                 }, []);
        //             }
        //
        //             console.log(newArr)
        //             // 当外层循环执行完时触发 --- 防止多次触发
        //             if (index == key.length - 1) {
        //                 newArr.map((res: any) => {
        //                     changeDoc(documentName + '.docx', res);
        //                 });
        //             }
        //         }
        //     });
        // }
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
