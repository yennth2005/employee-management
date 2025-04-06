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
        //
        Schema::table('salary_histories', function (Blueprint $table) {
            $table->decimal('penalty', 15, 2)->default(0)->after('bonus'); // Phạt
            $table->decimal('deduction', 15, 2)->default(0)->after('penalty'); // Khấu trừ khác
            $table->timestamp('paid_at')->nullable()->after('year'); // Ngày chi trả lương
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('salary_histories', function (Blueprint $table) {
            $table->dropColumn([ 'penalty', 'deduction', 'paid_at']);
        });
    }
};
