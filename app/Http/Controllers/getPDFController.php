<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserExternal;

class GetPDFController extends Controller
{
    public function getCPF(Request $request)
    {
       

        // Obter o nome de usuário do Request
        $username = $request->all()[0];

        // Buscar usuário pelo nome de usuário
        $user = UserExternal::where('Nome', $username)->first();

        if (!$user) {
           return response()->json(['error' => 'Usuário não encontrado'], 404);
        }


        return response()->json(['resposta' => [$user]]);
    }
}
