<?php

namespace App\Http\Controllers;

use App\Models\Affectation;
use App\Models\Projet;
use Illuminate\Http\Request;

class AffectationController extends Controller
{
    public function index()
    {
        $data = Affectation::all();
        return response()->json([
            "data" => $data,
            "success" => 200
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $idpr = $data['idpr'];
        $idp = $data['idp'];
        Projet::findOrFail($idpr)->personne()->attach($idp);

        return response()->json([
            "message" => "l'affectation est ajoute avec success",
            "status" => 200
        ]);
    }

    public function destroy(Request $request)
    {
        $data = $request->all();
        $idpr = $data['idpr'];
        $idp = $data['idp'];

        $projet = Projet::findOrFail($idpr);

        $projet->personne()->detach($idp);

        return response()->json([
            "message" => "l'affectation est supprimmer avec success",
            "status" => 200
        ]);
    }
}
