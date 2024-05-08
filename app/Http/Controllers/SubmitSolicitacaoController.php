<?php

namespace App\Http\Controllers;

use App\Models\Inforeembolso;
use Illuminate\Http\Request;

class SubmitSolicitacaoController extends Controller
{
    public function SubmitSolicitacao(Request $request)
    {
        $camposDoBanco = $request->input('camposDoBanco');
        $dadosParaEnviar = $request->input('dadosParaEnviar');

        foreach ($dadosParaEnviar as $item) {
            $novaSolicitacao = new Inforeembolso();
            $novaSolicitacao->objetivo = $camposDoBanco[2];
            $novaSolicitacao->obra = $camposDoBanco[3];
            $novaSolicitacao->departamento = $camposDoBanco[4];
            $novaSolicitacao->cpf = $camposDoBanco[5];
            $novaSolicitacao->gestor = $camposDoBanco[6];
            $novaSolicitacao->centro_de_custo = $camposDoBanco[7];
            $novaSolicitacao->data = $item['data'];
            $novaSolicitacao->periodo = $camposDoBanco[8];
            $novaSolicitacao->ate = $camposDoBanco[9];
            $novaSolicitacao->despesa = $item['despesa'];
            $novaSolicitacao->status = 'pendente'; // ou qualquer valor padrão desejado
            $novaSolicitacao->valor = $item['valor'];
            $novaSolicitacao->quantidade = $item['quantidade'];
            $novaSolicitacao->total = $item['total'];
            $novaSolicitacao->descricao = $item['descricao'];
            $novaSolicitacao->direcionado_ao_centro_de_custo = $camposDoBanco[10];
            // Considerando que 'anexo', 'created_at' e 'updated_at' serão definidos automaticamente pelo Eloquent

            $novaSolicitacao->save();
        }

        return response()->json($dadosParaEnviar);
    }
}
