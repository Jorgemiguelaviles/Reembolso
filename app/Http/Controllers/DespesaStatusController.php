<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Despesa;

class DespesaStatusController extends Controller
{
    public function updateStatus(Request $request, $id)
    {
        // Validação dos dados recebidos
        $request->validate([
            'active' => 'boolean', // Certifique-se de que 'active' é um booleano
        ]);

        // Encontre a despesa pelo ID
        $despesa = Despesa::findOrFail($id);

        // Atualize o status "active" da despesa
        $despesa->update(['active' => $request->input('active')]);

        // Retorne uma resposta JSON
        return response()->json(['success' => true, 'message' => 'Status da despesa atualizado com sucesso']);
    }
}
