<?php

namespace App\Http\Controllers;

use App\Models\Despesa;
use Illuminate\Http\Request;

class DespesaControllerRead extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getDespesas()
    {
        // Recupera todas as despesas do banco de dados
        $despesas = Despesa::all();

        // Retorna os dados das despesas no formato JSON
        return response()->json($despesas);
    }
}
