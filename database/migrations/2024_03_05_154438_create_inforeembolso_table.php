<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInforeembolsoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inforeembolso', function (Blueprint $table) {
            $table->id();
            $table->string('objetivo', 400);
            $table->string('TipoDeEmpresa', 400)->nullable();
            $table->boolean('active')->default(true);
            $table->string('status', 400)->default('Pendente');
            $table->string('chapa', 400);
            $table->string('obra', 400)->nullable()->default('Uso em consumo');;
            $table->string('departamento', 400);
            $table->string('cpf', 400);
            $table->string('gestor', 400)->nullable();
            $table->string('centro_de_custo', 400);
            $table->date('data');
            $table->date('periodo');
            $table->date('ate');
            $table->string('Solicitante', 400)->nullable()->default(null);
            $table->string('motivoDoCancelamento', 400)->nullable()->default(null);
            $table->string('ultimaAtualizacao', 400)->nullable()->default(null);
            $table->string('SomaTotalDosValores', 400)->nullable()->default(null);
            $table->string('designationpeople', 400)->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inforeembolso');
    }
}
