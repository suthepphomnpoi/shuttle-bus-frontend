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
                        <button class="btn btn-outline-primary btn-sm">สแกน QR Code</button>
                    </div>
                    <h5 class="fw-bold">
                        เวลาออกรถ <span class="text-dark">9:30 น.</span>
                    </h5>
                    <hr />
                    <div class="mt-2">
                        <p class="mb-1">เส้นทาง</p>
                        <p class="mb-0">
                            <strong>จาก :</strong> มหาวิทยาลัยเทคโนโลยีมหานคร
                        </p>
                        <p class="mb-0">⬇</p>
                        <p class="mb-0">
                            <strong>ถึง :</strong> มหาวิทยาลัยเทคโนโลยีมหานคร
                        </p>
                        <p class="mb-0">รถทะเบียน : <strong>สย 2591</strong></p>
                        <p class="mb-0">ผู้โดยสาร : <strong>9 คน</strong></p>
                    </div>

                    <div class="arrow-group">
                        <button class="arrow-btn left-btn" @click="$router.push('/drivers/cancel')">
                            <span class="arrow left"></span>
                        </button>

                        <button class="btn btn-dark px-5 py-2" @click="$router.push('/drivers/confirm')">ถึงป้ายแล้ว</button>

                        <button class="arrow-btn right-btn" @click="$router.push('/drivers/cancel')">
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
        </div> <!-- ปิด row แถวบน -->

        <!-- กล่องสถานะผู้โดยสาร -->
        <div class="card mt-3 p-3 ">
            <h6 class="fw-bold">ผู้โดยสารทั้งหมด 9 คน</h6>
            <div class="row text-center mt-2">
                <div class="col-md-4">
                    <div class="status-box success">
                        <div class="status-header fw-bold">ขึ้นแล้ว</div>
                        <div class="status-number fw-bold fs-1">5</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="status-box danger">
                        <div class="fw-bold">ยังไม่ขึ้น</div>
                        <div class="fw-bold fs-1">3</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="status-box neutral">
                        <div class="fw-bold">ว่าง</div>
                        <div class="fw-bold fs-1">1
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// สามารถใช้ props หรือดึงข้อมูลจาก API ได้
</script>

<style scoped>
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    height: 100%;
    /* คงไว้ตามที่คุณบอก */
}

.timeline {
    list-style: none;
    padding-left: 0px;
    margin: 0;
    position: relative;
}

.timeline::before {
    content: "";
    position: absolute;
    left: 6px;
    /* ให้ตรงกลาง dot */
    top: 1px;
    bottom: 0;
    width: 2px;
    height: calc(7 * 42px);
    background: #ccc;
}

.timeline li {
    position: relative;
    padding-left: 30px;
    margin-bottom: 20px;
    color: #666;
    font-size: 17px;
}

.timeline li .dot {
    position: absolute;
    left: -2px;
    top: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ccc;
    z-index: 1;
}

.timeline li.active .dot {
    left: -3px;
    width: 20px;
    height: 20px;
    background: #28a745;
    /* จุดสีเขียว */
}

.timeline li.active span.fw-bold {
    color: #000;
}

.status-box {
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 300px;
    padding: 50px;
    margin: 20px;
}

.status-header {
    text-align: center;
    margin-bottom: 0px;
}

.status-number {
    text-align: center;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}


.status-box.success {
    border-color: #28a745;
    color: #28a745;
}

.status-box.danger {
    border-color: #dc3545;
    color: #dc3545;
}

.status-box.neutral {
    border-color: #555;
    color: #555;
}




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
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

.arrow {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-top: 2px solid #000;
    border-right: 2px solid #000;
}

.arrow.left {
    transform: rotate(-135deg);
    margin-left: 3px;
}

.arrow.right {
    transform: rotate(45deg);
    margin-right: 3px;
}

.arrow-group {
    display: flex;
    justify-content: center;
    align-items: center;
}

.left-btn {
    margin-right: 60px;
}

.right-btn {
    margin-left: 60px;
}
</style>
