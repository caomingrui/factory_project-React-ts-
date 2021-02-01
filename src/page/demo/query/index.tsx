import React, { memo } from "react";
import {Table, Button, DatePicker} from 'antd';

const type = [
    {key: '', val: '钢筋原料'},
    {key: '', val: '混泥土'},
    {key: '', val: '砂浆'},
    {key: '', val: '电渣压力焊'},
    {key: '', val: '直螺纹套筒'},
    {key: '', val: '砖'},
    {key: '', val: '防水卷材'},
    {key: '', val: '土'},
];

export default memo(() => {

    return (
        <>
         我是查询界面
            <label htmlFor="">查询条件</label>
            <p>类型:
                {
                    type.map(res => <Button key={res.val}>{ res.val }</Button>)
                }
            </p>
            <p>时间: <DatePicker format="YYYY-MM-DD" /></p>
            <button>导出</button>
            <App></App>
        </>
    );
})


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const data: any[] = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}


class App extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
    };

    onSelectChange = (selectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                Table.SELECTION_NONE,
                {
                    key: 'odd',
                    text: 'Select Odd Row',
                    onSelect: (changableRowKeys: any) => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key: any, index: any) => {
                            if (index % 2 !== 0) {
                                return false;
                            }
                            return true;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
                {
                    key: 'even',
                    text: 'Select Even Row',
                    onSelect: (changableRowKeys: any) => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key: any, index: any) => {
                            if (index % 2 !== 0) {
                                return true;
                            }
                            return false;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
            ],
        };
        return <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
    }
}
