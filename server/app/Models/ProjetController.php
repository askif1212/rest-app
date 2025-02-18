<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Projet;

class ProjetController extends Controller
{
    public function index()
    {
        $data = Projet::all();
        return response()->json([
            "data" => $data,
            "status" => 200
        ]);
    }

    public function show($id)
    {
        $data = Projet::find($id);
        return response()->json([
            "data" => $data,
            "status" => 200
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'intitule' => 'required',
            'dateDebut' => 'required|date',
            'duree' => 'required',
        ]);
        Projet::create($validatedData);
        return response()->json([
            "status" => 200,
            "message" => "Projet ajoute avec success"
        ]);
    }

    public function update(Request $request, $id)
    {
        $projet = Projet::findOrFail($id);
        $validatedData = $request->validate([
            'intitule' => 'required',
            'dateDebut' => 'required|date',
            'duree' => 'required',
        ]);
        $projet->update($validatedData);

        return response()->json([
            "status" => 200,
            "message" => "Projet avec l'id $id a ete bien ajoute"
        ]);
    }

    public function destroy($id){
        $projet = Projet::findOrFail($id);
        $projet->delete();
        return response()->json(["message" => "le projet avec l'id $id a ete bien supprimmer","status" => 200]);
    }
}
