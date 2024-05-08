<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inforeembolso;
use App\Models\Formulario;

class solicitcaoEdit extends Controller
{
    public function getFilterData(Request $request)
    {
        // Acessa o valor enviado via GET com a chave 'cabecalhoId'
        $cabecalhoId = $request->query('parametro');

        // Agora você pode usar $cabecalhoId para qualquer coisa que precisar.

        $Inforeembolso = Inforeembolso::where('id', $cabecalhoId)->get();

        $Formulario = Formulario::where('inforeembolso_id', $cabecalhoId)->get();


        return response()->json([
            'Inforeembolso' => $Inforeembolso,
            'Formulario' => $Formulario,
            'cabecalhoId' => $cabecalhoId, // Incluí o valor de cabecalhoId na resposta JSON
        ]);
    }
}
