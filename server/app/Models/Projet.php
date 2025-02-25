<?php

namespace App\Models;

use App\Models\Personne;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{

    protected $fillable = ["intitule", "dateDebut", "duree"];

    public function personne()
    {
        return $this->belongsToMany(Personne::class, "affectations", "projet_id", "personnes_id");
    }
}
