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
        Schema::create('salary_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade'); // Liên kết với bảng employees
            $table->decimal('base_salary', 15, 2); // Lương cơ bản
            $table->decimal('actual_salary', 15, 2); // Lương thực tế
            $table->decimal('bonus', 15, 2)->default(0); // Khoản thưởng
            $table->integer('month'); // Tháng
            $table->integer('year'); // Năm
            $table->timestamps(); // Thời gian tạo và cập nhật
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salary_histories');
    }
};
