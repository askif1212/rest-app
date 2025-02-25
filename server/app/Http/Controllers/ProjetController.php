<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Projet;
use App\Models\Personne;

class ProjetController extends Controller
{
    public function index()
    {
        try {
            $data = Projet::with('personne:id,nom,prenom')->get();
            return response()->json([
                "data" => $data,
                "status" => 200
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Error loading projects: " . $e->getMessage(),
                "status" => 500
            ], 500);
        }
    }

    public function show($id)
    {
        $data = Projet::with(['personne' => function ($query) {
            $query->select('personnes.id', 'nom', 'prenom');
        }])->findOrFail($id);

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
            'personnes' => 'array'
        ]);

        $projet = Projet::create([
            'intitule' => $validatedData['intitule'],
            'dateDebut' => $validatedData['dateDebut'],
            'duree' => $validatedData['duree'],
        ]);

        if (!empty($validatedData['personnes'])) {
            $projet->personne()->attach($validatedData['personnes']);
        }

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
            'personnes' => 'array'
        ]);

        $projet->update([
            'intitule' => $validatedData['intitule'],
            'dateDebut' => $validatedData['dateDebut'],
            'duree' => $validatedData['duree'],
        ]);

        if (isset($validatedData['personnes'])) {
            $projet->personne()->sync($validatedData['personnes']);
        }

        return response()->json([
            "status" => 200,
            "message" => "Projet mis à jour avec succès"
        ]);
    }

    public function destroy($id){
        $projet = Projet::findOrFail($id);
        
        if ($projet->affectations()->count() > 0) {
            return response()->json([
                "message" => "Cannot delete project with existing affectations",
                "status" => 400
            ], 400);
        }

        $projet->delete();
        return response()->json([
            "message" => "le projet avec l'id $id a ete bien supprimmer",
            "status" => 200
        ]);
    }

    public function getPeople()
    {
        $people = Personne::all(['id', 'nom', 'prenom']);
        return response()->json([
            "data" => $people,
            "status" => 200
        ]);
    }
}
