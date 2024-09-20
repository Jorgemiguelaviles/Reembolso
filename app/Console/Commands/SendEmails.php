<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\DailyEmail;
use App\Models\Inforeembolso;
use App\Models\UserExternal;

class SendEmails extends Command
{
    protected $signature = 'emails:send';
    protected $description = 'Send emails based on specific conditions';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Obtém os resultados com status 'Pre-aprovado'
        $resultados = Inforeembolso::where('status', 'Pre-aprovado')
            ->get(['gestor', 'id_gestor', 'id', 'Solicitante']); // Seleciona as colunas desejadas

        // Obtém gestores, id_gestores e ids
        $gestores = $resultados->pluck('gestor');
        $idGestores = $resultados->pluck('id_gestor');
        $ids = $resultados->pluck('id');
        $Solicitante = $resultados->pluck('Solicitante');

        echo $gestores;
        echo $idGestores;
        echo $Solicitante;
        //echo $emailsGestores;


        $emailsGestores = [];
        foreach ($resultados as $index => $resultado) {
            $gestor = $resultado->gestor;
            $idGestor = $resultado->id_gestor;

            // Obtém todos os emails dos gestores (mesmo que repetidos)
            $emails = UserExternal::whereIn('Nome', [$gestor])
                ->orWhereIn('id', [$idGestor])
                ->pluck('email');

            // Adiciona todos os e-mails encontrados à lista
            $emailsGestores = array_merge($emailsGestores, $emails->toArray());
        }


        // Mostra os e-mails coletados
        print_r($emailsGestores);






        // Envia emails para cada endereço encontrado
        foreach ($emailsGestores as $index => $email) {
            // Usa os índices para obter o usuário e ID correspondentes
            $usuario = $Solicitante[$index] ?? 'Usuário Desconhecido';
            $id_solicitacao = $ids[$index] ?? 0;
            $tipo = 'alerta3';

            Mail::to($email)->send(new DailyEmail($usuario, $id_solicitacao, $tipo));
        }

        $this->info('Emails have been sent!');
    }
}
