
<template>
    <UserAuthMiddleware>
        <template #header>
            <div class="d-flex align-items-center gap-2">
                <strong>Shuttle Bus</strong>
                <span class="text-secondary">/ Search Trip</span>
            </div>
        </template>
        
        <div class="container-fluid">
            <h4>Search for Bus Trips</h4>
            <p>Content will go here...</p>
        </div>
    </UserAuthMiddleware>
</template>

<script setup lang="ts">
import UserAuthMiddleware from '../../layouts/UserAuthMiddleware.vue';
</script>
