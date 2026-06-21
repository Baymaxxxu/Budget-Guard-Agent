<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * GET /api/categories
     */
    public function index(Request $request)
    {
        $categories = $request->user()
            ->categories()
            ->latest()
            ->get();

        return response()->json($categories);
    }

    /**
     * POST /api/categories
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'icon' => 'nullable|string|max:255',
        ]);

        $category = $request->user()
            ->categories()
            ->create($validated);

        return response()->json([
            'message' => 'Kategori berhasil dibuat',
            'data' => $category,
        ], 201);
    }

    /**
     * GET /api/categories/{category}
     */
    public function show(Request $request, Category $category)
    {
        if ($category->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Forbidden',
            ], 403);
        }

        return response()->json($category);
    }

    /**
     * PUT /api/categories/{category}
     */
    public function update(Request $request, Category $category)
    {
        if ($category->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Forbidden',
            ], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'icon' => 'nullable|string|max:255',
        ]);

        $category->update($validated);

        return response()->json([
            'message' => 'Kategori berhasil diupdate',
            'data' => $category,
        ]);
    }

    /**
     * DELETE /api/categories/{category}
     */
    public function destroy(Request $request, Category $category)
    {
        if ($category->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Forbidden',
            ], 403);
        }

        $category->delete();

        return response()->json([
            'message' => 'Kategori berhasil dihapus',
        ]);
    }
}