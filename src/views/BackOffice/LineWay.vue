<template>
  <div class="container py-4">
    <div class="card shadow-sm">

      <!-- Table -->
      <div class="table-responsive">
        <table class="table mb-0 align-middle">
          <thead class="table-light">
            <tr>
              <th style="width:100px" class="cursor">
                Station ID
              </th>
              <th class="cursor" style="padding-left: 250px;">
                Station Name
              </th>
              <th style="width:120px">Time</th>
              <th class="text-end" style="width:180px">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4" class="text-center text-muted py-4">ไม่พบข้อมูล</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer: pagination + Add -->
      <div class="card-footer bg-white d-flex justify-content-end align-items-center gap-2">
        <router-link to="/admin/BustripManage" class="btn btn-info">ย้อนกลับ</router-link>
        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Place</button>
      </div>
    </div>

    <!-- Generic Bootstrap Modal with static form -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">เพิ่มสถานที่</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">ชื่อสถานที่</label>
                <input type="text" class="form-control" placeholder="เช่น มหาวิทยาลัยเทคโนโลยีมหานคร" />
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
.cursor{ cursor:pointer; }
</style>
