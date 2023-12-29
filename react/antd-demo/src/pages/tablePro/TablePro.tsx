import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';
import { getBasinListApi } from '../../api/basin/basin';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type TableColumnItem = {
  basinName: string;
  basinId: string;
  basinSort: number;
};

const columns: ProColumns<TableColumnItem>[] = [
  {
    dataIndex: 'index',
    key: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '流域名称',
    dataIndex: 'basinName',
    key: 'basinName',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    disable: true,
    title: '排序',
    key: 'sort',
    dataIndex: 'basinSort',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <Button
        key={`edit${record.basinId}`}
        onClick={() => {
          action?.startEditable?.(record.basinId);
        }}
      >
        编辑
      </Button>,
      <Button key={`del${record.basinId}`}>删除</Button>,
    ],
  },
];

const TablePro = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<TableColumnItem>
      style={{ margin: 10 }}
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        const { data } = await getBasinListApi({
          current: 1,
          pageSize: 10,
        });
        return {
          data: data.data.records,
          // success 请返回 true，
          // 不然 table 会停止解析数据，即使有数据
          success: data.code === 200,
          // 不传会使用 data 的长度，如果是分页一定要传
          total: data.data.total,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="basinId"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="流域管理"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>,
      ]}
    />
  );
};

export default TablePro;
