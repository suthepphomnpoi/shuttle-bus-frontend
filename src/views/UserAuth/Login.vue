<template>
    <div class="container-fluid min-vh-100 d-flex align-items-center">
        <div class="container">
            <div class="row g-4 align-items-center">

                <div class="col-12 col-lg-6 text-center">
                    <img src="../../assets/images/login_bus.png" class="img-fluid" alt="Bus illustration" />
                </div>

                <div class="col-12 col-lg-6 d-flex justify-content-center mb-5">
                    <div class="w-100" style="max-width: 520px;">
                        <div class="mb-2">
                            <h2 class="fw-semibold mb-1">ยินดีตอนรับ <span aria-hidden="true">👋</span></h2>
                            <small class="text-secondary">เข้าสู่ระบบเพื่อใช้งาน</small>
                        </div>

                        <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
                        <div v-if="successMessage" class="alert alert-success" role="alert">{{ successMessage }}</div>

                        <form @submit.prevent="onSubmit" class="mt-3">
                            <div class="mb-3">
                                <label for="email" class="form-label">อีเมล</label>
                                <input id="email" type="email" class="form-control" v-model.trim="email" required />
                            </div>

                            <div class="mb-4">
                                <label for="password" class="form-label">รหัสผ่าน</label>
                                <input id="password" :type="showPassword ? 'text' : 'password'" class="form-control"
                                    v-model="password" required minlength="6" />
                            </div>

                            <button class="btn btn-dark w-100" type="submit" :disabled="isSubmitting">
                                <span v-if="!isSubmitting">เข้าสู่ระบบ</span>
                                <span v-else class="spinner-border spinner-border-sm" role="status"
                                    aria-hidden="true"></span>
                                <span v-if="isSubmitting" class="ms-2">กำลังดำเนินการ...</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue'
import { http } from '../../lib/http'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isSubmitting = ref(false)
const router = useRouter()
const errorMessage = ref('')
const successMessage = ref('')

const onSubmit = async () => {
    isSubmitting.value = true


    try {
        const res = await http.post('/auth/users/login', {
            email: email.value,
            password: password.value
        })

        successMessage.value = res?.data?.message || 'เข้าสู่ระบบสำเร็จ'
        router.push('/')
    } catch (err) {
        const msg = err?.response?.data?.message || 'ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง'
        errorMessage.value = msg
    } finally {
        isSubmitting.value = false
    }

}
</script>
