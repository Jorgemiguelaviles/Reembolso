<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DailyEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $usuario;
    public $id_solicitacao;
    public $tipo;

    /**
     * Create a new message instance.
     *
     * @param string $usuario
     * @param int $id_solicitacao
     * @param string $tipo
     * @return void
     */
    public function __construct($usuario, $id_solicitacao, $tipo)
    {
        $this->usuario = $usuario;
        $this->id_solicitacao = $id_solicitacao;
        $this->tipo = $tipo;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $view = $this->getViewForTipo($this->tipo);

        return $this->view($view)
            ->subject('Atenção')
            ->with([
                'usuario' => $this->usuario,
                'id_solicitacao' => $this->id_solicitacao,
            ]);
    }

    /**
     * Get the view name based on the tipo.
     *
     * @param string $tipo
     * @return string
     */
    protected function getViewForTipo($tipo)
    {
        $views = [
            'alerta1' => 'contabilidadeAtualizaStatusFinalizado',
            'alerta2' => 'contabilidadeAtualizaStatusRejeitado',
            'alerta3' => 'contabilidadeAtualizaStatusSemiAprovado',
            'alerta4' => 'gestorAtualizaStatusAprova',
            'alerta5' => 'gestorAtualizaStatusCancela',
            'alerta6' => 'semGestorAprova',
            'alerta7' => 'SemGestorNOVA',
            'alerta8' => 'usuarioCriaSolicitacaoParaContabilidade',
            'alerta9' => 'usuarioEditaSolicitacaoParaContabilidade',
        ];

        return $views[$tipo] ?? 'defaultView';
    }
}
