<template>
  <div class="container-fluid py-4" style="max-width: 1200px; margin-left: 400px;">
    <div class="row">
      <!-- ตารางรถ -->
      <div class="col-md-8">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span>Vehicle</span>
            <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Add vehicle</button>
          </div>
          <div class="card-body p-2">
            <table class="table table-bordered table-sm align-middle">
              <thead class="table-light">
                <tr>
                  <th>ID</th>
                  <th>vehicle type</th>
                  <th>seat capacity</th>
                  <th>plat number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="5" class="text-center text-muted">No data available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- ตารางประเภทรถ -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span>vehicle type</span>
            <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Add vehicle type</button>
          </div>
          <div class="card-body p-2">
            <table class="table table-bordered table-sm align-middle">
              <thead class="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="3" class="text-center text-muted">No data available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Generic Bootstrap Modal with static form -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">เพิ่ม/แก้ไขข้อมูล</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">Vehicle Type</label>
                <select class="form-select">
                  <option>รถบัส</option>
                  <option>รถตู้</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Plat Number</label>
                <input type="text" class="form-control" placeholder="เช่น กข-1234" />
              </div>
              <div class="mb-3">
                <label class="form-label">Seat Capacity</label>
                <input type="number" min="1" class="form-control" placeholder="เช่น 12" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Confirm</button>
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

</style>