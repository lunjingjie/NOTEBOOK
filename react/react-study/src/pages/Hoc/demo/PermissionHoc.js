import { Permission } from './index';
function NoPermission() {
  return <div>没有权限</div>
}

export function PermissionHoc(authorization) {
  return function(Component) {
    return function Home(props) {
      const matchPermission = (value, list) => list.indexOf(value);
      return <Permission.Consumer>
        {
          (permissionList) => matchPermission(authorization, permissionList) > 0 ? <Component { ...props } /> : <NoPermission></NoPermission>
        }
      </Permission.Consumer>
    }
  }
}