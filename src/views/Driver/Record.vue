<template>
    <!-- Breadcrumb -->
    <nav class="bg-light" aria-label="breadcrumb">
        <div class="container py-2 d-flex align-items-center gap-2">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="$router.back()">←</button>
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item"><a href="#/">โฮม</a></li>
                <li class="breadcrumb-item active" aria-current="page">รายละเอียดงาน</li>
            </ol>
        </div>
    </nav>
    <div class="container my-4">
        <div v-for="(bus, index) in busList" :key="index" class="card mb-3 shadow-sm">
            <div class="card-body">
                <div class="d-flex align-items-start">
                    <!-- Badge สาย -->
                    <span class="badge bg-danger me-3 fs-6">สาย {{ bus.line }}</span>

                    <!-- เนื้อหา -->
                    <div class="flex-grow-1">
                        <h6 class="fw-bold">
                            {{ bus.start }} ➝ {{ bus.end }}
                        </h6>
                        <p class="text-muted small mb-2">
                            ผ่าน: {{ bus.route }}
                        </p>

                        <!-- รายละเอียด -->
                        <div class="row small">
                            <div class="col-6">
                                <span class="fw-bold">ประเภทรถ:</span> {{ bus.type }}
                            </div>
                            <div class="col-6">
                                <span class="fw-bold">รถทะเบียน:</span> {{ bus.plate }}
                            </div>
                            <div class="col-6 mt-2">
                                <span class="fw-bold">จำนวนผู้โดยสาร:</span> {{ bus.passenger }} คน
                            </div>
                            <div class="col-6 mt-2">
                                <span class="fw-bold">ช่วงวัน/เวลาที่วิ่ง:</span> {{ bus.time }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BusCard",
    data() {
        return {
            busList: [
                {
                    line: 1,
                    start: "มหาวิทยาลัยเทคโนโลยีมหานคร",
                    end: "มหาวิทยาลัยเทคโนโลยีมหานคร",
                    route:
                        "โลตัสหนองจอก > โรงพยาบาลหนองจอก > Big C หนองจอก > โรงพยาบาลหนองจอก > โลตัสหนองจอก",
                    type: "รถตู้",
                    plate: "สย 2591",
                    passenger: 9,
                    time: "dd/mm/yyyy เวลา 09:30",
                },
                {
                    line: 1,
                    start: "มหาวิทยาลัยเทคโนโลยีมหานคร",
                    end: "มหาวิทยาลัยเทคโนโลยีมหานคร",
                    route:
                        "โลตัสหนองจอก > โรงพยาบาลหนองจอก > Big C หนองจอก > โรงพยาบาลหนองจอก > โลตัสหนองจอก",
                    type: "รถตู้",
                    plate: "สย 2591",
                    passenger: 9,
                    time: "dd/mm/yyyy เวลา 09:30",
                },
                {
                    line: 1,
                    start: "มหาวิทยาลัยเทคโนโลยีมหานคร",
                    end: "มหาวิทยาลัยเทคโนโลยีมหานคร",
                    route:
                        "โลตัสหนองจอก > โรงพยาบาลหนองจอก > Big C หนองจอก > โรงพยาบาลหนองจอก > โลตัสหนองจอก",
                    type: "รถตู้",
                    plate: "สย 2591",
                    passenger: 9,
                    time: "dd/mm/yyyy เวลา 09:30",
                },
            ],
        };
    },
};
</script>

<style scoped>
.card {
    border-radius: 10px;
}
</style>
