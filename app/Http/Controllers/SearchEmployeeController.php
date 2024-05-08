<?php

namespace App\Http\Controllers;

use App\Models\UserExternal;
use Illuminate\Http\Request;

class SearchEmployeeController extends Controller
{
    public function search(Request $request)
    {
        // Lógica para buscar funcionários com base nos parâmetros de pesquisa
        $all = $request->all();
        $name = $all[0];

        // Realizar a consulta no banco de dados
        $users = UserExternal::where('Gestor', $name)->get();

        $result = [];

        // Iterar sobre os usuários encontrados
        foreach ($users as $index => $user) {
            // Adicionar o nome do usuário ao array de resultados
            $result[] = $user->Nome;
        }

        return response()->json([
            'all' => $result,
        ]);
    }
}
