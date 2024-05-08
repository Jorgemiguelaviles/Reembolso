<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Despesa extends Model
{
    use HasFactory;

    protected $table = 'despesas'; // Nome da tabela associada ao modelo

    protected $fillable = [
        'descricao',
        'valor',
        'codigo',
        'conta_razao',
        'Tipo_NF',
        'active',
        'qnt_editavel'
    ]; // Atributos que podem ser preenchidos em massa

    // Se você estiver usando timestamps (created_at e updated_at), defina isso como true
    public $timestamps = false;
}
