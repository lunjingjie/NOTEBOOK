<template>
  <div style="background-color: #fff; padding: 10px">
    <div class="search_card">
      <div class="search_title">账号安全中心</div>
    </div>
    <div
      style="margin-top: 12px; width: 100%; padding: 10px"
      :style="{ height: offsetHeight + 'px' }"
    >
      <div style="margin-top: 20px">
        <span>用户名称：</span>
        <a-input v-model:value="userName" disabled style="width: 300px" />
      </div>
      <div style="margin-top: 28px; padding-left: 14px">
        <span>旧密码：</span>
        <a-input-password
          v-model:value="usedPw"
          placeholder="请输入当前账号密码"
          style="width: 300px"
          password
        />
      </div>
      <div style="margin-top: 28px; padding-left: 14px">
        <span>新密码：</span>
        <a-input-password
          v-model:value="newPw"
          placeholder="请输入新密码"
          style="width: 300px"
          password
        />
      </div>
      <div style="margin-top: 28px">
        <span>确认密码：</span>
        <a-input-password
          v-model:value="verifyPw"
          placeholder="请输入确认密码"
          style="width: 300px"
          password
        />
      </div>
      <div style="margin-top: 38px; padding-left: 140px">
        <a-button type="primary" @click="saveNewPw"> 更新密码 </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { getSessionValue } from '@/utils/hooks/system/useStorage.js';
  import { message } from 'ant-design-vue';
  import { passwordVerify } from '@/utils/index.js';
  import { useLoginStore } from '@/stores/login';
  import { userListApi, amendPwApi } from '@/api/register';

  const offsetHeight = ref(document.body.offsetHeight - 150);
  const userName = getSessionValue('userName');
  const usedPw = ref('');
  const newPw = ref('');
  const verifyPw = ref('');

  onMounted(() => {
    getUserData(userName);
  });
  const userData = ref({});
  const getUserData = async (name) => {
    const { data } = await userListApi({ name });
    data.list.forEach((item) => {
      if (name === item.name) {
        userData.value = item;
      }
    });
  };
  const { loginOut } = useLoginStore();
  const saveNewPw = async () => {
    const userPw = getSessionValue('userPassword');
    if (usedPw.value == '') {
      message.warning('旧密码不能为空');
    } else if (newPw.value == '') {
      message.warning('新密码不能为空');
    } else if (verifyPw.value == '') {
      message.warning('确认密码不能为空');
    } else if (userPw != usedPw.value) {
      message.warning('旧密码与当前账号密码不匹配，请检查');
    } else if (!passwordVerify(newPw.value)) {
      message.warning('请输入由大写字母、小写字母、数字和特殊符号中至少三种组合的8位以上的密码!');
    } else if (newPw.value != verifyPw.value) {
      message.warning('新密码与确认密码不匹配，请检查');
    } else {
      userData.value.password = verifyPw.value;
      const { data } = await amendPwApi(userData.value);
      if (data.code === 200) {
        message.success('密码更新成功! 请重新登录');
        setTimeout(() => {
          loginOut();
        }, 1000);
      } else {
        message.error(data.msg);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .search_card {
    background: #fff;
    padding: 2px 4px 8px;
    border-bottom: 1px solid #e4e4e4;
  }
  .search_title {
    font-size: 18px;
    font-weight: bold;
    color: #33c8e9;
    border-left: 6px solid #33c8e9;
    padding-left: 8px;
    line-height: 20px;
  }
</style>
