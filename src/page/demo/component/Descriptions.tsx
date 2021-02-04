import { Descriptions } from 'antd';
import { memo } from "react";

type Props = {
    title: string,
    dataList: any
};
const DescriptionsList = ({ title, dataList }: Props) => {

    return (
        <Descriptions title={ title }>
            {
                Object.keys(dataList).map(res =>
                    <Descriptions.Item label={ res } key={ res }>{ dataList[res] }</Descriptions.Item>
                )
            }
        </Descriptions>
    );
}

export default memo(DescriptionsList);
