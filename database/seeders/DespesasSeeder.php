<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DespesasSeeder extends Seeder
{
    public function run()
    {
        $items = [
            ['descricao' => 'Diárias de Refeição', 'valor' => 90, 'codigo' => 'DES000000019', 'conta_razao' => '4.2.2.05.00004 LANCHES E REFEIÇÃO', 'Tipo_NF' => null, 'qnt_editavel' => false],
            ['descricao' => '1/2 Diária de Refeição', 'valor' => 45, 'codigo' => 'DES0000000019', 'conta_razao' => '4.2.2.05.00004 LANCHES E REFEIÇÃO', 'Tipo_NF' => null, 'qnt_editavel' => false],
            ['descricao' => 'Refeição Autorizadas', 'valor' => null, 'codigo' => 'DES0000000019', 'conta_razao' => '4.2.2.05.00005 OUTRO ITEM', 'Tipo_NF' => null, 'qnt_editavel' => false],
            ['descricao' => 'Reembolso KM', 'valor' => 1.30, 'codigo' => 'DES0000000017', 'conta_razao' => '4.2.2.05.00004 LANCHES E REFEIÇÃO', 'Tipo_NF' => null, 'qnt_editavel' => true],
            ['descricao' => 'Combustível', 'valor' => null, 'codigo' => 'DES0000000033', 'conta_razao' => '4.2.2.05.00005 OUTRO ITEM', 'Tipo_NF' => 'Cupom', 'qnt_editavel' => true],
            ['descricao' => 'Aluguel Veículo', 'valor' => null, 'codigo' => 'DES0000000106', 'conta_razao' => '4.2.2.05.00004 LANCHES E REFEIÇÃO', 'Tipo_NF' => 'Cupom', 'qnt_editavel' => true],
            ['descricao' => 'Pedágios', 'valor' => null, 'codigo' => 'DES0000000090', 'conta_razao' => '4.2.2.05.00005 OUTRO ITEM', 'Tipo_NF' => 'Cupom', 'qnt_editavel' => true],
            ['descricao' => 'Estacionamento', 'valor' => null, 'codigo' => 'DES0000000090', 'conta_razao' => '4.2.2.05.00005 OUTRO ITEM', 'Tipo_NF' => 'Cupom', 'qnt_editavel' => true],
            ['descricao' => 'Diárias de Hotel', 'valor' => null, 'codigo' => 'DES0000000102', 'conta_razao' => '4.2.2.05.00005 OUTRO ITEM', 'Tipo_NF' => 'NF', 'qnt_editavel' => true],
            ['descricao' => 'Telefones', 'valor' => null, 'codigo' => 'DES0000000004', 'conta_razao' => '4.2.2.05.00004 LANCHES E REFEIÇÃO', 'Tipo_NF' => 'Cupom', 'qnt_editavel' => true],
            ['descricao' => 'Correio', 'valor' => null, 'codigo' => 'DES0000000025', 'conta_razao' => '4.2.2.05.00005 OUTRO ITEM', 'Tipo_NF' => 'NF', 'qnt_editavel' => true],
            ['descricao' => 'Medicamentos', 'valor' => null, 'codigo' => 'DES0000000062', 'conta_razao' => '4.2.2.05.00005 OUTRO ITEM', 'Tipo_NF' => 'NF', 'qnt_editavel' => true],
            ['descricao' => 'Materiais de manutenção', 'valor' => null, 'codigo' => 'DES0000000082', 'conta_razao' => '4.2.2.05.00005 OUTRO ITEM', 'Tipo_NF' => 'NF', 'qnt_editavel' => true],
            ['descricao' => 'OUTRO ITEM', 'valor' => null, 'codigo' => '-', 'conta_razao' => '-', 'Tipo_NF' => null, 'qnt_editavel' => true],
        ];

        // Insere os dados na tabela 'despesas'
        DB::table('despesas')->insert($items);
    }
}

