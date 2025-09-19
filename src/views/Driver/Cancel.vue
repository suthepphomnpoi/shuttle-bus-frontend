<template>
    <!-- Breadcrumb: Bootstrap -->
    <nav class="bg-light" aria-label="breadcrumb">
        <div class="container py-2 d-flex align-items-center gap-2">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="$router.back()">←</button>
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item"><a href="#/">โฮม</a></li>
                <li class="breadcrumb-item active" aria-current="page">รายละเอียดงาน</li>
            </ol>
        </div>
    </nav>

    <div class="container mt-3">
        <!-- แถวบน -->
        <div class="row g-3">
            <!-- กล่องรายละเอียดงาน -->
            <div class="col-md-6">
                <div class="card p-3">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge bg-danger px-3 py-2">สาย 1</span>
                        <button class="btn btn-outline-primary btn-sm" @click="showScanner = true">
                            สแกน QR Code
                        </button>
                    </div>
                    <h5 class="fw-bold">
                        เวลาออกรถ <span class="text-dark">9:30 น.</span>
                    </h5>
                    <hr />
                    <div class="mt-2">
                        <p class="mb-1">เส้นทาง</p>
                        <p class="mb-0"><strong>จาก :</strong> มหาวิทยาลัยเทคโนโลยีมหานคร</p>
                        <p class="mb-0">⬇</p>
                        <p class="mb-0"><strong>ถึง :</strong> มหาวิทยาลัยเทคโนโลยีมหานคร</p>
                        <p class="mb-0">รถทะเบียน : <strong>สย 2591</strong></p>
                        <p class="mb-0">ผู้โดยสาร : <strong>9 คน</strong></p>
                    </div>

                    <div class="arrow-group">
                        <button class="arrow-btn left-btn" @click="$router.push('/drivers/success')">
                            <span class="arrow left"></span>
                        </button>

                        <button class="btn btn-danger px-5 py-2" @click="$router.push('/drivers/details')">
                            ยกเลิก
                        </button>

                        <button class="arrow-btn right-btn" @click="$router.push('/drivers/success')">
                            <span class="arrow right"></span>
                        </button>
                    </div>

                </div>
            </div>

            <!-- กล่องเส้นทาง -->
            <div class="col-md-6 d-flex">
                <div class="card p-3 h-100 w-100">
                    <ul class="timeline">
                        <li class="active">
                            <span class="dot"></span>
                            <span class="fw-bold">มหาวิทยาลัยเทคโนโลยีมหานคร</span>
                        </li>
                        <li><span class="dot"></span> โลตัสหนองจอก</li>
                        <li><span class="dot"></span> โรงพยาบาลหนองจอก</li>
                        <li><span class="dot"></span> Big C หนองจอก</li>
                        <li><span class="dot"></span> โรงพยาบาลหนองจอก</li>
                        <li><span class="dot"></span> โลตัสหนองจอก</li>
                        <li class="active">
                            <span class="dot"></span>
                            <span class="fw-bold">มหาวิทยาลัยเทคโนโลยีมหานคร</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- กล่องสถานะผู้โดยสาร -->
        <div class="card mt-3 p-3">
            <h6 class="fw-bold">ผู้โดยสารทั้งหมด 9 คน</h6>
            <div class="row text-center mt-2">
                <div class="col-md-4">
                    <div class="status-box success" @click="() => { modalType = 'boarded'; showModal = true }">
                        <div class="status-header fw-bold">ขึ้นแล้ว</div>
                        <div class="status-number fw-bold fs-1">5</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="status-box danger" @click="() => { modalType = 'notBoarded'; showModal = true }">
                        <div class="fw-bold">ยังไม่ขึ้น</div>
                        <div class="fw-bold fs-1">3</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="status-box neutral">
                        <div class="fw-bold">ว่าง</div>
                        <div class="fw-bold fs-1">1</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- QR Scanner Popup -->
    <div v-if="showScanner" class="modal fade show d-block" tabindex="-1">
        <div class="modal-backdrop fade show" @click="showScanner = false"></div>
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-3 text-center">
                <h5 class="mb-2">สแกน QR Code</h5>
                <qrcode-stream @decode="onDecode" @init="onInit" />
                <p v-if="error" class="text-danger mt-2">{{ error }}</p>
                <p v-if="decoded" class="mt-2 text-success">ผลลัพธ์: {{ decoded }}</p>
                <button class="btn btn-danger mt-3 px-5" @click="showScanner = false">ปิด</button>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="custom-modal">
        <div class="custom-modal-content">
            <div v-if="modalType === 'report'">
                <h5 class="fw-bold mb-3">รายงานสรุปการเดินทาง</h5>
                <div class="report-content text-start">
                    <p><strong>เส้นทาง:</strong> {{ report.route }}</p>
                    <p><strong>เวลา:</strong> {{ report.time }}</p>
                    <p><strong>รถทะเบียน:</strong> {{ report.license }}</p>
                    <p><strong>ผู้โดยสารที่ขึ้น:</strong> {{ report.boarded }} คน</p>
                    <p><strong>ผู้โดยสารที่ไม่มา:</strong> {{ report.notCome }} คน</p>
                </div>
                <div class="mt-3">
                    <button class="btn btn-success me-2 px-4" @click="confirmReport">ยืนยัน</button>
                    <button class="btn btn-danger px-4" @click="showModal = false">ยกเลิก</button>
                </div>
            </div>
            <div v-else>
                <h5 class="fw-bold mb-3">{{ modalType === 'boarded' ? 'ขึ้นแล้ว' : 'ยังไม่ขึ้น' }}</h5>
                <ul class="passenger-list">
                    <li v-for="(p, index) in modalType === 'boarded' ? boardedPassengers : notBoardedPassengers"
                        :key="index">
                        {{ p }}</li>
                </ul>
                <button class="btn btn-danger mt-3 px-5" @click="showModal = false">ปิด</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

