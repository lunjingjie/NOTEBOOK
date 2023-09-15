import React, { useEffect, useState } from 'react';
import { ListParams } from '../../types/list/list';
import { CardWrap } from '../../components/styles/CardWrap';
import { Button, Input, Space, Table, Tooltip } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { DataType } from './dataType';
import { getBasinListApi } from '../../api/basin/basin';

const BasicManage: React.FC = () => {
  const [fieldValue, setFieldValue] = useState<ListParams>({
    current: 1,
    pageSize: 5,
  });

  useEffect(() => {
    getBasinList();
  }, []);

  const getBasinList = async () => {
    const { data } = await getBasinListApi(fieldValue);
    setDataSource(data.data.records);
  };

  const resolveNull = (value: string | number) => {
    if (value === null) {
      return '--';
    }
    return value;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '流域名称',
      dataIndex: 'basinName',
      key: 'basinName',
      align: 'center',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      align: 'center',
      render: (_, record) => (
        <span>{resolveNull(record.remarks)}</span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">编辑</Button>
          <Button type="link">删除</Button>
        </Space>
      ),
    },
  ];

  const [dataSource, setDataSource] = useState<DataType[]>([]);

  // getBasinList();

  return (
    <>
      <CardWrap>
        <Space>
          <span>流域名称</span>
          <Input placeholder="流域名称：" style={{ width: 200 }} />
          <Tooltip title="查询">
            <Button type="primary" icon={<SearchOutlined />} onClick={getBasinList} />
          </Tooltip>
          <Tooltip title="新增">
            <Button type="primary" style={{ backgroundColor: 'green' }} icon={<PlusOutlined />} />
          </Tooltip>
        </Space>
      </CardWrap>
      <CardWrap>
        <Table size="small" bordered columns={columns} dataSource={dataSource} rowKey="basinId"/>
      </CardWrap>
    </>
  );
};

export default React.memo(BasicManage);
