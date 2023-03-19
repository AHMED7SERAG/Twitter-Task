<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Task;
use App\Models\Account;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function recursive()
    {
        $categories = DB::table('categories')
        ->selectRaw('categories.*, (COUNT(parent.name) - 1) as depth')
        ->leftJoin('categories as parent', function ($join) {
            $join->on('categories.lft', '>', 'parent.lft')
                ->on('categories.lft', '<', 'parent.rgt');
        })
        ->groupBy('categories.id')
        ->orderBy('categories.lft')
        ->get();
        return $categories ;
    }
    public function index()
    {
        $accounts = Account::all();
        $projects = Project::all();
        $jobs = Job::all();
        $tasks = Task::all();
        // Select tasks that belong to a project with a price less than 100
        $tasks = Task::whereIn('project_id', function ($query) {
            $query->select('id')->from('projects')->where('price', '<', 100);
        })->get();
        return $tasks;
    }
}
