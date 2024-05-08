<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inforeembolso;
use App\Models\Formulario;
use App\Models\UserExternal;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;


class EnviarSolicitacao extends Controller
{
    // Método para enviar uma nova solicitação
    public function enviarSolicitacao(Request $request)
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
            'itsdolar' => 'required|string',
            'pagamento' => 'required|string'
        ];



        $all = $request->all();






        $validator = Validator::make($camposDoBanco1, $rules);
        if ($validator->fails()) {
            // Retorna uma resposta com os erros de validação
            return response()->json(['errors' => $validator->errors()], 400);
        }


        $Somavalue = 0;
        foreach ($dadosParaEnviar as $index => $value) {
            $Somavalue = $Somavalue + $value['total'];
        }




        $objetivo = $camposDoBanco1[0] ?? null;
        $obra = $camposDoBanco1[1] ?? 'Uso em consumo';
        $departamento = $camposDoBanco1[2] ?? null;
        $cpf = $camposDoBanco1[3] ?? null;
        $gestor = $camposDoBanco1[4] ?? null;
        $Centrodecustos = $camposDoBanco1[5] ?? null;



        date_default_timezone_set('America/Sao_Paulo');
        $dataLocal = date('Y-m-d H:i:s');


        $Periodo = $camposDoBanco1[6] ?? null;
        $ate = $camposDoBanco1[7] ?? null;
        $direcionadoAoCentroDeCusto = $camposDoBanco1[8] ?? null;
        $Chapa = $camposDoBanco1[9] ?? null;
        $nomeSolicitante = $camposDoBanco1[10];
        $acesso = $camposDoBanco1[11] ?? null;
        $tipoDeEmpresa = $camposDoBanco1[12] ?? null;


        $emailGestorResponsavel = UserExternal::where('Nome', $gestor)->value('email');
        $emailsolicitanteResponsavel = UserExternal::where('Nome', $nomeSolicitante)->value('email');
        $emailContabilidadeResponsavel = UserExternal::where('ReembolsoContabilidadereembolso', true)->pluck('email');

        $status = 'Pendente';

        if ($acesso === 'ContabilidadeRembolso') {
            $status = 'Pre-aprovado';
        }

        if ($gestor === null) {
            $status = 'Aprovado';
        }

        if ($status === 'Pre-aprovado') {
            $emailList = array_filter([$emailsolicitanteResponsavel, $emailGestorResponsavel]);
            if (!empty($emailList)) {
                try {
                    Mail::send('contabilidadeAtualizaStatusSemiAprovado', ['usuario' => $nomeSolicitante], function ($message) use ($emailList) {
                        $message->to($emailList);
                        $message->subject('Atualização de Status');
                        $message->from('notify@alpina.com.br', 'Solicitação de reembolso');
                    });
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Erro ao enviar e-mail: ' . $e->getMessage()], 500);
                }
            }
        } else {
            foreach ($emailContabilidadeResponsavel as $index => $email) {
                if ($email != null) {
                    $email = $email;


                    Mail::send('usuarioCriaSolicitacaoParaContabilidade', ['usuario' => $nomeSolicitante], function ($message) use ($email) {
                        $message->to($email);
                        $message->subject('Atualização de Status');
                        $message->from('notify@alpina.com.br', 'Solicitação de reembolso');
                    });
                }
            }
        }













        $novoInforeembolso = new Inforeembolso([
            'objetivo' => $objetivo,
            'status' => $status,
            'obra' => $obra,
            'departamento' => $departamento,
            'cpf' => $cpf,
            'gestor' => $gestor,
            'centro_de_custo' => $Centrodecustos,
            'data' =>  $dataLocal,
            'periodo' =>  $Periodo,
            'ate' => $ate,
            'chapa' => $Chapa,
            'Solicitante' => $nomeSolicitante,
            'SomaTotalDosValores' => $Somavalue,
            'TipoDeEmpresa' => $tipoDeEmpresa,
            'designationpeople' => $designationName ?? $nomeSolicitante,
        ]);




        // Salva o novo registro no banco de dados
        $novoInforeembolso->save();

        // Pega o ID do registro inserido
        $idDoInforeembolso = $novoInforeembolso->id;

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

            //return response()->json(['mensagem' => $direcionadoPara], 201);




            $validator2 = Validator::make($type2, $rules2);
            if ($validator2->fails()) {
                // Retorna uma resposta com os erros de validação
                return response()->json(['errors' => $validator2->errors()], 400);
            }

            //return response()->json(['mensagem' => 'Sistema cadastrado com sucesso'], 201);

            if (isset($_FILES['dadosParaEnviar']['full_path'][$index]) && !empty($_FILES['dadosParaEnviar']['full_path'][$index])) {

                $extension = pathinfo($_FILES['dadosParaEnviar']['full_path'][$index]['anexos'][0], PATHINFO_EXTENSION);
                $nome = gerarNomeAleatorio();
                $tempname = $_FILES['dadosParaEnviar']['tmp_name'][$index]['anexos'][0];

                $name = $nome . '.' . $extension;
                $caminhoDataBase = 'http://10.0.0.183/imgsReembolso/';
                $caminhoTransferencia = '/var/www/html/imgsReembolso/';
                $nomeTransferencia = $caminhoTransferencia . $name;
                $nomeDatabase = $caminhoDataBase . $name;
                $novoFormulario = new Formulario([
                    //'direcionado_ao_centro_de_custo'
                    'despesa' => $despesa,
                    'valor' => $valor,
                    'quantidade' => $quantidade,
                    'total' => $total,
                    'descricao' => $descricao,
                    'inforeembolso_id' => $idDoInforeembolso,
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
                    //'direcionado_ao_centro_de_custo'
                    'despesa' => $despesa,
                    'valor' => $valor,
                    'quantidade' => $quantidade,
                    'total' => $total,
                    'descricao' => $descricao,
                    'inforeembolso_id' => $idDoInforeembolso,
                    'Solicitante' => $nomeSolicitante,
                    'itsdolar' => $itsdolar,
                    'tipoDePagamento' => $pagamento,
                    'data' => $data,
                    'direcionado_ao_centro_de_custo' => $direcionadoPara,
                ]);

                $novoFormulario->save();
            }
        }

        // Retornar listas para cada variável
        return response()->json(['mensagem' => 'Sistema cadastrado com sucesso'], 201);
    }
}
