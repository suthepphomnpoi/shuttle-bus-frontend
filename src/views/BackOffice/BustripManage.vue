<template>
  <div class="container py-4" style="max-width: 900px; margin-left: 500px;">
    <div class="mb-2">
      <h4 style="font-weight:500;">Bustrip Management</h4>
    </div>
    <div class="d-flex justify-content-end align-items-center mb-3 gap-2">
      <router-link to="/admin/LineWay" class="btn btn-info">Line-Way</router-link>
      <button class="btn btn-primary" @click="showAddBusTrip = true">Add Bus-trip</button>
    <!-- Popup Add Bus-trip -->
    <div v-if="showAddBusTrip" class="custom-modal">
      <div class="custom-modal-content">
        <div class="custom-modal-header">
          <h5 class="custom-modal-title">เพิ่มเส้นทาง</h5>
          <button type="button" class="btn-close" @click="showAddBusTrip = false"></button>
        </div>
        <div class="custom-modal-body">
          <input type="text" class="form-control mb-3" v-model="newBusTrip.line" placeholder="ชื่อเส้นทาง" />
        </div>
        <div class="custom-modal-footer">
          <button type="button" class="btn btn-secondary" @click="showAddBusTrip = false">Close</button>
          <button type="button" class="btn btn-primary" @click="addBusTrip">Submit</button>
        </div>
      </div>
    </div>
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
          <tr v-for="bus in buses" :key="bus.id">
            <td>{{ bus.id }}</td>
            <td style="padding-left: 230px;">{{ bus.line }}</td>
            <td class="text-end">
              <button class="btn btn-outline-success btn-sm me-2" @click="openEdit(bus)">Edit</button>
    <!-- Popup Edit Bus-trip -->
    <div v-if="showEditPopup" class="custom-modal">
      <div class="custom-modal-content">
        <div class="custom-modal-header">
          <h5 class="custom-modal-title">แก้ไขเส้นทาง</h5>
          <button type="button" class="btn-close" @click="showEditPopup = false"></button>
        </div>
        <div class="custom-modal-body">
          <label class="mb-2">ชื่อเส้นทาง</label>
          <input type="text" class="form-control mb-3" v-model="editBusTrip.line" />
        </div>
        <div class="custom-modal-footer">
          <button type="button" class="btn btn-secondary" @click="showEditPopup = false">Cancel</button>
          <button type="button" class="btn btn-primary" @click="submitEdit">Submit</button>
        </div>
      </div>
    </div>
              <button class="btn btn-outline-info btn-sm me-2">จัดการจุดรับส่ง</button>
              <button class="btn btn-outline-danger btn-sm" @click="confirmDelete(bus)">Del</button>
    <!-- Popup Delete Confirmation -->
    <div v-if="showDeletePopup" class="custom-modal">
      <div class="custom-modal-content">
        <div class="custom-modal-header">
          <h5 class="custom-modal-title">ยืนยันการลบ</h5>
        </div>
        <div class="custom-modal-body">
          ต้องการลบสถานี <b>{{ deleteTarget?.id }}</b> — {{ deleteTarget?.line }} ใช่หรือไม่?
        </div>
        <div class="custom-modal-footer">
          <button type="button" class="btn btn-secondary" @click="showDeletePopup = false">Cancel</button>
          <button type="button" class="btn btn-danger" @click="deleteBusTrip">Delete</button>
        </div>
      </div>
    </div>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const showEditPopup = ref(false)
const editBusTrip = ref({ id: '', line: '' })
function openEdit(bus) {
  editBusTrip.value = { ...bus }
  showEditPopup.value = true
}

function submitEdit() {
  const idx = buses.value.findIndex(b => b.id === editBusTrip.value.id)
  if (idx !== -1 && editBusTrip.value.line.trim()) {
    buses.value[idx].line = editBusTrip.value.line
    showEditPopup.value = false
  }
}
import { ref } from 'vue'
const buses = ref([

])
const showDeletePopup = ref(false)
const deleteTarget = ref(null)
function confirmDelete(bus) {
  deleteTarget.value = bus
  showDeletePopup.value = true
}

function deleteBusTrip() {
  if (deleteTarget.value) {
    buses.value = buses.value.filter(b => b.id !== deleteTarget.value.id)
    showDeletePopup.value = false
    deleteTarget.value = null
  }
}
const showAddBusTrip = ref(false)
const newBusTrip = ref({ line: '' })
function addBusTrip() {
  if (newBusTrip.value.line.trim()) {
    const newId = String(buses.value.length + 1).padStart(3, '0')
    buses.value.push({ id: newId, line: newBusTrip.value.line })
    newBusTrip.value.line = ''
    showAddBusTrip.value = false
  }
}
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

.custom-modal {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.custom-modal-content {
  background: #fff;
  border: 2px solid #888;
  border-radius: 12px;
  min-width: 350px;
  max-width: 400px;
  padding: 24px 24px 16px 24px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.12);
}
.custom-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.custom-modal-title {
  font-size: 1.2rem;
  font-weight: 500;
}
.custom-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
}
</style>