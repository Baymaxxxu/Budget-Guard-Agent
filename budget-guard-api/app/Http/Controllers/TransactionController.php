<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * GET /api/transactions
     */
    public function index(Request $request)
    {
        $transactions = Transaction::with('category')
            ->where('user_id', $request->user()->id)
            ->latest('transaction_date')
            ->get();

        return response()->json($transactions);
    }

    /**
     * POST /api/transactions
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:1',
            'description' => 'nullable|string|max:255',
            'transaction_date' => 'required|date',
        ]);

        $category = Category::findOrFail($validated['category_id']);

        if ($category->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Kategori bukan milik Anda'
            ], 403);
        }

        $transaction = Transaction::create([
            'user_id' => $request->user()->id,
            ...$validated
        ]);

        return response()->json([
            'message' => 'Transaksi berhasil ditambahkan',
            'data' => $transaction->load('category')
        ], 201);
    }

    /**
     * GET /api/transactions/{transaction}
     */
    public function show(Request $request, Transaction $transaction)
    {
        if ($transaction->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        return response()->json(
            $transaction->load('category')
        );
    }

    /**
     * PUT /api/transactions/{transaction}
     */
    public function update(Request $request, Transaction $transaction)
    {
        if ($transaction->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:1',
            'description' => 'nullable|string|max:255',
            'transaction_date' => 'required|date',
        ]);

        $category = Category::findOrFail($validated['category_id']);

        if ($category->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Kategori bukan milik Anda'
            ], 403);
        }

        $transaction->update($validated);

        return response()->json([
            'message' => 'Transaksi berhasil diperbarui',
            'data' => $transaction->load('category')
        ]);
    }

    /**
     * DELETE /api/transactions/{transaction}
     */
    public function destroy(Request $request, Transaction $transaction)
    {
        if ($transaction->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        $transaction->delete();

        return response()->json([
            'message' => 'Transaksi berhasil dihapus'
        ]);
    }
}