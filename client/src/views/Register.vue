<template>
<div class="register">
    <div class="header">
        <button @click="$router.go(-1)">取消</button>
    </div>
    <div class="container">
        <div class="title">注册账户</div>
        <div class="content">
            <form>
                <!--表单-->
                <InputGroup label="昵称" placeholder="例如:吴亦凡" v-model="user.name" />
                <InputGroup label="邮箱" placeholder="请填写邮箱" v-model="user.email" />
                <InputGroup label="密码" placeholder="请填写密码(8-16位)" v-model="user.password" type="password" />
                <InputGroup label="确认密码" placeholder="请确认密码(8-16位)" v-model="user.confirmPassword" type="password" />
            </form>
            <div class="btn_wrap">
                <YButton :disabled="isDisabled" @click="registerClick">注册</YButton>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import InputGroup from '../components/InputGroup'
import YButton from '../components/YButton'
export default {
    name: 'register',
    data() {
        return {
            user: {
                email: '',
                password: '',
                name: '',
                confirmPassword: ''
            }
        }
    },
    methods: {
        registerClick() {
            //正则验证码邮箱
            var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
            if (!reg.test(this.user.email)) {
                this.$message({
                    center: true,
                    message: '请填写正确的邮箱',
                    type: 'warning'
                });
                return;
            }
            if (this.user.password.length < 8) {
                this.$message({
                    center: true,
                    message: '密码长度为8位',
                    type: 'warning'
                });
                return;
            }
            if (this.user.password !== this.user.confirmPassword) {
                this.$message({
                    center: true,
                    message: '两次密码输入不一致',
                    type: 'warning'
                });
                return;
            }

            this.$axios.post("/api/user/register", this.user).then(res => {
                console.log(res)
                this.$message({
                    center: true,
                    message: '注册成功',
                    type: 'success'
                });
                this.$router.push('/login')
            })

        }
    },
    computed: {
        isDisabled() {
            if (this.user.email && this.user.password && this.user.name && this.user.confirmPassword) return false;
            else return true;
        }
    },
    components: {
        InputGroup,
        YButton
    }
}
</script>

<style scoped>
.register {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.header {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 0 10px;
    line-height: 50px;
}

.header button {
    border: none;
    outline: none;
    background-color: transparent;
    color: #20af0e;
    font-size: 16px;
}

.container {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
}

.title {
    margin-top: 30px;
    font-size: 22px;
    text-align: center;
}

.content .btn_wrap {
    margin-top: 30px;
}
</style>
