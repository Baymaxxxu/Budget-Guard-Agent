<?php

namespace App\Services;

use App\Models\Budget;
use App\Models\Transaction;

class BudgetGuardService
{
    public function check(
        int $userId,
        int $categoryId,
        float $amount,
        string $transactionDate
    ): array {
        $month = date('n', strtotime($transactionDate));
        $year = date('Y', strtotime($transactionDate));

        $budget = Budget::where('user_id', $userId)
            ->where('category_id', $categoryId)
            ->where('month', $month)
            ->where('year', $year)
            ->first();

        if (!$budget) {
            return [
                'status' => 'approved',
                'percentage' => 0,
                'message' => 'Budget belum dibuat'
            ];
        }

        $spent = Transaction::where('user_id', $userId)
            ->where('category_id', $categoryId)
            ->whereYear('transaction_date', $year)
            ->whereMonth('transaction_date', $month)
            ->sum('amount');

        $total = $spent + $amount;

        $percentage = round(
            ($total / $budget->limit_amount) * 100,
            2
        );

        $status = 'approved';

        if ($percentage > 100) {
            $status = 'blocked';
        } elseif ($percentage >= 80) {
            $status = 'warning';
        }

        return [
            'status' => $status,
            'percentage' => $percentage,
            'message' => null,
        ];
    }
}