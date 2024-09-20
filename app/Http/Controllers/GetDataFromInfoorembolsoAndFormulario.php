<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inforeembolso;
use App\Models\Formulario;
use Exception;

class GetDataFromInfoorembolsoAndFormulario extends Controller
{
    public function getAllData(Request $request)
    {
        try {
            $all = $request->all();
            $nde = $request->input('nde');
            $nate = $request->input('nate');
            $access = $request->input('access');
            $myId = $request->input('myId');
            $nome = $request->input('nome');

            if ($access == 'ComumRembolso') {
                $query = Inforeembolso::orderBy('updated_at', 'desc');
                $query->where('id_solicitante', $myId);
            } elseif ($access == 'GestorRembolso') {
                if (!is_null($myId)) {
                    $query = Inforeembolso::orderBy('updated_at', 'desc');
                    $query->where(function ($query) use ($myId, $nome) {
                        $query->where('Solicitante', $nome)
                            ->orWhere('id_gestor', $myId)
                            ->orWhere('gestor', $nome)
                            ->orWhere('id_solicitante', $myId);
                    });
                } else {
                    $query = Inforeembolso::whereRaw('1 = 0'); // Não retorna nada se $myId for null
                }
            } else {
                $query = Inforeembolso::orderBy('updated_at', 'desc');
            }

            $Inforeembolso = $query->get();
            $allDatas = Inforeembolso::orderBy('updated_at', 'desc')->get();

            $formattedData = [];
            foreach ($Inforeembolso as $index => $info) {
                if ($index >= $nde && $index < $nate) {
                    $formattedData[] = [
                        'index' => $index + 1, // +1 para começar do índice 1
                        'id' => $info->id,
                        'Solicitante' => $info->designationpeople,
                        'SomaTotalDosValores' => $info->SomaTotalDosValores,
                        'TipoDeEmpresa' => $info->TipoDeEmpresa,
                        'active' => $info->active,
                        'ate' => $info->ate,
                        'centro_de_custo' => $info->centro_de_custo,
                        'chapa' => $info->chapa,
                        'cpf' => $info->cpf,
                        'created_at' => $info->created_at,
                        'data' => $info->data,
                        'departamento' => $info->departamento,
                        'gestor' => $info->gestor,
                        'id_gestor' => $info->id_gestor,
                        'id_solicitante' => $info->id_solicitante,
                        'ids_grupos' => $info->ids_grupos,
                        'motivoDoCancelamento' => $info->motivoDoCancelamento,
                        'objetivo' => $info->objetivo,
                        'obra' => $info->obra,
                        'periodo' => $info->periodo,
                        'status' => $info->status,
                        'ultimaAtualizacao' => $info->ultimaAtualizacao,
                        'updated_at' => $info->updated_at,
                    ];
                }
            }

            $ultimoId = Inforeembolso::max('id');

            return response()->json([
                'ultimoId' => $ultimoId,
                'all' => $all,
                'Inforeembolso' => $formattedData,
                'list' => $Inforeembolso,
                'myId' => $myId,
                'nome' => $nome,
                'allDatas' => $allDatas,
            ]);
        } catch (Exception $e) {
            // Em caso de erro, retorna uma mensagem com o erro capturado
            return response()->json([
                'error' => 'An error occurred while processing your request.',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }
}
