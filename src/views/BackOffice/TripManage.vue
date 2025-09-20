<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar -->
      <nav class="col-md-2 d-none d-md-block bg-light sidebar border-end vh-100">
        <div class="d-flex flex-column p-3">
          <h5 class="mb-3">Admin Panel</h5>
          <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item"><a href="#" class="nav-link active"><i class="bi bi-speedometer2"></i> Dashboard</a></li>
            <li><a href="#" class="nav-link"><i class="bi bi-calendar-event"></i> Trip Management</a></li>
            <li><a href="#" class="nav-link"><i class="bi bi-person"></i> User Management</a></li>
            <li><a href="#" class="nav-link"><i class="bi bi-gear"></i> Assignment</a></li>
          </ul>
        </div>
      </nav>

      
      <main class="col-md-10 ms-sm-auto px-4">
        <div class="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h2>Trip List</h2>
          <button class="btn btn-warning" @click="openAddModal">
            <i class="bi bi-plus-circle"></i> Add trip
          </button>
        </div>

       
        <div class="table-responsive">
          <table class="table table-bordered table-hover align-middle">
            <thead class="table-light text-center">
              <tr>
                <th>Route</th>
                <th>Round #</th>
                <th>Date</th>
                <th>Time</th>
                <th>Driver</th>
                <th>Vehicle</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(trip, index) in trips" :key="index">
                <td>{{ trip.route }}</td>
                <td>{{ trip.round }}</td>
                <td>{{ trip.date }}</td>
                <td>{{ trip.time }}</td>
                <td>{{ trip.driver }}</td>
                <td>{{ trip.vehicle }}</td>
                <td>
                  <span class="badge" :class="trip.status === 'Running' ? 'bg-success' : 'bg-warning text-dark'">
                    {{ trip.status }}
                  </span>
                </td>
                <td class="text-center">
                  <button class="btn btn-sm btn-success me-2" @click="editTrip(trip)">
                    Edit
                  </button>
                  <button class="btn btn-sm btn-danger" @click="confirmDelete(trip)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>

    <!-- ปุ่ม แก้ไขกับ เพิ่มข้อมูล-->
    <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true" ref="editModalRef">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="saveTrip">
            <div class="modal-header">
              <h5 class="modal-title">{{ isEditing ? 'แก้ไขการเดินรถ' : 'เพิ่มการเดินรถ' }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Route</label>
                <input type="text" class="form-control" v-model="editData.route" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Date</label>
                <input type="date" class="form-control" v-model="editData.date" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Time</label>
                <input type="time" class="form-control" v-model="editData.time" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Driver</label>
                <input type="text" class="form-control" v-model="editData.driver" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Vehicle</label>
                <input type="text" class="form-control" v-model="editData.vehicle" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Status</label>
                <select class="form-select" v-model="editData.status" required>
                  <option>Running</option>
                  <option>Planned</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Modal } from "bootstrap";

export default {
  setup() {
    const trips = ref([
      { route: "Route A", round: 1, date: "2025-07-15", time: "09:10", driver: "Leslie Mago", vehicle: "บข-1234 กท 12 ที่นั่ง", status: "Running" },
      { route: "Route B", round: 2, date: "2025-07-15", time: "10:20", driver: "Josie Deck", vehicle: "บข-5404 กท 10 ที่นั่ง", status: "Planned" },
      { route: "Route C", round: 3, date: "2025-07-15", time: "11:10", driver: "Alba Pfeiffer", vehicle: "นข-1284 กท 10 ที่นั่ง", status: "Running" },
      { route: "Route D", round: 4, date: "2025-07-15", time: "14:30", driver: "Matt Dixon", vehicle: "นข-2090 กท 20 ที่นั่ง", status: "Planned" },
      { route: "Route E", round: 5, date: "2025-07-15", time: "14:50", driver: "Mateus Cunha", vehicle: "นข-3050 กท 20 ที่นั่ง", status: "Running" },
    ]);

    const editData = ref({});
    const isEditing = ref(false);
    const editModalRef = ref(null);
    let editModal = null;

    const openAddModal = () => {
      isEditing.value = false;
      editData.value = {
        route: "",
        date: "",
        time: "",
        driver: "",
        vehicle: "",
        status: "Planned",
      };
      if (!editModal) {
        editModal = new Modal(editModalRef.value);
      }
      editModal.show();
    };

    const editTrip = (trip) => {
      isEditing.value = true;
      editData.value = { ...trip };
      if (!editModal) {
        editModal = new Modal(editModalRef.value);
      }
      editModal.show();
    };

    const saveTrip = () => {
      if (isEditing.value) {
        // Edit mode
        const index = trips.value.findIndex((t) => t.round === editData.value.round);
        if (index !== -1) {
          trips.value[index] = { ...editData.value };
        }
      } else {
        // Add mode
        const newTrip = { ...editData.value };
        newTrip.round = trips.value.length + 1;
        trips.value.push(newTrip);
      }
      editModal.hide();
    };

    const confirmDelete = (trip) => {
      if (confirm(`คุณต้องการลบ ${trip.route} หรือไม่?`)) {
        trips.value = trips.value.filter((t) => t !== trip);

        
        trips.value = trips.value.map((t, index) => ({
          ...t,
          round: index + 1,
        }));
      }
    };

    return {
      trips,
      editData,
      editTrip,
      saveTrip,
      confirmDelete,
      openAddModal,
      isEditing,
      editModalRef,
    };
  },
};
</script>

<style>
.sidebar {
  min-height: 100vh;
}
</style>