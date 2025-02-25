<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Projet;

class Personne extends Model
{
    protected $fillable = ["nom", "prenom", "tele", "ville"];

    public function projet()
    {
        return $this->belongsToMany(Projet::class, "affectations", "personnes_id", "projet_id");
    }
}
