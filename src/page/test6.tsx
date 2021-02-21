import React, { memo } from "react";
import { useCreated } from "../utils/hooks";
import * as Rx from 'rxjs'
import { of, from, fromEvent } from 'rxjs';
// import Observable from 'rxjs/Observable';
// import 'rxjs/add/observable/fromPromise';

// 入门Rxjs
const Test6 = () => {

    useCreated(() => {
        // const obs = of('foo', 'bar'); // 一个或多值
        // const obs = from([1, 2, 3]); // 数组
        // @ts-ignore
        // const obs = fromEvent(document.querySelector('button'), 'click'); // 事件

        // const obs = Observable.fromPromise((res) => res(1));
        // console.log(obs);
        // obs.subscribe((val: any) => console.log(val), (err: any) => console.log(err), () => console.log('end'))

        // 外部产生新事物
        // let myObserv = new Rx.Subject();
        // myObserv.subscribe(val => console.log(val));
        // myObserv.next('foo');

        // 内部产生新事物
        // let myObserv = Rx.Observable.create(observer => {
        //     observer.next('foo');
        //     observer.next('car');
        //     setTimeout(() => observer.next(123123), 1000);
        // });
        // myObserv.subscribe((val: any) => console.log(val));

        const obs: any = fromEvent(document.querySelector('button'), 'input'); // 事件
        console.log(obs)
        // 过滤掉小于3个字符长度的目标值
        // obs.filter((event: any) => event.target.value.length > 2)
        //     .map((event: any) => event.target.value)
        //     .subscribe((value: any) => console.log(value)); // "hel"
    });

    return (
        <>
            <input className='button'/>
         <p>我是测试test6 -- Rxjs</p>
        </>
    );
}

export default memo(Test6);
