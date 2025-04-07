<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Imports\PositionsImport;
use App\Models\Position;
use App\Http\Requests\PositionRequest;
use App\Models\Department;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class PositionController extends Controller
{
    public function index(Request $request)
    {
        $query = Position::with('department');

        $departmentId = $request->query('department_id');
        if (!is_null($departmentId) && $departmentId !== '') {
            $query->where('department_id', $departmentId);
        }

        $positions = $query->get();
        return response()->json($positions);
    }

    public function store(PositionRequest $request)
    {
        $position = Position::create($request->validated());
        $position->load('department');
        return response()->json($position, 201);
    }

    public function show($id)
    {
        $position = Position::with('department')->findOrFail($id);
        return response()->json($position);
    }

    public function update(PositionRequest $request, $id)
    {
        $position = Position::findOrFail($id);
        $position->update($request->validated());
        $position->load('department');
        return response()->json($position);
    }

    public function destroy($id)
    {
        $position = Position::findOrFail($id);
        $position->delete();
        return response()->json(['message' => 'Position deleted successfully']);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);
    
        $file = $request->file('file');
    
        try {
            Excel::import(new PositionsImport, $file);
    
            return response()->json([
                'message' => 'Import completed successfully.',
            ], 200);
    
        } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
            $failures = $e->failures();
            return response()->json(['message' => 'Validation error during import.', 'errors' => $failures], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error processing Excel file.', 'error' => $e->getMessage()], 500);
        }
    }
}