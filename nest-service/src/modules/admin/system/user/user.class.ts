export class UserInfo {
  createdAt: Date;

  updatedAt: Date;

  id: number;

  departmentId: number;

  name: string;

  username: string;

  password: string;

  nickName: string | null;

  headImg: string | null;

  email: string | null;

  phone: string | null;

  remark: string | null;

  psalt: string;

  status: number | null;
}
