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
        Schema::table('employees', function (Blueprint $table) {
            // Thêm cột position_id và tạo khóa ngoại
            $table->foreignId('position_id')
                  ->after('department_id') // tùy bạn muốn để chỗ nào
                  ->constrained('positions')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            // Xóa khóa ngoại trước rồi mới xóa cột
            $table->dropForeign(['position_id']);
            $table->dropColumn('position_id');
        });
    }
};
