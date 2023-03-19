<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Account;
use App\Models\Project;
use App\Models\Job;
use App\Models\Task;

class DataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $account = Account::create(['name' => 'Account 1']);

        $project1 = $account->projects()->create(['name' => 'Project 1', 'price' => 50]);
        $project2 = $account->projects()->create(['name' => 'Project 2', 'price' => 150]);

        $project1->jobs()->create(['name' => 'Job 1', 'amount' => 25]);
        $project1->jobs()->create(['name' => 'Job 2', 'amount' => 50]);
        $project2->jobs()->create(['name' => 'Job 3', 'amount' => 75]);
        $project2->jobs()->create(['name' => 'Job 4', 'amount' => 100]);

        $project1->tasks()->create(['name' => 'Task 1']);
        $project1->tasks()->create(['name' => 'Task 2']);
        $project2->tasks()->create(['name' => 'Task 3']);
        $project2->tasks()->create(['name' => 'Task 4']);
    }
}
