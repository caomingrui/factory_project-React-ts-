import React, {memo, useState} from "react";
import {Button, DatePicker, Input} from 'antd';
import {useStore} from "../../../store/vueStore/store";
import {Store} from "../../../store/vueStore";
import TableDa from "../component/tabel";
import { useQueryEvent } from "../hooks/queryEvent";
import {useChangeDoc} from "../../../utils/hooks";
import moment from "_moment@2.29.1@moment";

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
    const { multipleCol, dealWithWater } = useQueryEvent();
    // 筛选时间
    const [timeVal, setTimeVal] = useState<any>();
    // 筛选部位
    const [partsVal, setPartsVal] = useState<string>();
    // 过滤
    function filter<T extends []>(data: T, key: string) {
        // 清空筛选条件
        setTimeVal(null);
        setPartsVal('');
        // timeRef.current.props.onChange();
        let arr: any = [];
        data.map((res: any) => {
            if (res.keyName === key) {
                arr.push(res);
            }
        });
        setTabelData([]);
        setTimeout(() => {
            setTabelData(arr);
        }, 200)
    }

    // 单导出
    const exportData = (): void => {
        const key = data.checkTabelData;
        console.log(key)
        Object.keys(key).map((res, ind) => {

            let da: typeof data.tabelData = {};  // 导出数据存储
            let dd: typeof data.tabelData = {}; // 第一份数据存储
            if (key && key[res].constructor == Array) {
                // 获取名称
                let documentName = res;
                key[res].map((resInd: any, index: number) => {

                    // 第一份数据
                    // const firstData = multipleCol(resInd, index, dd);
                    let firstData;
                    // 当类型为waterproof处理
                    if (documentName === "waterproof" || documentName === "switch" || documentName === "sleeve" || documentName === "mortar") {
                        console.log('------- 执行 -------', key[res].length)
                        firstData = dealWithWater(resInd, resInd.index, dd, 0 );
                        console.log(firstData)
                    }
                    else {
                        firstData = multipleCol(resInd, index, dd);
                    }

                    // 数据小于 3的时候 一份维拓
                    if (key[res].length < 4) {

                        console.log(documentName, resInd.index);
                        let data;
                        if (documentName === "waterproof" || documentName === "switch" || documentName === "sleeve" || documentName === "mortar") {
                            console.log('????')
                            data = dealWithWater(resInd, resInd.index, da, 0 );
                        }
                        else {
                            data = multipleCol(resInd, index, da);
                        }

                        // 当外层循环执行完时触发 --- 防止多次触发
                        if (index == key[res].length - 1) {
                            // 导出
                            console.log(data)
                            changeDoc( documentName + '.docx', data);
                        }
                    }
                    // 反之多张数据
                    else {
                        let newArr;
                        let arr: any[] = [];
                        // 判断导出几次
                        for (let i = 0; i < Math.floor((index) / 3) + 1; i++) {
                            // 获取每次循环拿到的数据
                            // let dacmr = multipleCol(resInd, index, da, i);

                            // 当类型为waterproof处理
                            let dacmr;
                            if (documentName === "waterproof" || documentName === "switch" || documentName === "sleeve" || documentName === "mortar") {
                                console.log('????', resInd.index)
                                dacmr = dealWithWater(resInd, resInd.index, da, i);
                                console.log(dacmr)
                            }
                            else {
                                dacmr = multipleCol(resInd, index, da, i);
                            }

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
                                console.log(res)
                                changeDoc(documentName + '.docx', res);
                            });
                        }
                    }
                });
            }
        });
    }

    // 筛选时间
    function screenTime<T>(date: T, dateString: string) {
        let tim = moment(dateString);
        setTimeVal(tim);
        let arr: typeof tabelData = [];
        const checkTime = dateString;
        tabelData.map((res: any ) => {
            if (res.time == checkTime) {
                console.log(res)
                arr.push(res);
            }
        });
        setTabelData([]);
        setTimeout(() => {
            setTabelData(arr);
        }, 200)
    }

    // 筛选部位
    function screeningParts<T>({ target }: any) {
        const val: string = target.value;
        setPartsVal(val);

        let arr: typeof tabelData = [];
        tabelData.map((res: any ) => {
            if (res.useParts == val) {
                console.log(res);
                arr.push(res);
            }
        });

        setTabelData([]);
        setTimeout(() => {
            setTabelData(arr);
        }, 200)
    }

    return (
        <>
         我是查询界面
            <label htmlFor="">查询条件</label>
            <p>类型:
                {
                    type.map(res => <Button key={res.key} onClick={() => filter(data.tabelData, res.key)}>{ res.val }</Button>)
                }
                <Button onClick={ () => setTabelData(data.tabelData)}>全部</Button>
            </p>
            <p>时间: <DatePicker format="YYYY-MM-DD" onChange={screenTime} value={timeVal} /></p>
            <p>部位: <Input onChange={screeningParts} value={partsVal} /></p>
            <button onClick={exportData} >单导出</button>
            <button>多导出</button>
            <TableDa tabel={ [tabelData, setTabelData] } />
        </>
    );
});

