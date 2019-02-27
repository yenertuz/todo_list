<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		//
		DB::table('users')->insert([
			'username' => "yenertuz",
			"password" => "yenertuz"
		]);

		DB::table('users')->insert([
			'username' => "aniqaelahi",
			"password" => "aniqaelahi"
		]);
    }
}
