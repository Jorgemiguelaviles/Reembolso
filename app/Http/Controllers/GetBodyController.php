<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Formulario;
use App\Models\Inforeembolso;


class GetBodyController extends Controller
{
    public function getAllDataFilter(Request $request)
    {
        // Obter o parâmetro 'cabecalhoId' da URL
        $cabecalhoId = $request->input('cabecalhoId');

        // Obter os dados da tabela Formulario onde 'inforeembolso_id' seja igual ao valor passado
        $form = Formulario::where('inforeembolso_id', $cabecalhoId)->get();
        $info = Inforeembolso::where('id', $cabecalhoId)->get();

        return response()->json(['dados' => [$form, $info]]);
    }
}
