<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inforeembolso extends Model
{
    protected $table = 'inforeembolso'; // Nome da tabela

    // Lista de atributos
    protected $fillable = [
        'ids_grupos',
        'id_gestor',
        'id_solicitante',
        'TipoDeEmpresa',
        'objetivo',
        'status',
        'chapa',
        'obra',
        'departamento',
        'cpf',
        'gestor',
        'centro_de_custo',
        'data',
        'periodo',
        'ate',
        'direcionado_ao_centro_de_custo',
        'active',
        'Solicitante',
        'motivoDoCancelamento',
        'ultimaAtualizacao',
        'SomaTotalDosValores',
        'designationpeople',
    ];

    // Defina relacionamentos, acessores, mutadores ou outros métodos, se necessário
}
