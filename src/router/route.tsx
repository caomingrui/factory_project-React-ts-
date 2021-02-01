import React, {ReactNode} from 'react';
import { Redirect } from 'react-router-dom';

export type Routes =  {
    path: string,
    exact?: boolean,
    name?: string,
    component: ReactNode,
    children?: Routes[] | ReactNode
}

const routes: Routes[] = [
    {
        path: '/', exact: true, component: () => <Redirect from="/*" to="/Home" />, children: [],
    },
    {
        path: '/test', exact: true, component: React.lazy(() => import('../page/test/index')), children: [], // Hoc 模式练习
    },
    {
        path: '/Home', component: React.lazy(() => import('../page/demo/index')), children: [
            {
                path: '/Home/reinforc', name: '钢筋原料', component: React.lazy(() => import('../page/demo/reinforc')),
            },
            {
                path: '/Home/concrete', name: '混泥土', component: React.lazy(() => import('../page/demo/concrete')),
            },
            {
                path: '/Home/mortar', name: '砂浆', component: React.lazy(() => import('../page/demo/mortar')),
            },
            {
                path: '/Home/switch', name: '电渣压力焊', component: React.lazy(() => import('../page/demo/switch')),
            },
            {
                path: '/Home/sleeve', name: '直螺纹套筒', component: React.lazy(() => import('../page/demo/sleeve')),
            },
            {
                path: '/Home/brick', name: '砖', component: React.lazy(() => import('../page/demo/brick')),
            },
            {
                path: '/Home/waterproof', name: '防水卷材', component: React.lazy(() => import('../page/demo/waterproof')),
            },
            {
                path: '/Home/soil', name: '土', component: React.lazy(() => import('../page/demo/soil/index')),
            },
            {
                path: '/Home/query', name: '查询', component: React.lazy(() => import('../page/demo/query/index')),
            },
            {
                path: '/Home/setting', name: '设置', component: React.lazy(() => import('../page/demo/setting/index')),
            },
        ]
    }
];

export const isState = false;

export default routes;



