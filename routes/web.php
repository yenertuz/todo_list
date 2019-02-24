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
    return view('test');
});

Route::get('/test', function () {
	header("Access-Control-Allow-Origin: *");
	return 'Hello there';
});

Route::get('/todos', function () {
	header("Access-Control-Allow-Origin: *");
	return response()->json(
		\App\Todo::all()
	);
});

Route::get('/todos/{id}', function ($id) {
	header("Access-Control-Allow-Origin: *");
	return response()->json(
		\App\Todo::find($id)
	);
});

Route::get('todos/new/{content}', function ($content) {
	header("Access-Control-Allow-Origin: *");
	$new_todo = App\Todo::create(['content' => $content]);
	return response()->json( $new_todo );
});

Route::post('/todos', function (Request $request) {
	header("Access-Control-Allow-Origin: *");
	return response()->json(
		App\Todo::create([
			'content' => $_POST['content']
		])
	);
});

Route::delete('/todos/{id}', function ($id) {	
	return response()->json(
		App\Todo::find($id)->delete()
	); });

Route::put("/todos/{id}", function ($id) {
	if (App\Todo::find($id) == null)
		return response(false);
	return response()->json( 
		App\Todo::find($id)->update(
			["content" => file_get_contents("php://input") ]
		)
	 );
});