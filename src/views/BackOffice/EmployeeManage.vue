<template>
  <div class="container py-4" style="max-width: 1200px; margin-left: 400px;">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <div>
        <select class="form-select d-inline-block w-auto">
          <option value="ALL">Permissions ALL</option>
          <option value="Admin">Admin</option>
          <option value="Employee">Employee</option>
          <option value="Driver">Driver</option>
        </select>
      </div>
      <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">+ New User</button>
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
        <tr>
          <td colspan="6" class="text-center text-muted">No data available</td>
        </tr>
      </tbody>
    </table>

    <!-- Generic Bootstrap Modal with static form -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal</h5>
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
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Department</label>
                  <select class="form-select">
                    <option>Manager</option>
                    <option>Operation</option>
                    <option>Driver</option>
                    <option>Report</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Position</label>
                  <select class="form-select">
                    <option>Admin</option>
                    <option>Employee</option>
                    <option>Driver</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.badge {
  font-size: 0.9em;
  padding: 0.4em 0.8em;
}

</style>