<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vacations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade'); // Liên kết với bảng employees
            $table->date('start_date'); // Ngày bắt đầu nghỉ
            $table->date('end_date'); // Ngày kết thúc nghỉ
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending'); // Trạng thái yêu cầu (chờ duyệt, duyệt, từ chối)
            $table->timestamps(); // Thời gian tạo và cập nhật
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacations');
    }
};
