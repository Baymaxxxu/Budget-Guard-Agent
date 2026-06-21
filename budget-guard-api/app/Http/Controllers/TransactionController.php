<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Notification;
use App\Services\BudgetGuardService;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $transactions = Transaction::with('category')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($transactions);
    }

    public function store(
    Request $request,
    BudgetGuardService $budgetGuard
)
{
    $validated = $request->validate([
        'category_id' => 'required|exists:categories,id',
        'amount' => 'required|numeric|min:1',
        'description' => 'nullable|string',
        'transaction_date' => 'required|date',
    ]);

    $category = Category::find(
        $validated['category_id']
    );

    if ($category->user_id !== $request->user()->id) {
        return response()->json([
            'message' => 'Kategori bukan milik Anda'
        ], 403);
    }

    $result = $budgetGuard->check(
        $request->user()->id,
        $validated['category_id'],
        $validated['amount'],
        $validated['transaction_date']
    );

    $transaction = Transaction::create([
        'user_id' => $request->user()->id,
        ...$validated,
        'status' => $result['status'],
        'percentage' => $result['percentage'],
    ]);

    if ($result['status'] !== 'approved') {

        Notification::create([
            'user_id' => $request->user()->id,
            'title' => 'Peringatan Budget',
            'message' =>
                "Pengeluaran kategori {$category->name} telah mencapai {$result['percentage']}%",
            'type' => $result['status'],
            'is_read' => false,
        ]);
    }

    return response()->json([
        'message' => 'Transaksi berhasil dibuat',
        'data' => $transaction,
    ], 201);
}

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

    public function update(Request $request, Transaction $transaction)
    {
        if ($transaction->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'description' => 'nullable|string',
            'transaction_date' => 'required|date',
        ]);

        $transaction->update($validated);

        return response()->json([
            'message' => 'Transaksi berhasil diupdate',
            'data' => $transaction
        ]);
    }

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