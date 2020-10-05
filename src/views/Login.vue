<template>
    <section class="login">
        <el-form
          @submit.native.prevent
          :model="form"
          :rules="rules"
          ref="login"
          size="medium"
          :hide-required-asterisk="true"
          class="form">
          <el-form-item 
              style="margin-bottom: 15px"
              prop="login">
              <el-input v-model="form.login"></el-input>
          </el-form-item>
          <el-form-item 
              style="margin-bottom: 15px"
              prop="password">
              <el-input
                v-model="form.password"
                show-password>
              </el-input>
          </el-form-item>
          <el-form-item>
              <el-button 
                  type="primary"
                  size="medium"
                  style="width: 100%"
                  @click="onSubmit">
                  ВОЙТИ
                  <i class="el-icon-arrow-right"/>
              </el-button>
          </el-form-item>
        </el-form>
    </section>
</template>
<script>
export default {
    name: 'Login',
    data() {
        return {
            form: {
                login: 'admin',
                password: 'admin',
            },
            rules: {
                login: [{
                    required: true, message: 'Поле обязательно', trigger: ['blur', 'change']
                }]
            },
        }
    },
    methods: {
        onSubmit() {
            this.$refs.login.validate((valid) => {
                if (valid) {
                    this.$router.push({name: 'main'});
                }
            });
        }
    }
}
</script>
<style scoped lang="scss">
.login {
    height: 100%;
    width: 100%;
    padding: var(--padding-base);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('../assets/background-auth.jpg');
    z-index: 10;
    box-sizing: border-box;
  &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .4);
  }
  .form {
      width: 290px;
      background: rgba(255, 255, 255, .7);
      padding: var(--padding-base);
      z-index: 1000;
  }
}
</style>