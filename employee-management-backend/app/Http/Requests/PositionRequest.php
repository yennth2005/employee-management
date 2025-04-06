<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PositionRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Cho phép tất cả user (có thể thêm logic phân quyền sau)
    }

    public function rules()
    {
        return [
            'department_id' => 'required|exists:departments,id', // department_id phải tồn tại trong bảng departments
            'name' => 'required|string|max:255',
            'base_salary' => 'required|numeric|min:0', // Lương cơ bản phải là số và không âm
        ];
    }

    public function messages()
    {
        return [
            'department_id.required' => 'Vui lòng chọn danh mục.',
            'department_id.exists' => 'Danh mục không tồn tại.',
            'name.required' => 'Tên vị trí không được để trống.',
            'base_salary.required' => 'Lương cơ bản không được để trống.',
            'base_salary.numeric' => 'Lương cơ bản phải là số.',
            'base_salary.min' => 'Lương cơ bản không được âm.',
        ];
    }
}