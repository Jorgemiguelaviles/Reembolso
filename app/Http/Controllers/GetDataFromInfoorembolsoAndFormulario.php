<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inforeembolso;
use App\Models\Formulario;

class GetDataFromInfoorembolsoAndFormulario extends Controller
{
    public function getAllData(Request $request)
    {
        $all = $request->all();
        $nde = $request->input('nde');
        $nate = $request->input('nate');
        $ultimoId = Inforeembolso::max('id');

        // Obter todos os registros do banco de dados ordenados por updated_at em ordem decrescente
        $Inforeembolso = Inforeembolso::orderBy('updated_at', 'desc')->get();

        // Obter os registros como um array com índices numéricos
        $InforeembolsoArray = $Inforeembolso->toArray();

        $list = [];
        // Iterar sobre cada registro de Inforeembolso e seus índices
        foreach (array_values($InforeembolsoArray) as $index => $info) {
            // Verificar se o índice está dentro do intervalo especificado por nde e nate
            if ($index >= $nde && $index <= $nate) {
                $list[] = $info;
            }
        }

        return response()->json(
            [
                'ultimoId' => $ultimoId,
                'all' => $all,
                'nde' => $nde,
                'nate' => $nate,
                'Inforeembolso' => $list,
                'list' => $list,
            ]
        );
    }
}
