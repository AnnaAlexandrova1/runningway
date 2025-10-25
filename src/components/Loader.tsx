// @ts-ignore
import React from 'react';
import { Flex, Spin } from 'antd';

const Loader = () => {
    return (
        <Flex align="center" gap="middle" justify="center" style={{ height: '300px' }}>
            <Spin size="large" />
        </Flex>
    )
}

export default Loader;