const showScanner = ref(false)
const decoded = ref('')
const error = ref('')

const showModal = ref(false)
const modalType = ref('')

function onDecode(result) {
    decoded.value = result
    showScanner.value = false
}

function onInit(promise) {
    promise.catch(err => {
        if (err.name === 'NotAllowedError') error.value = '❌ ไม่ได้รับสิทธิ์การเข้าถึงกล้อง'
        else if (err.name === 'NotFoundError') error.value = '❌ ไม่มีกล้อง'
        else error.value = 'เกิดข้อผิดพลาด: ' + err.message
    })
}

const report = {
    route: 'มหาวิทยาลัยเทคโนโลยีมหานคร ➝ มหาวิทยาลัยเทคโนโลยีมหานคร',
    time: '9:30 น. - 17:30 น.',
    boarded: 5,
    notCome: 3,
    license: 'สย 2591'
}

const boardedPassengers = [
    'นาย ก ขึ้นแล้ว', 'นาย ข ขึ้นแล้ว', 'นาย ค ขึ้นแล้ว', 'นาย ง ขึ้นแล้ว', 'นาย จ ขึ้นแล้ว'
]

const notBoardedPassengers = [
    'นาย ฉ ยังไม่ขึ้น', 'นาย ช ยังไม่ขึ้น', 'นาย ซ ยังไม่ขึ้น'
]

const confirmReport = () => {
    alert('รายงานถูกส่งเรียบร้อยแล้ว!')
    showModal.value = false
}
</script>

<style scoped>
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    height: 100%
}

.timeline {
    list-style: none;
    padding-left: 0;
    margin: 0;
    position: relative
}

.timeline::before {
    content: "";
    position: absolute;
    left: 6px;
    top: 1px;
    bottom: 0;
    width: 2px;
    height: calc(7*42px);
    background: #ccc
}

.timeline li {
    position: relative;
    padding-left: 30px;
    margin-bottom: 20px;
    color: #666;
    font-size: 17px
}

.timeline li .dot {
    position: absolute;
    left: -2px;
    top: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ccc;
    z-index: 1
}

.timeline li.active .dot {
    left: -3px;
    width: 20px;
    height: 20px;
    background: #28a745
}

.timeline li.active span.fw-bold {
    color: #000
}

.status-box {
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 300px;
    padding: 50px;
    margin: 20px;
    cursor: pointer;
    transition: all .2s ease
}

.status-box:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, .1)
}

.status-header {
    text-align: center;
    margin-bottom: 0
}

.status-number {
    text-align: center;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center
}

.status-box.success {
    border-color: #28a745;
    color: #28a745
}

.status-box.danger {
    border-color: #dc3545;
    color: #dc3545
}

.status-box.neutral {
    border-color: #555;
    color: #555
}

/* Arrow */
.arrow-btn {
    width: 50px;
    height: 45px;
    border: 1px solid #000;
    background: #fff;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .1)
}

.arrow {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-top: 2px solid #000;
    border-right: 2px solid #000
}

.arrow.left {
    transform: rotate(-135deg);
    margin-left: 3px
}

.arrow.right {
    transform: rotate(45deg);
    margin-right: 3px
}

.arrow-group {
    display: flex;
    justify-content: center;
    align-items: center
}

.left-btn {
    margin-right: 60px
}

.right-btn {
    margin-left: 60px
}

/* Modal */
.custom-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050
}

.custom-modal-content {
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    width: 400px;
    max-height: 80vh;
    overflow-y: auto;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .3)
}

.report-content {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px
}

.passenger-list {
    text-align: left;
    list-style: none;
    padding: 0
}

.passenger-list li {
    padding: 8px 0;
    border-bottom: 1px solid #eee
}

.passenger-list li:last-child {
    border-bottom: none
}

/* QR Scanner */
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 1040
}

.modal-content {
    border-radius: 12px;
    z-index: 1050
}
</style>
