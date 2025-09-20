<template>
  <div class="container py-4">
    <div class="card shadow-sm">

      <!-- Table -->
      <div class="table-responsive">
        <table class="table mb-0 align-middle">
          <thead class="table-light">
            <tr>
              <th style="width:100px" class="cursor" @click="toggleSort('id')">
                Station ID <i class="bi" :class="sortIcon('id')"></i>
              </th>
              <th class="cursor" @click="toggleSort('name')" style="padding-left: 250px;">
                Station Name <i class="bi" :class="sortIcon('name')"></i>
              </th>
              <th style="width:120px">Time</th>
              <th class="text-end" style="width:180px">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="st in paginated" :key="st.id">
              <td class="fw-semibold">{{ st.id }}</td>
              <td style="padding-left: 250px;"><i class="bi bi-eye me-2 opacity-50"></i>{{ st.name }}</td>
              <td>5 นาที</td>
              <td class="text-end">
                <button class="btn btn-sm btn-outline-success me-2" @click="openEditModal(st)">Edit</button>
                <button class="btn btn-sm btn-outline-danger" @click="openDeleteModal(st)">Del</button>
              </td>
            </tr>
            <tr v-if="!paginated.length">
              <td colspan="4" class="text-center text-muted py-4">ไม่พบข้อมูล</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer: pagination + Add -->
      <div class="card-footer bg-white d-flex justify-content-end align-items-center gap-2">
        <router-link to="/admin/BustripManage" class="btn btn-info">ย้อนกลับ</router-link>
        <button class="btn btn-success" @click="openAddModal">Add Place</button>
      </div>
    </div>

    <!-- ===== Popup: Add / Edit ===== -->
    <div v-if="modal.open" class="modal-mask">
      <div class="modal-card" style="max-width:560px;">
        <div class="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 class="mb-0">{{ modal.title }}</h5>
          <button class="btn btn-sm btn-light" @click="closeModal">✕</button>
        </div>

        <div class="p-3">
          <label class="form-label">{{ modal.label }}</label>
          <input v-model.trim="modal.input" type="text" class="form-control" :placeholder="modal.placeholder" />
          <div class="d-flex justify-content-end gap-2 mt-3">
            <button class="btn btn-outline-secondary" @click="closeModal">Cancel</button>
            <button class="btn btn-primary" @click="submitModal">Submit</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== Popup: Delete confirm ===== -->
    <div v-if="del.open" class="modal-mask">
      <div class="modal-card" style="max-width:460px;">
        <div class="p-3 border-bottom"><h5 class="mb-0">ยืนยันการลบ</h5></div>
        <div class="p-3">
          <p class="mb-3">ต้องการลบสถานี <strong>{{ del.target?.id }}</strong> — {{ del.target?.name }} ใช่หรือไม่?</p>
          <div class="d-flex justify-content-end gap-2">
            <button class="btn btn-outline-secondary" @click="del.open=false">Cancel</button>
            <button class="btn btn-danger" @click="confirmDelete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

/* ---------- ตาราง + /เรียง/แบ่งหน้า ---------- */
const search  = ref('')
const page    = ref(1)
const perPage = 10
const sortBy  = ref('id')
const sortDir = ref('asc')

const stations = ref([

])

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  const arr = stations.value.filter(s =>
    s.id.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
  )
  return arr.sort((a,b)=>{
    const k = sortBy.value
    const A = a[k].toString().toLowerCase()
    const B = b[k].toString().toLowerCase()
    if (A < B) return sortDir.value==='asc' ? -1 : 1
    if (A > B) return sortDir.value==='asc' ?  1 : -1
    return 0
  })
})
const pages    = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
const startIdx = computed(() => (page.value-1)*perPage)
const endIdx   = computed(() => Math.min(filtered.value.length, startIdx.value+perPage))
const paginated= computed(() => filtered.value.slice(startIdx.value, endIdx.value))

function toggleSort(key){
  if (sortBy.value === key) sortDir.value = sortDir.value==='asc' ? 'desc' : 'asc'
  else { sortBy.value = key; sortDir.value = 'asc' }
}
function sortIcon(key){ return sortBy.value!==key ? 'bi-chevron-expand' : (sortDir.value==='asc'?'bi-chevron-up':'bi-chevron-down') }

/* ---------- Popup: Add/Edit ---------- */
const modal = reactive({
  open: false,
  mode: /** @type {'add'|'edit'|null} */ (null),
  title: '',
  label: '',
  placeholder: '',
  input: '',
  target: /** @type{{id:string,name:string}|null} */ (null)
})

function openAddModal(){
  modal.open = true
  modal.mode = 'add'
  modal.title = 'เพิ่มสถานที่'
  modal.label = 'ชื่อสถานที่'
  modal.placeholder = 'เช่น มหาวิทยาลัยเทคโนโลยีมหานคร'
  modal.input = ''
  modal.target = null
}
function openEditModal(st){
  modal.open = true
  modal.mode = 'edit'
  modal.title = 'แก้ไขสถานที่'
  modal.label = 'ชื่อสถานที่'
  modal.placeholder = 'พิมพ์ชื่อใหม่'
  modal.input = st.name
  modal.target = st
}
function closeModal(){ modal.open = false }
function submitModal(){
  if (!modal.input.trim()){
    alert('พิมพ์ชื่อสถานที่ก่อน'); return
  }
  if (modal.mode === 'add'){
    const nextNum = stations.value.length + 1
    stations.value.push({ id: `S${nextNum.toString().padStart(2,'0')}`, name: modal.input.trim() })
  } else if (modal.mode === 'edit' && modal.target){
    modal.target.name = modal.input.trim()
  }
  closeModal()
}

/* ---------- Popup: Delete confirm ---------- */
const del = reactive({
  open: false,
  target: /** @type{{id:string,name:string}|null} */ (null)
})
function openDeleteModal(st){ del.open = true; del.target = st }
function confirmDelete(){
  if (!del.target) return
  const i = stations.value.findIndex(x => x.id === del.target.id)
  if (i > -1) stations.value.splice(i, 1)
  del.open = false
  del.target = null
}
</script>

<style scoped>
.btn-info {
  background-color: #00d1f7;
  color: #222;
  border: 1px solid #00bcd4;
}
.cursor{ cursor:pointer; }
/* Modal (ไม่ใช้ JS ของ bootstrap) */
.modal-mask{
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 1050;
}
.modal-card{
  background: #fff;
  border-radius: .5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,.25);
  width: 92%;
  max-width: 640px;
  overflow: hidden;
}
</style>
