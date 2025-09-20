<template>
    <!-- Loading state: hide content to prevent flash on refresh -->
    <div v-if="!loaded" class="min-vh-100 d-flex align-items-center justify-content-center">
        <div class="spinner-border text-secondary" role="status" aria-label="Loading"></div>
    </div>

    <!-- Authenticated content only -->
    <div v-else-if="isLoggedIn" class="min-vh-100 d-flex flex-column">
        <header class="border-bottom p-3">
            <div class="d-flex justify-content-between align-items-center">
                <slot name="header">
                    <strong>Shuttle Bus</strong>
                </slot>
                <div class="d-flex align-items-center gap-3">
                    <span class="text-secondary small" v-if="user?.email">{{ user.email }}</span>
                    <button class="btn btn-outline-secondary btn-sm" @click="logoutAndBack">Logout</button>
                </div>
            </div>
        </header>

        <main class="flex-fill p-3">
            <slot />
        </main>

        <footer class="border-top p-3 small text-muted">
            <slot name="footer">© 2025</slot>
        </footer>
    </div>

    <!-- Not logged-in: nothing rendered while redirecting -->
    <div v-else class="min-vh-100"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSession, fetchMe } from '../composables/useSession'

const router = useRouter()
const { user, isLoggedIn, loaded, logout } = useSession()

onMounted(async () => {
    if (!loaded.value) {
        await fetchMe()
    }
    if (!isLoggedIn.value) {
        await router.replace({ name: 'login' })
    }
})

const logoutAndBack = async () => {
    await logout()
    await router.replace({ name: 'login' })
}
</script>
