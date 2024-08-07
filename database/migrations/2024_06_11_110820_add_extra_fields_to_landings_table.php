<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('landings', function (Blueprint $table) {
            // $table->string('fecha')->nullable();
            // $table->string('hora')->nullable();
            // $table->string('lead')->nullable();
            // $table->string('ip')->nullable();
            // $table->string('llegade')->nullable();
            // $table->string('anchodispositivo')->nullable();
            // $table->string('largodispositivo')->nullable();
            // $table->string('latitud')->nullable();
            // $table->string('longitud')->nullable();
            // $table->string('sistema')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('landings', function (Blueprint $table) {
            $table->dropColumn([
                'fecha',
                'hora',
                'lead',
                'ip',
                'llegade',
                'anchodispositivo',
                'largodispositivo',
                'latitud',
                'longitud',
                'sistema'
            ]);
        });
    }
};
