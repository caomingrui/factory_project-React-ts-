import { reactive } from "@vue/reactivity";

//测试 count ++
const changeCount = (): void => {
    state.count += 1;
}

// 保存setting 数据
const changeSetting = (states: any) => {
    console.log(states)
    state.settingData = states;
}

// vue3.0特性 + react 测试版 1.0.0
export interface State {
    count: number,
    settingData: any
}

// store 数据
const state: State = reactive({
    count: 0,
    settingData: JSON.parse(<string>localStorage.getItem('setData'))?JSON.parse(<string>localStorage.getItem('setData')): {}
});


// 方法集
export const mutations = {
    changeCount,
    changeSetting
}


export const store = {
    state
}

export type Store = typeof store;
