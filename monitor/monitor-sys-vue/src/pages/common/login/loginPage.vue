<template>
  <div style="width: 100%; height: 100%; background: #fff">
    <!-- <img :src="bgImage" class="back-img" /> -->
    <div class="login-total" style="background: #fff">
      <template v-if="!showRegister">
        <!-- <div class="title">
          <span style="margin-bottom: 50px">企业突发环境风险智能评估系统</span>
        </div> -->
        <div class="login-content">
          <div style="" class="login-back">
            <a-form style="width: 400px" :model="formState" name="normal_login" class="login-form">
              <div class="aui-inputClear">
                <img
                  src="@/assets/images/login/icon-user.png"
                  height="20"
                  width="20"
                  style="display: inline-block"
                />
                <a-form-item name="name" style="display: inline-block">
                  <a-input
                    @keyup.enter="login"
                    style="width: 292px"
                    v-model:value="formState.name"
                    :bordered="false"
                    placeholder="账号"
                  ></a-input>
                </a-form-item>
              </div>
              <div class="aui-inputClear">
                <img
                  src="@/assets/images/login/icon-password.png"
                  height="20"
                  width="20"
                  style="display: inline-block"
                />
                <a-form-item name="password" style="display: inline-block">
                  <a-input
                    @keyup.enter="login"
                    style="display: inlin-block; width: 292px"
                    v-model:value="formState.password"
                    :bordered="false"
                    placeholder="密码"
                    type="password"
                  ></a-input>
                </a-form-item>
              </div>
            </a-form>
            <div
              style="display: flex; justify-content: space-between; width: 380px; font-size: 14px"
            >
              <div style="display: flex; align-items: center">
                <div class="aui-choice">
                  <a-input class="fix-auto-fill" type="checkbox" v-model:value="rememberPsw" />
                  <span style="margin-left: 5px">记住我</span>
                </div>
                <!-- <a-checkbox class="login-checkbox" v-model:checked="rememberPsw">
                  <span style="font-size: 13px"> 记住我 </span>
                </a-checkbox> -->
              </div>
              <div @click="register">用户注册</div>
            </div>
          </div>
        </div>
        <div style="flex: 1; width: 400px">
          <a-button
            :loading="loginLoading"
            class="aui-link-login"
            style="color: #fff !important"
            type="primary"
            @click="login"
            block
          >
            登录</a-button
          >
          <!-- <img
            src="@/assets/images/login/sign.png"
            height="70"
            width="250"
            alt=""
            @click="login"
            style="padding-top: 5px"
          /> -->
        </div>
      </template>
      <template v-else>
        <register-page @return-login="returnLogin"></register-page>
      </template>
    </div>
  </div>
