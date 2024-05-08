<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Despesa;

class DespesaUpdateController extends Controller
{
    public function update(Request $request, $id)
    {
        // Validação dos dados recebidos
        $validatedData = $request->validate([
            'descricao' => 'required|string',
            'valor' => 'nullable|numeric',
            'codigo' => 'required|string',
            'conta_razao' => 'required|string',
            'Tipo_NF' => 'nullable|string|max:400',
            'active' => 'boolean',
            'qnt_editavel' => 'boolean'
        ]);

        // Encontrar a despesa pelo ID
        $despesa = Despesa::findOrFail($id);

        
        $despesa->update($validatedData);

      
        if ($request->has('active')) {
          
            $despesa->update(['active' => $request->input('active')]);
        }

        if ($request->has('qnt_editavel')) {
           
            $despesa->update(['qnt_editavel' => $request->input('qnt_editavel')]);
        }

        return response()->json(['success' => true, 'message' => 'Despesa atualizada com sucesso', 'despesa' => $despesa]);
    }
}
