<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EnviarSolicitacao;
//use App\Http\Controllers\SubmitSolicitacaoController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AtualizarStatusController;
use App\Http\Controllers\FiltersController;
use App\Http\Controllers\FormularioController;
use App\Http\Controllers\GetDataFromInfoorembolsoAndFormulario;
use App\Http\Controllers\GetBodyController;
use App\Http\Controllers\solicitcaoEdit;
use App\Http\Controllers\solicitcaoEditSubmit;
use App\Http\Controllers\BladeViewController;
use App\Http\Controllers\DespesaControllerRead;
use App\Http\Controllers\CreateDespesa;
use App\Http\Controllers\DespesaUpdateController;
use App\Http\Controllers\DespesaStatusController;
use App\Http\Controllers\SearchEmployeeController;
use App\Http\Controllers\getPDFController;

Route::get('/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
});


// Define a rota inicial para /login
Route::redirect('/', '/login');

// Define a rota para validar o login
Route::get('/getDatabase', [GetDataFromInfoorembolsoAndFormulario::class, 'getAllData']);
Route::get('/getDatabaseBody', [GetBodyController::class, 'getAllDataFilter']);




Route::get('/solicitcaoEdit', [solicitcaoEdit::class, 'getFilterData']);
Route::get('/visualizarBlade', [BladeViewController::class, 'VizualizationBlade']);

Route::get('/despesas', [DespesaControllerRead::class, 'getDespesas']);



// Define a rota para renderizar a página do aplicativo Inertia
Route::get('/{page}', function () {
    return Inertia::render('app');
})->where('page', '.*');

Route::post('/despesas/{id}/status', [DespesaStatusController::class, 'updateStatus']);

Route::post('/despesascreate', [CreateDespesa::class, 'createController']);

Route::post('/despesas/{id}/update', [DespesaUpdateController::class, 'update']);

// Define a rota para validar o login
Route::post('/datalogin', [LoginController::class, 'validarLogin']);

// Rota para enviar solicitação
Route::post('/solicitacao', [EnviarSolicitacao::class, 'enviarSolicitacao']);

Route::post('/solicitcaoEditSubmit', [solicitcaoEditSubmit::class, 'solicitcaoEditSubmit']);

// Defina a rota para o método statusFuncionando
Route::post('/status', [AtualizarStatusController::class, 'statusFuncionando']);

Route::post('/filters', [FiltersController::class, 'filtersFuncionando']);

Route::post('/searcheemployee', [SearchEmployeeController::class, 'search']);
Route::post('/getCPF', [getPDFController::class, 'getCPF']);
