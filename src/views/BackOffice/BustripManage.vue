<template>
  <div class="container py-4" style="max-width: 900px; margin-left: 500px;">
    <div class="mb-2">
      <h4 style="font-weight:500;">Bustrip Management</h4>
    </div>
    <div class="d-flex justify-content-end align-items-center mb-3 gap-2">
      <router-link to="/admin/LineWay" class="btn btn-info">Line-Way</router-link>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Bus-trip</button>
    </div>

    <div class="custom-table-frame">
      <div class="table-responsive">
  <table class="table table-bordered table-hover mb-0">
        <thead class="table-light">
          <tr>
            <th style="width: 90px;">Bus-ID</th>
              <th class="text-start" style="padding-left: 230px;">Line-way</th>
            <th class="text-end" style="width: 220px;">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3" class="text-center text-muted py-4">No data available</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>

    <!-- Generic Bootstrap Modal with static form -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">เพิ่มเส้นทาง</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">ชื่อเส้นทาง</label>
                <input type="text" class="form-control" placeholder="เช่น สาย A" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.btn-info {
  background-color: #00d1f7;
  color: #222;
  border: 1px solid #00bcd4;

}

.custom-table-frame {
  border: 1.5px solid #e0e0e0;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 8px 12px 12px 12px;
  margin-bottom: 16px;
}

</style>