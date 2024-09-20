<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToInforeembolsoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('inforeembolso', function (Blueprint $table) {
            $table->integer('id_solicitante')->nullable();
            $table->integer('id_gestor')->nullable();
            $table->string('ids_grupos')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('inforeembolso', function (Blueprint $table) {
            $table->dropColumn('id_solicitante');
            $table->dropColumn('id_gestor');
            $table->dropColumn('ids_grupos');
        });
    }
}
