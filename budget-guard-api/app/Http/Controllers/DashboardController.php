<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Transaction;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $month = now()->month;
        $year = now()->year;

        $totalBudget = Budget::where('user_id', $userId)
            ->where('month', $month)
            ->where('year', $year)
            ->sum('limit_amount');

        $totalSpent = Transaction::where('user_id', $userId)
            ->whereMonth('transaction_date', $month)
            ->whereYear('transaction_date', $year)
            ->sum('amount');

        $remaining = $totalBudget - $totalSpent;

        $percentage = $totalBudget > 0
            ? round(($totalSpent / $totalBudget) * 100, 2)
            : 0;

        return response()->json([
            'total_budget' => (float) $totalBudget,
            'total_spent' => (float) $totalSpent,
            'remaining' => (float) $remaining,
            'percentage' => $percentage,
        ]);
    }

    public function categories(Request $request)
    {
        $userId = $request->user()->id;

        $month = now()->month;
        $year = now()->year;

        $budgets = Budget::with('category')
            ->where('user_id', $userId)
            ->where('month', $month)
            ->where('year', $year)
            ->get();

        $data = $budgets->map(function ($budget) use ($userId, $month, $year) {

            $spent = Transaction::where('user_id', $userId)
                ->where('category_id', $budget->category_id)
                ->whereMonth('transaction_date', $month)
                ->whereYear('transaction_date', $year)
                ->sum('amount');

            $percentage = $budget->limit_amount > 0
                ? round(($spent / $budget->limit_amount) * 100, 2)
                : 0;

            $status = 'approved';

            if ($percentage > 100) {
                $status = 'blocked';
            } elseif ($percentage >= 80) {
                $status = 'warning';
            }

            return [
                'category' => $budget->category->name,
                'spent' => (float) $spent,
                'budget' => (float) $budget->limit_amount,
                'percentage' => $percentage,
                'status' => $status,
            ];
        });

        return response()->json($data);
    }
}