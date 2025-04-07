<?php

namespace App\Imports;

use App\Models\Position;
use App\Models\Department;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PositionsImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        $departmentId = trim($row['department_id'] ?? $row[0] ?? '');
        $department = Department::find($departmentId);

        if ($department) {
            $existingPosition = Position::where('department_id', $department->id)
                ->where('name', trim($row['name'] ?? $row[1] ?? ''))
                ->first();

            if (!$existingPosition) {
                return new Position([
                    'department_id' => $department->id,
                    'name' => trim($row['name'] ?? $row[1] ?? ''),
                    'base_salary' => $row['base_salary'] ?? $row[2] ?? null,
                ]);
            }
        }

        return null; 
    }

    public function headingRow(): int
    {
        return 1; 
    }
}