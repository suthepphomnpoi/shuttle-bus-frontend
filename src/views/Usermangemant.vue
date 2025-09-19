<template>
  <div class="container py-4">
    <h2 class="h4 fw-bold mb-4">User Management</h2>

    <!-- ปุ่ม Add User -->
    <button class="btn btn-primary mb-3" @click="openAddUser">
      <Plus class="me-2" style="width: 16px; height: 16px;" /> Add User
    </button>

    <!-- ตาราง -->
    <table class="table table-bordered table-hover align-middle text-center">
      <thead class="table-light">
        <tr>
          <th>ID</th>
          <th>Email Address</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.gender }}</td>
          <td>
            <div class="d-flex justify-content-center gap-2">
              <button class="btn btn-success btn-sm" @click="openEditUser(user)">
                <Pencil style="width: 16px; height: 16px;" class="me-1" /> Edit
              </button>
              <button class="btn btn-danger btn-sm" @click="confirmDelete(user.id)">
                <Trash2 style="width: 16px; height: 16px;" class="me-1" /> Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal fade show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="saveUser">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ isEditMode ? "Edit User" : "Add User" }}
              </h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">First Name</label>
                <input v-model="form.firstName" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Last Name</label>
                <input v-model="form.lastName" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input v-model="form.email" type="email" class="form-control" />
              </div>

              <!-- แสดงช่อง Password เฉพาะตอน Add User -->
              <div class="mb-3" v-if="!isEditMode">
                <label class="form-label">Password</label>
                <div class="input-group">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="form.password"
                    class="form-control"
                  />
                  <button class="btn btn-outline-secondary" type="button" @click="togglePassword">
                    <Eye v-if="!showPassword" style="width: 16px; height: 16px;" />
                    <EyeOff v-else style="width: 16px; height: 16px;" />
                  </button>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Gender</label>
                <select v-model="form.gender" class="form-select">
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
              <button type="submit" class="btn btn-success">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Pencil, Trash2, Plus, Eye, EyeOff } from "lucide-vue-next";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  password?: string;
}

const users = ref<User[]>([
  { id: 1, email: "leslie@gmail.com", firstName: "Leslie", lastName: "Maya", gender: "Female" },
  { id: 2, email: "josie@gmail.com", firstName: "Josie", lastName: "Deck", gender: "Female" },
  { id: 3, email: "alex@gmail.com", firstName: "Alex", lastName: "Pfeiffer", gender: "Male" },
  { id: 4, email: "mike@gmail.com", firstName: "Mike", lastName: "Dean", gender: "Male" },
  { id: 5, email: "cunha@gmail.com", firstName: "Mateus", lastName: "Cunha", gender: "Male" },
]);

const isModalOpen = ref(false);
const isEditMode = ref(false);
const showPassword = ref(false);
const form = ref<User>({ id: 0, email: "", firstName: "", lastName: "", gender: "Male", password: "" });

function openAddUser() {
  isEditMode.value = false;
  form.value = { id: 0, email: "", firstName: "", lastName: "", gender: "Male", password: "" };
  showPassword.value = false;
  isModalOpen.value = true;
}

function openEditUser(user: User) {
  isEditMode.value = true;
  form.value = { ...user, password: "" };
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function saveUser() {
  if (isEditMode.value) {
    const index = users.value.findIndex((u) => u.id === form.value.id);
    if (index !== -1) users.value[index] = { ...form.value };
  } else {
    form.value.id = users.value.length + 1;
    users.value.push({ ...form.value });
  }
  closeModal();
}

function confirmDelete(id: number) {
  if (confirm("ยืนยันที่จะลบข้อมูลหรือไม่?")) {
    users.value = users.value.filter((u) => u.id !== id);
    users.value.forEach((user, index) => {
      user.id = index + 1;   
    }); 
  }
}

function togglePassword() {
  showPassword.value = !showPassword.value;
}
</script>
