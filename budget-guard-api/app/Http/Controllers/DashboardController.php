<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        /*
        |--------------------------------------------------------------------------
        | SUMMARY
        |--------------------------------------------------------------------------
        */

        $income = Transaction::where('user_id', $userId)
            ->where('type', 'income')
            ->sum('amount');

        $expense = Transaction::where('user_id', $userId)
            ->where('type', 'expense')
            ->sum('amount');

        $budget = Budget::where('user_id', $userId)
            ->sum('limit_amount');

        $balance = $income - $expense;

        /*
        |--------------------------------------------------------------------------
        | CATEGORY CHART
        |--------------------------------------------------------------------------
        */

        $categoryChart = Transaction::select(
                'categories.name',
                DB::raw('SUM(transactions.amount) as total')
            )
            ->join('categories', 'transactions.category_id', '=', 'categories.id')
            ->where('transactions.user_id', $userId)
            ->where('transactions.type', 'expense')
            ->groupBy('categories.name')
            ->pluck('total', 'name');

        /*
        |--------------------------------------------------------------------------
        | MONTHLY EXPENSE
        |--------------------------------------------------------------------------
        */

        $monthlyExpense = Transaction::select(

                DB::raw("EXTRACT(MONTH FROM transaction_date) as month"),

                DB::raw("SUM(amount) as total")

            )
            ->where('user_id', $userId)
            ->where('type', 'expense')
            ->groupBy(DB::raw("EXTRACT(MONTH FROM transaction_date)"))
            ->orderBy(DB::raw("EXTRACT(MONTH FROM transaction_date)"))
            ->get();

        $months = [

            1 => 'Jan',
            2 => 'Feb',
            3 => 'Mar',
            4 => 'Apr',
            5 => 'Mei',
            6 => 'Jun',
            7 => 'Jul',
            8 => 'Agu',
            9 => 'Sep',
            10 => 'Okt',
            11 => 'Nov',
            12 => 'Des'

        ];

        $expenseChart = [];

        foreach ($monthlyExpense as $item) {

            $expenseChart[$months[(int)$item->month]] = (float) $item->total;

        }

        /*
        |--------------------------------------------------------------------------
        | RECENT TRANSACTION
        |--------------------------------------------------------------------------
        */

        $recentTransactions = Transaction::with('category')

            ->where('user_id', $userId)

            ->latest('transaction_date')

            ->take(5)

            ->get();

        /*
        |--------------------------------------------------------------------------
        | RECENT BUDGET
        |--------------------------------------------------------------------------
        */

        $recentBudgets = Budget::with('category')

            ->where('user_id', $userId)

            ->latest()

            ->take(5)

            ->get();

        /*
        |--------------------------------------------------------------------------
        | NOTIFICATION
        |--------------------------------------------------------------------------
        */

        $notifications = [];

        /*
        |------------------------------------------------------------
        | Ambil semua budget user
        |------------------------------------------------------------
        */

        $budgets = Budget::with('category')
            ->where('user_id', $userId)
            ->get();

        /*
        |------------------------------------------------------------
        | Ambil total pengeluaran per kategori + bulan + tahun
        | Hanya 1 query
        |------------------------------------------------------------
        */

        $spentTransactions = Transaction::select(
                'category_id',
                DB::raw('EXTRACT(MONTH FROM transaction_date) as month'),
                DB::raw('EXTRACT(YEAR FROM transaction_date) as year'),
                DB::raw('SUM(amount) as spent')
            )
            ->where('user_id', $userId)
            ->where('type', 'expense')
            ->groupBy(
                'category_id',
                DB::raw('EXTRACT(MONTH FROM transaction_date)'),
                DB::raw('EXTRACT(YEAR FROM transaction_date)')
            )
            ->get();

        /*
        |------------------------------------------------------------
        | Ubah menjadi Collection agar pencarian cepat
        |------------------------------------------------------------
        */

        $spentMap = [];

        foreach ($spentTransactions as $item) {

            $key = $item->category_id . '-' . $item->month . '-' . $item->year;

            $spentMap[$key] = $item->spent;

        }

        /*
        |------------------------------------------------------------
        | Generate Notification
        |------------------------------------------------------------
        */

        foreach ($budgets as $budget) {

            $key = $budget->category_id . '-' . $budget->month . '-' . $budget->year;

            $spent = $spentMap[$key] ?? 0;

            if ($spent >= $budget->limit_amount) {

                $notifications[] = [

                    'type' => 'danger',

                    'category' => $budget->category->name,

                    'spent' => $spent,

                    'limit' => $budget->limit_amount,

                    'message' => 'Budget "' . $budget->category->name . '" telah melebihi limit.'

                ];

            }

            elseif ($spent >= ($budget->limit_amount * 0.8)) {

                $notifications[] = [

                    'type' => 'warning',

                    'category' => $budget->category->name,

                    'spent' => $spent,

                    'limit' => $budget->limit_amount,

                    'message' => 'Budget "' . $budget->category->name . '" hampir habis.'

                ];
    }
}