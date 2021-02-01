import React, {memo, useState} from "react";
import { useChangeDoc } from '../utils/hooks';

const TestDoc = () => {
    const {state,  changeDoc} = useChangeDoc();

    function changeName() {
        changeDoc('a.docx', {name: 'rui'});
    }

    return (
        <>
            <button onClick={changeName}>测试</button>
            <p>{state==false?'false': 'true'}</p>
            <p>我是测试test6 -- Rxjs</p>
        </>
    );
}

export default memo(TestDoc);