</template>
<script setup name="login">
  import { loginApi } from '@/api/login';
  import { reactive, ref, onMounted } from 'vue';
  import { message } from 'ant-design-vue';
  import { router } from '@/plugins/router';
  import { setSessionValue } from '@/utils/hooks/system/useStorage';
  import { setTokenInHeader } from '@/plugins/axios';
  import { useLoginStore } from '@/stores/login/index.js';
  // import { passwordVerify } from '@/utils';
  import { menuList } from '@/stores/aside/index.js';
  // import { useLayoutStore } from '@/stores/layout/index.js';
  import registerPage from '@/components/register/registerPage.vue';

  // import { menuUserApi } from '@/api/system-manage/menu.js';
  const loginLoading = ref(false);
  const storeLogini = useLoginStore();
  const showRegister = ref(false);
  const formState = reactive({
    name: '',
    password: '',
  });
  // const storeLayout = useLayoutStore();
  const rememberPsw = ref(false);
  // const rules = {
  //   name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  //   password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  // };
  const login = async () => {
    try {
      if (formState.name === '' && formState.password === '') {
        message.warning('请输入账号和密码！');
        return;
      } else if (formState.name === '') {
        message.warning('请输入账号！');
        return;
      } else if (formState.password === '') {
        message.warning('请输入密码！');
        return;
      }
      const { data } = await loginApi(formState);
      if (data.data && data.code === 200) {
        setSessionValue('token', data.data);
        setSessionValue('userName', formState.name);
        setSessionValue('userPassword', formState.password);
        setTokenInHeader(data.data);
        storeLogini.setToken(data.data);
        storeLogini.setUserName(formState.name);
        // const { data: menu } = await menuUserApi();
        // const menu = {
        //   data: [
        //     {
        //       url: '/template',
        //       name: 'template',
        //       children: [],
        //       icon: 'DoubleLeftOutlined',
        //     },
        //     {
        //       url: '/systemAmendPw',
        //       name: 'systemAmendPw',
        //       children: [],
        //       icon: 'DoubleLeftOutlined',
        //     },
        //   ],
        // };
        formState.name === 'admin'
          ? menuList().addMenu(menuList().adminMenu)
          : menuList().addMenu(menuList().userMenu);
        setSessionValue('menuList', JSON.stringify(menuList().menu));

        //动态添加路由
        menuList().menu[0].children.forEach((item) => {
          if (item.children) {
            item.children.forEach((index) => {
              if (index.children) {
                index.children.forEach((value) => {
                  router.addRoute({
                    path: value.url,
                    meta: { name: value.name, icon: value.icon },
                    name: value.url,
                    // component: () => import(`../template${value.url}`),
                  });
                });
              }
              router.addRoute({
                path: index.url,
                meta: { name: index.name, icon: index.icon },
                name: index.url,
                // component: () => import(`../template${value.url}`),
              });
            });
          }
        });
        router.addRoute({ path: '/:catchAll(.*)', redirect: '/404', hidden: true });

        let path = '';
        if (menuList().menu.length > 0) {
          if (menuList().menu[0].children[0].children[0].children.length > 0) {
            path = menuList().menu[0].children[0].children[0].children[0].url;
          } else {
            path = menuList().menu[0].children[0].url;
          }
        }
        if (path !== '') {
          router.push({ path });
        } else {
          message.error('菜单获取失败，请检查');
        }

        if (rememberPsw.value) {
          window.localStorage.setItem('rememberPsw', 'true');
          window.localStorage.setItem('reName', formState.name);
          window.localStorage.setItem('rePassword', formState.password);
        } else {
          window.localStorage.setItem('rememberPsw', 'false');
          window.localStorage.removeItem('reName');
          window.localStorage.removeItem('rePassword');
        }
        // if (!passwordVerify(formState.password)) {
        //   setTimeout(() => {
        //     storeLayout.showModel = true;
        //   }, 1000);
        // }
      }
    } catch (e) {
      message.error(e.message);
    }
  };
  onMounted(async () => {
    rememberPsw.value = window.localStorage.getItem('rememberPsw') == 'true' ? true : false;
    if (rememberPsw.value) {
      formState.name = window.localStorage.getItem('reName');
      formState.password = window.localStorage.getItem('rePassword');
    }
  });
  const register = async () => {
    showRegister.value = true;
  };
  const returnLogin = (e) => {
    showRegister.value = e;
  };
</script>
<style scoped lang="scss">
  .back-img {
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  .login-content {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    height: 170px;
  }
  /* .login-back {
    background-image: url('@/assets/images/login/login-back.png');
    background-size: 100% 100%;
    padding: 15px 20px;
    color: #fff;
    width: 550px;
    height: 300px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  } */
  .user-style {
    width: 50px;
    text-align: center;
    font-size: 15px;
    letter-spacing: 2px;
    margin: 0 15px 0 5px;
    color: #fff;
  }
  .login-total {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    z-index: 3000;
    box-shadow: 0 4px 8px 1px #0003;
    height: 540px;
    padding: 30px 20px;
  }

  .title {
    font-size: 50px;
    font-weight: bold;
    color: #fff;
    letter-spacing: 5px;
    flex: 1;
    display: flex;
    align-items: flex-end;
    text-shadow: 0px 0px 4px #bacbdd;
  }
  .aui-choice {
    position: relative;
    font-size: 12px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    position: relative;
    color: #040404;
  }

  .aui-choice input {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }

  .aui-inputClear {
    width: 100%;
    border-bottom: 1px solid #cccccc;
    position: relative;
    padding-left: 20px;
    background: #fff;
    margin-bottom: 8px;
    margin-top: 20px;
  }

  .aui-inputClear .ant-form-item {
    margin-bottom: 0 !important;
    border: none;
    background: none !important;
  }
  .aui-inputClear img {
    position: absolute;
    top: 10px;
    left: 0;
  }

  .aui-inputClear input {
    width: 100%;
    padding: 10px;
    border: none;
    color: #333333;
    font-size: 14px;
    background: none !important;
  }

  .aui-inputClear input:active {
    border: none;
  }

  .aui-inputClear:focus {
    border-bottom: 1px solid #1b90ff;
  }

  .aui-inputClear:hover {
    border-bottom: 1px solid #1b90ff;
  }

  input {
    &:autofill {
      background: #fff;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      transition: background-color 5000s !important;
      -webkit-text-fill-color: rgba(0, 0, 0, 0.65) !important;
      border: none !important;
    }
  }

  .aui-link-login {
    height: 42px;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 8px;
    margin-top: 15px;
    margin-bottom: 8px;
  }
</style>
