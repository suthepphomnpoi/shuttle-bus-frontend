<template>
  <div class="container-fluid py-4" style="max-width: 1200px; margin-left: 400px;">
    <div class="row">
      <!-- ตารางรถ -->
      <div class="col-md-8">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span>Vehicle</span>
            <button class="btn btn-success btn-sm" @click="showAddVehicle = true">Add vehicle</button>
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
                <tr v-for="vehicle in vehicles" :key="vehicle.id">
                  <td>{{ vehicle.id }}</td>
                  <td>{{ vehicle.type }}</td>
                  <td>{{ vehicle.seat }}</td>
                  <td>{{ vehicle.plat }}</td>
                  <td>
                    <button class="btn btn-primary btn-sm me-1" @click="editVehicle(vehicle)">Edit</button>
                    <button class="btn btn-danger btn-sm" @click="deleteVehicle(vehicle.id)">Del</button>
                  </td>
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
            <button class="btn btn-success btn-sm" @click="showAddType = true">Add vehicle type</button>
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
                <tr v-for="type in vehicleTypes" :key="type.id">
                  <td>{{ type.id }}</td>
                  <td>{{ type.name }}</td>
                  <td>
                    <button class="btn btn-primary btn-sm me-1" @click="editType(type)">Edit</button>
                    <button class="btn btn-danger btn-sm" @click="deleteType(type.id)">Del</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup เพิ่ม/แก้ไขรถ -->
    <div v-if="showAddVehicle || editVehicleData" class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,0.2)">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editVehicleData ? 'แก้ไขรถ' : 'เพิ่มรถ' }}</h5>
            <button type="button" class="btn-close" @click="closeVehiclePopup"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitVehicle">
              <div class="mb-3">
                <label class="form-label">vehicle type</label>
                <select class="form-select" v-model="vehicleForm.type" required>
                  <option v-for="type in vehicleTypes" :key="type.id" :value="type.name">{{ type.name }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">plat number</label>
                <input type="text" class="form-control" v-model="vehicleForm.plat" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Seat capacity</label>
                <input type="number" class="form-control" v-model="vehicleForm.seat" required min="1" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup เพิ่ม/แก้ไขประเภทรถ -->
    <div v-if="showAddType || editTypeData" class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,0.2)">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editTypeData ? 'แก้ไขประเภทรถ' : 'เพิ่มประเภทรถ' }}</h5>
            <button type="button" class="btn-close" @click="closeTypePopup"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitType">
              <div class="mb-3">
                <label class="form-label">ชื่อประเภทรถ</label>
                <input type="text" class="form-control" v-model="typeForm.name" required />
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
      vehicles: [

      ],
      vehicleTypes: [
      { id: '001', name: 'รถบัส' },
      { id: '002', name: 'รถตู้' },
      ],
      showAddVehicle: false,
      showAddType: false,
      editVehicleData: null,
      editTypeData: null,
      vehicleForm: { type: '', plat: '', seat: '' },
      typeForm: { name: '' },
    };
  },
  methods: {
    // รถ
    editVehicle(vehicle) {
      this.editVehicleData = vehicle;
      this.vehicleForm = { ...vehicle };
      this.showAddVehicle = false;
    },
    deleteVehicle(id) {
      this.vehicles = this.vehicles.filter(v => v.id !== id);
    },
    submitVehicle() {
      if (this.editVehicleData) {
        Object.assign(this.editVehicleData, this.vehicleForm);
        this.editVehicleData = null;
      } else {
        const newId = String(this.vehicles.length + 1).padStart(3, '0');
        this.vehicles.push({ id: newId, ...this.vehicleForm });
      }
      this.vehicleForm = { type: '', plat: '', seat: '' };
      this.showAddVehicle = false;
      this.editVehicleData = null;
    },
    closeVehiclePopup() {
      this.showAddVehicle = false;
      this.editVehicleData = null;
      this.vehicleForm = { type: '', plat: '', seat: '' };
    },
    // ประเภทรถ
    editType(type) {
      this.editTypeData = type;
      this.typeForm = { ...type };
      this.showAddType = false;
    },
    deleteType(id) {
      this.vehicleTypes = this.vehicleTypes.filter(t => t.id !== id);
    },
    submitType() {
      if (this.editTypeData) {
        Object.assign(this.editTypeData, this.typeForm);
        this.editTypeData = null;
      } else {
        const newId = String(this.vehicleTypes.length + 1).padStart(3, '0');
        this.vehicleTypes.push({ id: newId, ...this.typeForm });
      }
      this.typeForm = { name: '' };
      this.showAddType = false;
      this.editTypeData = null;
    },
    closeTypePopup() {
      this.showAddType = false;
      this.editTypeData = null;
      this.typeForm = { name: '' };
    },
  },
};
</script>

<style scoped>
.modal.fade.show {
  display: block;
}
</style>