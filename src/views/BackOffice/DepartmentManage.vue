<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Department Management</h3>
      <button class="btn btn-success btn-sm" @click="openAddModal">
        <i class="bi bi-plus-circle"></i> Add Department
      </button>
    </div>

    <!-- ค้นหาข้อมูล -->
    <div class="mb-3">
      <input v-model="search" type="text" class="form-control" placeholder="Search by Department Name or ID" />
    </div>

    
    <table class="table table-bordered table-hover align-middle">
      <thead class="table-light text-center">
        <tr>
          <th style="width: 100px;">ID</th>
          <th>Department Name</th>
          <th style="width: 160px;">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dept in filteredDepartments" :key="dept.id">
          <td class="text-center">{{ dept.id }}</td>
          <td>{{ dept.name }}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-outline-primary me-2" @click="openEditModal(dept)">Edit</button>
            <button class="btn btn-sm btn-outline-danger" @click="deleteDepartment(dept.id)">Del</button>
          </td>
        </tr>
        <tr v-if="filteredDepartments.length === 0">
          <td colspan="3" class="text-center text-muted">No departments found.</td>
        </tr>
      </tbody>
    </table>

    
    <nav aria-label="Page navigation example" v-if="pageCount > 1">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">ก่อนหน้า</a>
        </li>
        <li
          class="page-item"
          v-for="page in pageCount"
          :key="page"
          :class="{ active: currentPage === page }"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === pageCount }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">ต่อไป</a>
        </li>
      </ul>
    </nav>

    
    <div
      class="modal fade"
      tabindex="-1"
      role="dialog"
      ref="modalRef"
      aria-labelledby="modalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <form class="modal-content" @submit.prevent="submitForm">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitle">
              {{ isEditing ? "แก้ไขแผนก" : "เพิ่มแผนก" }}
            </h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="departmentName" class="form-label">Department Name</label>
              <input
                v-model="formData.name"
                type="text"
                id="departmentName"
                class="form-control"
                required
                autofocus
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { Modal } from "bootstrap";

export default {
  setup() {
    const departments = ref([
      { id: "001", name: "Leslie" },
      { id: "002", name: "Josie" },
      { id: "003", name: "Alex Pfeiffer" },
      { id: "004", name: "Mike" },
      { id: "005", name: "Mateus" },
      { id: "006", name: "Nizola" },
      { id: "007", name: "Antony" },
      { id: "008", name: "Andre" },
      { id: "009", name: "Jorge" },
    ]);

    const search = ref("");
    const currentPage = ref(1);
    const itemsPerPage = 5;

    const filteredDepartments = computed(() => {
      const filtered = departments.value.filter(
        (d) =>
          d.id.includes(search.value.trim()) ||
          d.name.toLowerCase().includes(search.value.toLowerCase().trim())
      );
      const start = (currentPage.value - 1) * itemsPerPage;
      return filtered.slice(start, start + itemsPerPage);
    });

    const pageCount = computed(() => {
      const filtered = departments.value.filter(
        (d) =>
          d.id.includes(search.value.trim()) ||
          d.name.toLowerCase().includes(search.value.toLowerCase().trim())
      );
      return Math.ceil(filtered.length / itemsPerPage);
    });

    const changePage = (page) => {
      if (page < 1 || page > pageCount.value) return;
      currentPage.value = page;
    };

    const isEditing = ref(false);
    const formData = ref({ id: "", name: "" });
    const modalRef = ref(null);
    let modalInstance = null;

    const openAddModal = () => {
      isEditing.value = false;
      formData.value = { id: generateNewId(), name: "" };
      showModal();
    };

    const openEditModal = (dept) => {
      isEditing.value = true;
      formData.value = { ...dept };
      showModal();
    };

    const showModal = () => {
      if (!modalInstance) {
        modalInstance = new Modal(modalRef.value);
      }
      modalInstance.show();
    };

    const closeModal = () => {
      if (modalInstance) modalInstance.hide();
    };

    const submitForm = () => {
      if (!formData.value.name.trim()) {
        alert("กรุณากรอกชื่อแผนก");
        return;
      }
      if (isEditing.value) {
        const idx = departments.value.findIndex((d) => d.id === formData.value.id);
        if (idx !== -1) {
          departments.value[idx].name = formData.value.name.trim();
        }
      } else {
        departments.value.push({
          id: formData.value.id,
          name: formData.value.name.trim(),
        });
      }
      closeModal();
    };

    const deleteDepartment = (id) => {
      if (confirm("คุณต้องการลบแผนกนี้หรือไม่?")) {
        // ลบแผนกที่เลือก
        departments.value = departments.value.filter((d) => d.id !== id);

        // เรียงลำดับใหม่และตั้ง id ใหม่ให้เรียงตามลำดับ
        departments.value = departments.value
          .map((dept, index) => ({
            ...dept,
            id: (index + 1).toString().padStart(3, "0"),
          }));
      }
    };

    const generateNewId = () => {
      if (departments.value.length === 0) return "001";
      const ids = departments.value.map((d) => parseInt(d.id));
      const maxId = Math.max(...ids);
      return (maxId + 1).toString().padStart(3, "0");
    };

    return {
      search,
      filteredDepartments,
      currentPage,
      pageCount,
      changePage,
      isEditing,
      formData,
      modalRef,
      openAddModal,
      openEditModal,
      submitForm,
      closeModal,
      deleteDepartment,
    };
  },
};
</script>

<style scoped>
</style>
