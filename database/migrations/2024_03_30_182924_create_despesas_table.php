<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDespesasTable extends Migration
{
    public function up()
    {
        Schema::create('despesas', function (Blueprint $table) {
            $table->id();
            $table->string('descricao', 400);
            $table->float('valor')->nullable()->default(null);
            $table->string('codigo', 100);
            $table->string('conta_razao', 400);
            $table->string('Tipo_NF')->nullable()->default(null);
            $table->boolean('active')->default(true);
            $table->boolean('qnt_editavel')->default(false)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('despesas');
    }
}
