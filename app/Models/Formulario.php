<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Formulario extends Model
{
    protected $fillable = [
        'conjunto',
        'despesa',
        'status',
        'valor',
        'quantidade',
        'total',
        'descricao',
        'anexo_path',
        'Solicitante',
        'ultimaAtualizacao',
        'itsdolar',
        'inforeembolso_id', // Remova a repeti��o dessa linha
        'active',
        'tipoDePagamento',
        'data',
        'direcionado_ao_centro_de_custo'    ];

    public function inforeembolso()
    {
        return $this->belongsTo(Inforeembolso::class);
    }
}
