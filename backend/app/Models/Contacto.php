<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PharIo\Manifest\Email;

class Contacto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'notas',
        'cumpleanos',
        'pagina_web',
        'empresa'
    ];

    public function telefonos()
    {
        return $this->hasMany(Telefonos::class);
    }

    public function emails()
    {
        return $this->hasMany(Emails::class);
    }

    public function direcciones()
    {
        return $this->hasMany(Direcciones::class);
    }
}
