<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inforeembolso;
use Mockery\Undefined;

class FiltersController extends Controller
{


    public function filtersFuncionando(Request $request)
    {
        try {
            // Obter os filtros do corpo da solicitação
            $filtros = $request->all();

            // Extrair os filtros individuais
            $filtroAbertoEm = $filtros['filtroAbertoEm'] ?? null;
            $filtroAte = $filtros['filtroAte'] ?? null;
            $filtroNumero = $filtros['filtroNumero'] ?? null;
            $filtroCentroDeCusto = $filtros['filtroCentroDeCusto'] ?? null;
            $filtroStatus = $filtros['filtroStatus']  ?? null;

            /*return response()->json(['success' => true, 'data' => [
                'filtroAbertoEm' => $filtroAbertoEm,
                'filtroAte' => $filtroAte,
            ]]);*/

            // Iniciar a consulta
            $Inforeembolsoget = Inforeembolso::query();

            // Aplicar os filtros
            // Verificar se ambos os filtros de data estão presentes
            if (!empty($filtroAbertoEm) && !empty($filtroAte)) {
                $Inforeembolsoget->whereBetween('data', [$filtroAbertoEm, $filtroAte]);
            }
            // Verificar se apenas o filtro de data de início está presente
            else if (!empty($filtroAbertoEm)) {
                // Se apenas o filtro de data de início estiver presente, configure o filtro de data final para a data máxima possível
                $Inforeembolsoget->whereBetween('data', [$filtroAbertoEm, now()->endOfDay()]);
            }
            // Verificar se apenas o filtro de data de término está presente
            else if (!empty($filtroAte)) {
                // Se apenas o filtro de data de término estiver presente, configure o filtro de data de início para a data mínima possível
                $Inforeembolsoget->whereBetween('data', [now()->startOfDay(), $filtroAte]);
            }

            if (!empty($filtroNumero)) {
                $Inforeembolsoget->where('chapa', 'LIKE', '%' . $filtroNumero . '%');
            }
            if (!empty($filtroCentroDeCusto)) {
                $Inforeembolsoget->where('centro_de_custo', 'LIKE', '%' . $filtroCentroDeCusto . '%');
            }
            if (!empty($filtroStatus)) {
                $Inforeembolsoget->where('status', 'LIKE', '%' . $filtroStatus . '%');
            }



            // Obter os resultados da consulta
            $listdatabase = $Inforeembolsoget->get();

            // Retornar os resultados em uma resposta JSON
            return response()->json(['success' => true, 'data' => [
                'listdatabase' => $listdatabase,
            ]]);
        } catch (\Exception $e) {
            // Tratamento de erros
            return response()->json(['error' => 'Erro ao filtrar as solicitações.'], 500);
        }
    }
}
