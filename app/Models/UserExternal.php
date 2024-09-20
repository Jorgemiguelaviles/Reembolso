<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;


class Aprovador extends Model
{
    use HasFactory;

    protected $table = 'aprovadores'; // Nome da tabela

    protected $fillable = [
        'nome',
        'email',
        'setor_id',
        'id_user',
    ];

    public function user()
    {
        return $this->belongsTo(UserExternal::class, 'id_user');
    }
}


class UserExternal extends Model
{
    use HasFactory;

    protected $connection = 'mysql_external'; // Define a conexão para o banco de dados externo

    protected $table = 'users'; // Nome da tabela no banco de dados externo

    protected $fillable = [
        'Nome',
        'Chapa',
        'Horario_do_almoço',
        'Departamento',
        'Gestor',
        'CPF',
        'rotaDaFoto',
        'Usuario',
        'Senha',
        'Email',
        'status',
        'GestorCheck',
        'EngenhariaComumEngenharia',
        'Engenhariaengenharia',
        'OuvidoriaAdministraoRH',
        'TITOOLSTI',
        'ReembolsoComumreembolso',
        'ReembolsoGestorreembolso',
        'ReembolsoContabilidadereembolso',
        'ReembolsoAdministraoreembolso',
        'id_departamento',
    ];

    public static function getDynamicColumns()
    {
        $table = new self();

        // Obtém as colunas da tabela
        $columns = Schema::getColumnListing($table->getTable());

        // Remove colunas padrão do Eloquent
        $defaultColumns = ['id', 'created_at', 'updated_at'];
        $dynamicColumns = array_diff($columns, $defaultColumns);

        return $dynamicColumns;
    }

    // Sobrescreva o método toArray para incluir colunas dinâmicas
    public function toArray()
    {
        $array = parent::toArray();

        // Adicione colunas dinâmicas ao array
        foreach (self::getDynamicColumns() as $column) {
            $array[$column] = $this->$column;
        }

        return $array;
    }

    public function departamento()
    {
        return $this->belongsTo(Departament::class, 'id_departamento');
    }

    public function aprovadores()
    {
        return $this->hasMany(Aprovador::class, 'id_user');
    }
}
