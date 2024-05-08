<?php
/*
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Formulario;

class FormularioSeeder extends Seeder
{

    public function run()
    {
        // Limpar a tabela antes de inserir novos dados
        Formulario::truncate();

        // Dados fictícios para os formulários
        $formularios = [
            [
                'despesa' => 'Reembolso KM',
                'valor' => 0,
                'status' => 'Aprovado',
                'quantidade' => 30,
                'total' => 39.00,
                'descricao' => 'Viagem de negócios',
                'anexo_path' => 'http://localhost/imgsReembolso/20240311143529895_65ef40e1da920.pdf',
                'tipoDePagamento' => 'cartao cooporativo',
                'inforeembolso_id' => 1, // ID da instância relacionada de Inforeembolso
                'data' => now(),
            ],
            [
                'despesa' => 'Teste',
                'valor' => 0,
                'status' => 'Aprovado',
                'quantidade' => 10,
                'total' => 39.00,
                'descricao' => 'Viagem de negócios',
                'anexo_path' => 'http://localhost/imgsReembolso/20240311143529924_65ef40e1e1cb7.pdf',
                'tipoDePagamento' => 'cartao cooporativo',
                'inforeembolso_id' => 1, // ID da instância relacionada de Inforeembolso
                'data' => now(),
            ],
            // Adicione mais formulários fictícios conforme necessário
        ];

        // Inserir os dados fictícios na tabela
        foreach ($formularios as $formularioData) {
            Formulario::create($formularioData);
        }
    }
}
*/