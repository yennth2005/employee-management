<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    protected $fillable = ['department_id', 'name', 'base_salary'];

    // Quan hệ với Department
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}