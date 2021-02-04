import React, { useState, memo } from 'react';
import {Modal, Button, Space} from 'antd';

const ModalView = ({ children }: any) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Space size="middle">
                <a onClick={showModal}>view</a>
            </Space>
            <Modal title="详细" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={ '80%' }>
                { children }
            </Modal>
        </>
    );
};

export default memo(ModalView);
