<template>
  <div class="container py-4">
    <h2 class="h4 fw-bold mb-4">User Management</h2>

    <!-- ปุ่ม Add User: ใช้ Bootstrap Modal -->
    <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <i class="bi bi-plus-lg me-2"></i> Add User
    </button>

    <!-- ตาราง -->
    <table class="table table-bordered table-hover align-middle text-center">
      <thead class="table-light">
        <tr>
          <th style="width:80px">ID</th>
          <th>Email Address</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th style="width:120px">Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="5" class="text-muted">No data available</td>
        </tr>
      </tbody>
    </table>

    <!-- Generic Bootstrap Modal with static form -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add User</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label class="form-label">First Name</label>
                  <input type="text" class="form-control" placeholder="e.g. Leslie" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="form-control" placeholder="e.g. Maya" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" placeholder="name@example.com" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <div class="input-group">
                    <input type="password" class="form-control" placeholder="********" />
                    <button class="btn btn-outline-secondary" type="button" tabindex="-1">
                      <i class="bi bi-eye"></i>
                    </button>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Gender</label>
                  <select class="form-select">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-success" data-bs-dismiss="modal">Save</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.modal-dialog {
  margin-top: 10vh;
}
</style>
