<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormulariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('formularios', function (Blueprint $table) {
            $table->id();
            $table->string('despesa', 400);
            $table->date('data');
            $table->string('status', 400)->default('Pendente');
            $table->boolean('active')->default(true);
            $table->decimal('valor', 15, 2);
            $table->integer('quantidade');
            $table->decimal('total', 10, 2);
            $table->string('descricao', 400);
            $table->string('direcionado_ao_centro_de_custo', 400);
            $table->string('anexo_path', 400)->nullable()->default(null);
            $table->string('itsdolar', 400)->nullable()->default(false);
            $table->string('Solicitante', 400)->nullable()->default(null);
            $table->string('tipoDePagamento', 400)->nullable()->default(null);
            $table->unsignedBigInteger('inforeembolso_id');
            $table->foreign('inforeembolso_id')->references('id')->on('inforeembolso')->onDelete('cascade');
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
        Schema::dropIfExists('formularios');
    }
}
