<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Despesa;

class CreateDespesa extends Controller
{
    public function createController(Request $request)
    {
        $request->validate([
            'descricao' => 'required|string|max:400',
            'valor' => 'nullable|numeric',
            'codigo' => 'required|string|max:100',
            'conta_razao' => 'required|string|max:400',
            'Tipo_NF' => 'nullable|string|max:400',
            'qnt_editavel' => 'boolean',
            // Adicione outras validações conforme necessário para cada campo
        ]);

        // Criar uma nova instância do modelo Despesa e atribuir os valores dos campos
        $despesa = new Despesa();
        $despesa->descricao = $request->input('descricao');
        $despesa->valor = $request->input('valor');
        $despesa->codigo = $request->input('codigo');
        $despesa->conta_razao = $request->input('conta_razao');
        $despesa->Tipo_NF = $request->input('Tipo_NF');
        $despesa->qnt_editavel = $request->input('qnt_editavel');
        // Adicione outros campos conforme necessário

        // Salvar a despesa no banco de dados
        $despesa->save();


        return response()->json([
            'success' => true,
            'message' => 'Despesa criada com sucesso!',
            'despesa' => $despesa
        ]);
    }
}

