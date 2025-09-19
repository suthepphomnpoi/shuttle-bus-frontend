<template>
    <div class="container mt-4 font-ubuntu">
        <h2 class="text-center fw-bold mt-4">ตารางงานคนขับ</h2>
        <div class="schedule-list border rounded p-3 bg-white">
            <div v-for="(item, idx) in schedules" :key="idx" class="schedule-item mb-3 pb-3"
                :class="{ 'border-bottom': idx !== schedules.length - 1 }">
                <div class="fw-bold fs-5 mb-1">
                    {{ item.route }}
                </div>
                <div class="text-muted mb-2" style="font-size: 0.95em">
                    ผ่าน: {{ item.path }}
                </div>
                <div class="row mb-2">
                    <div class="col-6 col-md-2">
                        <div class="fw-bold">ประเภทรถ</div>
                        <div class="text-success fs-5">{{ item.type }}</div>
                    </div>
                    <div class="col-6 col-md-2">
                        <div class="fw-bold">ทะเบียน</div>
                        <div class="fs-5">{{ item.license }}</div>
                    </div>
                    <div class="col-6 col-md-2">
                        <div class="fw-bold">จำนวนผู้โดยสาร</div>
                        <div class="fs-5">{{ item.passenger }}</div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="fw-bold">ช่วงรับ/เวลาที่วิ่ง</div>
                        <div class="fs-6">{{ item.time }}</div>
                    </div>
                    <div class="col-12 col-md-3 d-flex align-items-center justify-content-md-end mt-2 mt-md-0">
                        <button class="btn btn-receive me-2 px-4" @click="$router.push('/drivers/details')">รับงาน</button>

                        <button class="btn btn-danger px-4">ยกเลิก</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const schedules = [
    {
        route: "มหาวิทยาลัยเทคโนโลยีมหานคร ➔ มหาวิทยาลัยเทคโนโลยีมหานคร",
        path: "โลตัสหนองจอก > โรงพยาบาลสนามของจอก > Big C ของจอก > โรงพยาบาลสนามของจอก > ไส้ผสมของจอก",
        type: "รถตู้",
        license: "สย 2591",
        passenger: "9 คน",
        time: "dd/mm/yyyy เวลา 09:30",
    },
    {
        route: "มหาวิทยาลัยเทคโนโลยีมหานคร ➔ มหาวิทยาลัยเทคโนโลยีมหานคร",
        path: "ไส้ผสมของจอก > โรงพยาบาลสนามของจอก > Big C ของจอก > โรงพยาบาลสนามของจอก > ไส้ผสมของจอก",
        type: "รถตู้",
        license: "สย 2591",
        passenger: "9 คน",
        time: "dd/mm/yyyy เวลา 09:30",
    },
];
</script>

<style scoped>
.schedule-list {
    max-width: 900px;
    margin: 0 auto;
    background: #fff;
}

.schedule-item {
    /* เพิ่มระยะห่างแต่ละรายการ */
}

.font-ubuntu {
    font-family: "Ubuntu", sans-serif !important;
}
</style>
