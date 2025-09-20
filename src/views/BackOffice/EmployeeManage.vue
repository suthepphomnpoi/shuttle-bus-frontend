<template>
  <div class="container py-4" style="max-width: 1200px; margin-left: 400px;">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <div>
        <select class="form-select d-inline-block w-auto" v-model="permissionFilter">
          <option value="ALL">Permissions ALL</option>
          <option value="Admin">Admin</option>
          <option value="Employee">Employee</option>
          <option value="Driver">Driver</option>
        </select>
      </div>
      <button class="btn btn-warning" @click="showAddUser = true">+ New User</button>
    </div>
    <table class="table table-bordered table-sm align-middle">
      <thead class="table-light">
        <tr>
          <th>ID</th>
          <th>first Name</th>
          <th>Last Name</th>
          <th>department</th>
          <th>Permissions</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.department }}</td>
          <td>
            <span :class="badgeClass(user.position)">{{ user.position }}</span>
          </td>
          <td>
            <button class="btn btn-primary btn-sm me-1" @click="editUser(user)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Del</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Popup ข้อมูลพนักงาน -->
    <div v-if="showInfoUser" class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,0.2)">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">ข้อมูลพนักงาน</h5>
            <button type="button" class="btn-close" @click="closeInfoUser"></button>
          </div>
          <div class="modal-body">
            <div>First name : {{ infoUser.firstName }}</div>
            <div>Last name : {{ infoUser.lastName }}</div>
            <div>Email : {{ infoUser.email }}</div>
            <div>Gender : {{ infoUser.gender }}</div>
            <form @submit.prevent="saveInfoUser">
              <div class="mb-3">
                <label class="form-label">แผนก</label>
                <select class="form-select" v-model="infoUser.department">
                  <option v-for="dept in departments" :key="dept">{{ dept }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">ตำแหน่ง</label>
                <select class="form-select" v-model="infoUser.position">
                  <option v-for="pos in positions" :key="pos">{{ pos }}</option>
                </select>
              </div>
              <button type="submit" class="btn btn-success">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup เพิ่มพนักงาน -->
    <div v-if="showAddUser" class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,0.2)">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">เพิ่มพนักงาน</h5>
            <button type="button" class="btn-close" @click="closeAddUser"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitAddUser">
              <div class="mb-3">
                <label class="form-label">ชื่อพนักงาน</label>
                <input type="text" class="form-control" v-model="newUser.firstName" required />
              </div>
              <div class="mb-3">
                <label class="form-label">นามสกุล</label>
                <input type="text" class="form-control" v-model="newUser.lastName" required />
              </div>
              <div class="mb-3">
                <label class="form-label">แผนก</label>
                <select class="form-select" v-model="newUser.department" required>
                  <option v-for="dept in departments" :key="dept">{{ dept }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">สิทธิ์การเข้าถึง</label>
                <select class="form-select" v-model="newUser.position" required>
                  <option v-for="pos in positions" :key="pos">{{ pos }}</option>
                </select>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        
      ],
      departments: ['Manager', 'Operation', 'Driver', 'Report'],
  positions: ['Admin', 'Employee', 'Driver'],
      firstNames: ['Leslie', 'Josie', 'Alex', 'Mike', 'Mateus', 'Nzola', 'Antony', 'Andre', 'Jorge'],
      permissionFilter: 'ALL',
      showAddUser: false,
      showInfoUser: false,
      infoUser: {},
  newUser: { firstName: '', lastName: '', department: '', position: '' },
    };
  },
  computed: {
    filteredUsers() {
      if (this.permissionFilter === 'ALL') return this.users;
      return this.users.filter(u => u.position === this.permissionFilter);
    },
  },
  methods: {
    badgeClass(position) {
      if (position === 'Admin') return 'badge bg-danger';
      if (position === 'Employee') return 'badge bg-info text-dark';
      if (position === 'Driver') return 'badge bg-secondary';
      if (position === 'quit') return 'badge bg-dark';
      return 'badge bg-light';
    },
    editUser(user) {
      this.infoUser = { ...user };
      this.showInfoUser = true;
    },
    closeInfoUser() {
      this.showInfoUser = false;
      this.infoUser = {};
    },
    saveInfoUser() {
      const idx = this.users.findIndex(u => u.id === this.infoUser.id);
      if (idx !== -1) this.users[idx] = { ...this.infoUser };
      this.closeInfoUser();
    },
    deleteUser(id) {
      this.users = this.users.filter(u => u.id !== id);
    },
    closeAddUser() {
      this.showAddUser = false;
      this.newUser = { firstName: '', lastName: '', department: '', position: '' };
    },
    submitAddUser() {
      const lastId = this.users.length ? Number(this.users[this.users.length - 1].id) : 0;
      const newId = String(lastId + 1).padStart(3, '0');
      const email = 'newuser@gmail.com';
      const gender = 'Male';
      this.users.push({
        id: newId,
        firstName: this.newUser.firstName,
        lastName: this.newUser.lastName,
        department: this.newUser.department,
        position: this.newUser.position,
        email,
        gender,
      });
      this.closeAddUser();
    },
  },
};
</script>

<style scoped>
.badge {
  font-size: 0.9em;
  padding: 0.4em 0.8em;
}
.modal.fade.show {
  display: block;
}
</style>