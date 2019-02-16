<?php

use Illuminate\Database\Seeder;

class TodosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		//
		for ($i=0; $i < 20; $i++) {
			DB::table('todos')->insert([
				'content' => "dummy todo number {$i}"
			]);
		}
    }
}
