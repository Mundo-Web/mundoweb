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
        Schema::create('formulariopopup', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('email');
            $table->integer('telefono');
            $table->string('urlweb');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formulariopopup');
    }
};
