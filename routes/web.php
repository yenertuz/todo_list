<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/todos', function () {
	return response()->json(
		\App\Todo::all()
	);
});

Route::get('/todos/{id}', function ($id) {
	return response()->json(
		\App\Todo::find($id)
	);
});

Route::get('todos/new/{content}', function ($content) {
	$new_todo = App\Todo::create(['content' => $content]);
	return response()->json( $new_todo );
});

Route::post('/todos', function (Request $request) {
	return response()->json(
		App\Todo::create([
			'content' => $_POST['content']
		])
	);
});