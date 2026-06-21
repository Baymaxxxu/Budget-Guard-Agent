<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Category;
use Illuminate\Http\Request;

class BudgetController extends Controller
{
    public function index(Request $request)
    {
        $budgets = Budget::with('category')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($budgets);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'limit_amount' => 'required|numeric|min:1',
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:2000',
        ]);

        $category = Category::find($validated['category_id']);

        if ($category->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Kategori bukan milik Anda'
            ], 403);
        }

        $exists = Budget::where('user_id', $request->user()->id)
            ->where('category_id', $validated['category_id'])
            ->where('month', $validated['month'])
            ->where('year', $validated['year'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Budget kategori ini sudah ada untuk bulan tersebut.'
            ], 422);
        }

        $budget = Budget::create([
            'user_id' => $request->user()->id,
            ...$validated
        ]);

        return response()->json([
            'message' => 'Budget berhasil dibuat',
            'data' => $budget
        ], 201);
    }

    public function show(Request $request, Budget $budget)
    {
        if ($budget->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        return response()->json($budget->load('category'));
    }

    public function update(Request $request, Budget $budget)
    {
        if ($budget->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        $validated = $request->validate([
            'limit_amount' => 'required|numeric|min:1'
        ]);

        $budget->update($validated);

        return response()->json([
            'message' => 'Budget berhasil diupdate',
            'data' => $budget
        ]);
    }

    public function destroy(Request $request, Budget $budget)
    {
        if ($budget->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        $budget->delete();

        return response()->json([
            'message' => 'Budget berhasil dihapus'
        ]);
    }
}