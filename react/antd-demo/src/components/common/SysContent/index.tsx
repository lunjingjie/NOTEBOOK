import { Layout } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { router } from '../../../util/router';
import { SysFooter } from '../SysFooter';
import { FlexWrap } from '../../styles';
const { Content } = Layout;

export const SysContent: React.FC = () => {
  return (
    <Content
      style={{
        margin: 3,
        minHeight: 280,
      }}
      className="layout-content"
    >
      <RouterProvider router={router}></RouterProvider>
      <FlexWrap>
        <SysFooter />
      </FlexWrap>
    </Content>
  );
};
