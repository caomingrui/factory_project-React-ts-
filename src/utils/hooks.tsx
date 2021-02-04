import {useEffect, useReducer, useRef, useState} from "react";
import {Store} from "../store/vuex";
import {useGlobalData} from "./ContextState";
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import JSZipUtils from 'jszip-utils';


type Callback<T> = (val: T | undefined, oldVal: T | undefined) => T;

// 模拟观察者
export function useWatch<T>(da: T, callback: Callback<T> ) {
    const data = useRef<T>();
    useEffect(() => {
        data.current = da;
    })
    return callback(da, data.current);
}

// 强制组件更新
export const useUpdate = () => {
    const [,setCount] = useReducer(s => s + 1, 0);
    return setCount;
}


const reducer = (state: Store, action: Store): Store => {
    state = action
    return state
}


// Hooks context 共享数据
export const useVuex = () => {
    const { store, useManage } = useGlobalData();
    const [ state, setState ] = useReducer(reducer, store);

    const changeDa = JSON.parse(JSON.stringify( state ));
    return {
        fun: useManage( changeDa, setState ),
        state
    }
}


// 生命周期 初始化
type Callbacks<T> = () => void;
export function useCreated<T>(callback: Callbacks<T>): void {
    const [boolValue, setBoolValue] = useState<boolean>(false);

    useEffect(() => {
        if(boolValue) {
            setBoolValue(false);
            callback && callback();
        }
        setBoolValue(true);
    })
}


// 生命周期 组件挂载 触发一次
export function useMount<T>(callback: Callbacks<T>): void {
    useEffect(() => {
        callback && callback();
    },[])
}


// 生命周期 组件卸载 触发
export function useMounted<T>(callback: Callbacks<T>) {
    useEffect(() => {
        return () => callback && callback();
    },[])
}


// 生命周期 组件依赖跟新
export function useUpdata<T>(depend: T, callback: Callbacks<T>): void {
    const [boolValue, setBoolValue] = useState<boolean>(false);
    const Depend = Array.isArray(depend) ? [...depend] : [depend];

    useEffect(() => {
        if(boolValue) {
            setBoolValue(false);
            callback && callback();
        }
        setBoolValue(true);
    },Depend)
}


//模拟 ahooks useBoolean
type BooleanActions = {
    toggle: (boo: boolean | undefined) => void,
    setTrue: () => void,
    setFalse: () => void,
}

type BooleanBack = [
    state: boolean,
    BooleanActions: BooleanActions
]

export function useBooleans(boo: boolean = false): BooleanBack {
    const [state, setState] = useState<boolean>( boo );

    const toggle = (value: boolean = state) => {
        setState(value);
    }

    const setTrue = () => {
        setState(true);
    }

    const setFalse = () => {
        setState(false);
    }

    return [
        state,
        {
            toggle,
            setTrue,
            setFalse,
        }
    ];
}


// 模拟 Ahooks useClickAway 管理目标元素外点击事件的 Hook。
type TargetArray = [
    arr: string[],
    fn?: () => void,
] | any[]
export function useClickAways<T>(clickAway: MouseEvent | TouchEvent | any, target: string | string [], eventName?: string) {
    const event = eventName || 'click';

    useMount(() => {
        document.addEventListener(event, clickAway);
        console.log(target)
        let Targets: TargetArray = Array.isArray(target) ? target : [target];
        Targets[0].map((res: string) => {
            let dom: any = document.getElementById(res);
            dom.addEventListener(event, (e: any) => {
                e.stopPropagation();
            })
        });
    });

    useMounted(() => {
        document.removeEventListener<any>(event, clickAway);
    });
}


// 导出World
export function useChangeDoc<T>() {
    const [state, setState] = useState<boolean>(false); // 导出状态
    // name 目标文件名称
    // data 待替换字符串
    const changeDoc = (name: string, data: T) => {
        JSZipUtils.getBinaryContent(name, function(error: T, content: number[]) {
            if (error) {
                throw error;
            }
            const zip = new PizZip(content);
            const doc = new Docxtemplater();
            doc.loadZip(zip);
            doc.compile();
            setState(false);
            doc.resolveData(data).then(function () {
                doc.render();
                const out = doc.getZip().generate({
                    type: "blob",
                    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                });
                saveAs(out, name);
                setState(true);
            })
        });
    }
    return {state,  changeDoc};
}

// 获取当前时间
export function useGetTime(format: number = 1) {
    let now = new Date();
    let year: string | number = now.getFullYear(); //得到年份
    let month: string | number = now.getMonth();//得到月份
    let date: string | number = now.getDate();//得到日期
    let hour: string | number = now.getHours();//得到小时
    let minu: string | number = now.getMinutes();//得到分钟
    let sec: string | number = now.getSeconds();//得到秒
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    let time = "";
    //精确到天
    if(format == 1){
        time = year + "-" + month + "-" + date;
    }
    //精确到分
    else if(format == 2){
        time = year + "-" + month + "-" + date+ " " + hour + ":" + minu + ":" + sec;
    }
    return time;
}

// 比较时间差
export function DateDiff(faultDate: string, completeTime: string): number{
    let stime =new Date(faultDate).getTime();
    let etime = new Date(completeTime).getTime();
    let usedTime = etime - stime;  //两个时间戳相差的毫秒数
    let days=Math.floor(usedTime/(24*3600*1000));
    //计算出小时数
    let leave1=usedTime%(24*3600*1000);    //计算天数后剩余的毫秒数
    let hours=Math.floor(leave1/(3600*1000));
    //计算相差分钟数
    let leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
    let minutes=Math.floor(leave2/(60*1000));
    // let time = days + "天"+hours+"时"+minutes+"分";
    let time = days;
    return time;
}
