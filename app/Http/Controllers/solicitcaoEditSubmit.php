<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inforeembolso;
use App\Models\Formulario;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use App\Models\UserExternal;
use Illuminate\Support\Facades\Mail;

class solicitcaoEditSubmit extends Controller
{




    public function solicitcaoEditSubmit(Request $request)
    {

        function gerarNomeAleatorio()
        {
            // Obtém a data e hora atual
            $dataHoraAtual = Carbon::now();
            // Formata a data e hora atual para o formato desejado
            $nomeAleatorio = $dataHoraAtual->format('YmdHisv');

            // Adiciona uma parte aleatória ao nome para garantir unicidade
            $nomeAleatorio .= "_" . uniqid();

            return $nomeAleatorio;
        }
        $rules = [
            '0' => 'required|string',
            '1' => 'nullable|string',
            '2' => 'required|string',
            '3' => 'required|string',
            '4' => 'nullable|string',
            '5' => 'required|string',
            '6' => 'required|date',
            '7' => 'required|date|after_or_equal:periodo',
            '8' => 'required|string',
            '9' => 'required|numeric',
            '10' => 'required|string',
            '11' => 'required|string',
            '12' => 'required|string',
        ];

        $camposDoBanco = $request->input('camposDoBanco');
        $dadosParaEnviar = $request->input('dadosParaEnviar');
        $camposDoBanco1 = $camposDoBanco['camposDoBanco'];


        $designationName = $camposDoBanco1[13] ?? null;
        $inputbool = $camposDoBanco1[14] ?? null;


        if ($designationName && $inputbool) {
            $rules[13] = 'nullable|string';
        }



        $rules2 = [
            'data' => 'required|date',
            'descricao' => 'required|string',
            'despesa' => 'required|string',
            'quantidade' => 'required|numeric',
            'total' => 'required|numeric',
            'valor' => 'required|numeric',
            'itsdolar' => 'required|string'
        ];




        $Somavalue = 0;
        foreach ($dadosParaEnviar as $index => $value) {
            $Somavalue = $Somavalue + $value['total'];
        }



        $validator = Validator::make($camposDoBanco1, $rules);
        if ($validator->fails()) {
            // Retorna uma resposta com os erros de validação
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $gestor = $camposDoBanco1[4] ?? null;
        $nomeSolicitante = $camposDoBanco1[10] ?? null;
        $emailContabilidadeResponsavel = UserExternal::where('ReembolsoContabilidadereembolso', true)->pluck('email');

        foreach ($emailContabilidadeResponsavel as $index => $email) {
            if ($email != null) {
                $email = $email;


                Mail::send('usuarioEditaSolicitacaoParaContabilidade', ['usuario' => $nomeSolicitante], function ($message) use ($email) {
                    $message->to($email);
                    $message->subject('Atualização de Status');
                    $message->from('notify@alpina.com.br', 'Solicitação de reembolso');
                });
            }
        }


        $objetivo = $camposDoBanco1[0] ?? null;
        $obra = $camposDoBanco1[1] ?? 'Uso em consumo';
        $departamento = $camposDoBanco1[2] ?? null;
        $cpf = $camposDoBanco1[3] ?? null;

        $Centrodecustos = $camposDoBanco1[5] ?? null;
        date_default_timezone_set('America/Sao_Paulo');
        $dataLocal = date('Y-m-d H:i:s');
        $Periodo = $camposDoBanco1[6] ?? null;
        $ate = $camposDoBanco1[7] ?? null;
        //$direcionadoAoCentroDeCusto = $camposDoBanco1[8] ?? null;
        $Chapa = $camposDoBanco1[9] ?? null;

        $acesso = $camposDoBanco1[11] ?? null;
        $tipoDeEmpresa = $camposDoBanco1[12] ?? null;

        $cabecalhoId = $request->query('parametro');

        $all = $request->all();







        $status = 'Pendente';

        if ($acesso === 'ContabilidadeRembolso') {
            $status = 'Pre-aprovado';
        }

        if ($gestor === null) {
            $status = 'Aprovado';
        }


        $Inforeembolso = Inforeembolso::where('id', $cabecalhoId)->first();
        $Inforeembolso->objetivo = $objetivo;
        $Inforeembolso->status = $status;
        $Inforeembolso->obra = $obra;
        $Inforeembolso->departamento = $departamento;
        $Inforeembolso->cpf = $cpf;
        $Inforeembolso->gestor = $gestor;
        $Inforeembolso->centro_de_custo = $Centrodecustos;
        $Inforeembolso->data = $dataLocal;
        $Inforeembolso->periodo = $Periodo;
        $Inforeembolso->ate = $ate;
        $Inforeembolso->chapa = $Chapa;
        $Inforeembolso->SomaTotalDosValores = $Somavalue;
        $Inforeembolso->motivoDoCancelamento = null;
        $Inforeembolso->TipoDeEmpresa = $tipoDeEmpresa;
        $Inforeembolso->ultimaAtualizacao = $nomeSolicitante;
        $Inforeembolso->designationpeople = $designationName ?? $nomeSolicitante;


        $Inforeembolso->save();

        Formulario::where('inforeembolso_id', $cabecalhoId)->update(['active' => false]);





        //analisar Dados para enviar pois nem se tera o $_FILES


        foreach ($dadosParaEnviar as $index => $type2) {
            $data = $type2['data'];
            $descricao = $type2['descricao'];
            $despesa = $type2['despesa'];
            $quantidade = $type2['quantidade'];
            $total = $type2['total'];
            $valor = $type2['valor'];
            $itsdolar = $type2['itsdolar'];
            $pagamento = $type2['pagamento'];
            $direcionadoPara = $type2['direcionadoPara'];






            $validator2 = Validator::make($type2, $rules2);
            if ($validator2->fails()) {
                // Retorna uma resposta com os erros de validação
                return response()->json(['errors' => $validator2->errors()], 400);
            }

            if (isset($_FILES) && !empty($_FILES)) {
                $extension = pathinfo($_FILES['dadosParaEnviar']['full_path'][$index]['anexos'][0], PATHINFO_EXTENSION);
                $nome = gerarNomeAleatorio();
                $tempname = $_FILES['dadosParaEnviar']['tmp_name'][$index]['anexos'][0];

                $name = $nome . '.' . $extension;
                $caminhoDataBase = 'http://10.0.0.183/imgsReembolso/';
                $caminhoTransferencia = '/var/www/html/imgsReembolso/';
                $nomeTransferencia = $caminhoTransferencia . $name;
                $nomeDatabase = $caminhoDataBase . $name;

                $novoFormulario = new Formulario([
                    'despesa' => $despesa,
                    'valor' => $valor,
                    'quantidade' => $quantidade,
                    'total' => $total,
                    'descricao' => $descricao,
                    'inforeembolso_id' => $cabecalhoId,
                    'anexo_path' => $nomeDatabase,
                    'Solicitante' => $nomeSolicitante,
                    'itsdolar' => $itsdolar,
                    'tipoDePagamento' => $pagamento,
                    'data' => $data,
                    'direcionado_ao_centro_de_custo' => $direcionadoPara,
                ]);

                $novoFormulario->save();

                move_uploaded_file($tempname, $nomeTransferencia);
            } else {

                $novoFormulario = new Formulario([
                    'despesa' => $despesa,
                    'valor' => $valor,
                    'quantidade' => $quantidade,
                    'total' => $total,
                    'descricao' => $descricao,
                    'inforeembolso_id' => $cabecalhoId,
                    'Solicitante' => $nomeSolicitante,
                    'itsdolar' => $itsdolar,
                    'tipoDePagamento' => $pagamento,
                    'data' => $data,
                    'direcionado_ao_centro_de_custo' => $direcionadoPara,
                ]);

                $novoFormulario->save();
            }
        }






        return response()->json([
            'dadosParaEnviar' => $dadosParaEnviar,
            'camposDoBanco1' => $camposDoBanco1,
            'acesso' => $acesso,
            'Inforeembolso' => $Inforeembolso,
        ]);
    }
}
