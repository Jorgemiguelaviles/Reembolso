<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inforeembolso;
use App\Models\Formulario;
use App\Models\UserExternal;
use Illuminate\Support\Facades\Mail;



class AtualizarStatusController extends Controller
{
    /**
     * Retorna uma mensagem básica indicando que está funcionando.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function statusFuncionando(Request $request)
    {
        $all = $request->all();

        $newStatus = $request->input('newStatus');
        $reasonforcancellation = $request->input('reasonforcancellation');


        $id = $request->input('id');

        $nome = $request->input('nome');

        $valuesLine = $request->input('valueesLine');



        $solicitanteLine = $valuesLine[0]['Solicitante'] ?? null;

        //return response()->json(['message' => $all]);


        $inforeembolso = Inforeembolso::find($id);
        $gestor = $inforeembolso['gestor'];







        $emailGestorResponsavel = UserExternal::where('Nome', $gestor)->value('email');
        $emailsolicitanteResponsavel = UserExternal::where('Nome', $solicitanteLine)->value('email');
        $emailContabilidadeResponsavel = UserExternal::where('ReembolsoContabilidadereembolso', true)->pluck('email');





        if ($newStatus === 'Rejeitado') {
            if ($emailsolicitanteResponsavel != null) {
                $email = $emailsolicitanteResponsavel;
                try {
                    Mail::send('contabilidadeAtualizaStatusRejeitado', ['usuario' => $solicitanteLine], function ($message) use ($email) {
                        $message->to($email);
                        $message->subject('Atualizacao de Status');
                        $message->from('notify@alpina.com.br', 'Solicitacao de reembolso');
                    });
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Erro ao enviar e-mail: ' . $e->getMessage()], 500);
                }
            }

            if ($emailGestorResponsavel != null) {
                $email = $emailGestorResponsavel;
                try {
                    Mail::send('contabilidadeAtualizaStatusRejeitado', ['usuario' => $solicitanteLine], function ($message) use ($email) {
                        $message->to($email);
                        $message->subject('Atualizacao de Status');
                        $message->from('notify@alpina.com.br', 'Solicitacao de reembolso');
                    });
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Erro ao enviar e-mail: ' . $e->getMessage()], 500);
                }
            }
        }


        if ($newStatus === 'Pre-aprovado') {
            $emailList = array_filter([$emailsolicitanteResponsavel, $emailGestorResponsavel]);
            if (!empty($emailList)) {
                try {
                    Mail::send('contabilidadeAtualizaStatusSemiAprovado', ['usuario' => $solicitanteLine], function ($message) use ($emailList) {
                        $message->to($emailList);
                        $message->subject('Atualizacao de Status');
                        $message->from('notify@alpina.com.br', 'Solicitacao de reembolso');
                    });
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Erro ao enviar e-mail: ' . $e->getMessage()], 500);
                }
            }
        } else if ($newStatus === 'Cancelado') {

            foreach ($emailContabilidadeResponsavel as $index => $email) {


                if ($email != null) {
                    try {
                        Mail::send('gestorAtualizaStatusCancela', ['usuario' => $solicitanteLine], function ($message) use ($email) {
                            $message->to($email);
                            $message->subject('Atualizacao de Status');
                            $message->from('notify@alpina.com.br', 'Solicitacao de reembolso');
                        });
                    } catch (\Exception $e) {
                        return response()->json(['error' => 'Erro ao enviar e-mail: ' . $e->getMessage()], 500);
                    }
                }
            }


            if ($emailsolicitanteResponsavel != null) {
                $email = $emailsolicitanteResponsavel;
                try {
                    Mail::send('gestorAtualizaStatusCancela', ['usuario' => $solicitanteLine], function ($message) use ($email) {
                        $message->to($email);
                        $message->subject('Atualizacao de Status');
                        $message->from('notify@alpina.com.br', 'Solicitacao de reembolso');
                    });
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Erro ao enviar e-mail: ' . $e->getMessage()], 500);
                }
            }
        } else if ($newStatus === 'Finalizado') {
            if ($emailsolicitanteResponsavel != null) {
                $email = $emailsolicitanteResponsavel;
                try {
                    Mail::send('contabilidadeAtualizaStatusFinalizado', ['usuario' => $solicitanteLine], function ($message) use ($email) {
                        $message->to($email);
                        $message->subject('Atualizacao de Status');
                        $message->from('notify@alpina.com.br', 'Solicitacao de reembolso');
                    });
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Erro ao enviar e-mail: ' . $e->getMessage()], 500);
                }
            }

            if ($emailGestorResponsavel != null) {
                $email = $emailGestorResponsavel;
                try {
                    Mail::send('contabilidadeAtualizaStatusFinalizado', ['usuario' => $solicitanteLine], function ($message) use ($email) {
                        $message->to($email);
                        $message->subject('Atualizacao de Status');
                        $message->from('notify@alpina.com.br', 'Solicitacao de reembolso');
                    });
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Erro ao enviar e-mail: ' . $e->getMessage()], 500);
                }
            }
        } else if ($newStatus === 'Aprovado') {
            foreach ($emailContabilidadeResponsavel as $index => $email) {
                if ($email != null) {
                    try {
                        Mail::send('gestorAtualizaStatusAprova', ['usuario' => $solicitanteLine], function ($message) use ($email) {
                            $message->to($email);
                            $message->subject('Atualizacao de Status');
                            $message->from('notify@alpina.com.br', 'Solicitacao de reembolso');
                        });
                    } catch (\Exception $e) {
                        return response()->json(['error' => 'Erro ao enviar e-mail: ' . $e->getMessage()], 500);
                    }
                }
            }



            if ($emailsolicitanteResponsavel != null) {
                $email = $emailsolicitanteResponsavel;
                try {
                    Mail::send('gestorAtualizaStatusAprova', ['usuario' => $solicitanteLine], function ($message) use ($email) {
                        $message->to($email);
                        $message->subject('Atualizacao de Status');
                        $message->from('notify@alpina.com.br', 'Solicitacao de reembolso');
                    });
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Erro ao enviar e-mail: ' . $e->getMessage()], 500);
                }
            }
        }



        if (!$inforeembolso) {
            return response()->json(['error' => 'Solicitação não encontrada'], 404);
        }

        $inforeembolso->status = $newStatus;

        $maxConjunto = Formulario::where('inforeembolso_id', $id)->max('conjunto');
        Formulario::where('inforeembolso_id', $id)
            ->where('conjunto', $maxConjunto)
            ->update(['status' => $newStatus]);

        if ($newStatus === 'Rejeitado' || $newStatus === 'Cancelado') {
            $inforeembolso->motivoDoCancelamento = $reasonforcancellation;
        }







        $inforeembolso->ultimaAtualizacao = $nome;

        $inforeembolso->save();



        return response()->json(['message' => 'Status atualizado com sucesso']);
    }
}
