import React, { memo } from "react";
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import {Link } from 'react-router-dom';
import {renderRoutes} from "react-router-config";
import { Routes } from '../../router/route';

const { Header, Content, Footer } = Layout;


const Home: React.FC = ({ route }: Routes | any) => {
    return (
        <BackLayout route={ route.children }>
            {renderRoutes(route.children)}
        </BackLayout>
    );
}

const BackLayout = ({ children, route }: any) => {
    return (
        <Layout style={{ height: '100%' }}>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    {
                        route.map((res: Routes, ind: number) => {
                            return (
                                <Menu.Item key={ind}>
                                    <Link to={`${ res.path }`}>{ res.name }</Link>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, height: '100%' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: '80%'}}>
                    { children }
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
}

export default memo(Home);
