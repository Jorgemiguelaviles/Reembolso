<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Chame a classe de seeder desejada usando a função call()
        //$this->call(InforeembolsoSeeder::class);
        //$this->call(FormularioSeeder::class);
        $this->call(DespesasSeeder::class);
    }
}
