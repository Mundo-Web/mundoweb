<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactoPopup extends Model
{
    use HasFactory;
    protected $fillable=['nombre','email','telefono','urlweb'];
}
