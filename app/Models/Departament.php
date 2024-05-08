<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Support\Facades\Schema;

class Departament extends Model
{
    protected $table = 'departaments';
    protected $primaryKey = 'id';
    protected $fillable = [
        'NomeDoSetor',
        'DescricaoDepartamento',
        'status',
        'ComumEngenharia',
        'Engenharia',
        'AdministracaoRH',
        'ComumRembolso',
        'GestorRembolso',
        'ContabilidadeRembolso',
        'AdministracaoRembolso',
        'TI',
    ];

    public function users()
    {
        return $this->hasMany(UserExternal::class, 'id_departamento');
    }

    // M�todo para obter colunas dinamicamente
    public static function getDynamicColumns()
    {
        $table = new self();

        // Obt�m as colunas da tabela
        $columns = Schema::getColumnListing($table->getTable());

        // Remove colunas padr�o do Eloquent
        $defaultColumns = ['id', 'created_at', 'updated_at'];
        $dynamicColumns = array_diff($columns, $defaultColumns);

        return $dynamicColumns;
    }

    // Sobrescreva o m�todo toArray para incluir colunas din�micas
    public function toArray()
    {
        $array = parent::toArray();

        // Adicione colunas din�micas ao array
        foreach (self::getDynamicColumns() as $column) {
            $array[$column] = $this->$column;
        }

        return $array;
    }
}
