<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Personne;
use App\Models\Projet;

class PersonneController extends Controller
{
    public function index()
    {
        $data = Personne::all();
        return response()->json([
            "data" => $data,
            "status" => 200
        ]);
    }

    public function show($id)
    {
        $data = Personne::with(['projet' => function ($query) {
            $query->select('projets.id', 'intitule', 'dateDebut', 'duree');
        }])->findOrFail($id);

        return response()->json([
            "data" => $data,
            "status" => 200
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'tele' => 'required',
            'ville' => 'required',
        ]);
        Personne::create($validatedData);
        return response()->json([
            "status" => 200,
            "message" => "Personne ajoutee avec succes"
        ]);
    }

    public function update(Request $request, $id)
    {
        $personne = Personne::findOrFail($id);
        $validatedData = $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'tele' => 'required',
            'ville' => 'required',
        ]);
        $personne->update($validatedData);

        return response()->json([
            "status" => 200,
            "message" => "Personne avec l'id $id a ete mise a jour avec succes"
        ]);
    }

    public function destroy($id)
    {
        $personne = Personne::findOrFail($id);

        if ($personne->projet()->get()->count() > 0) {
            return response()->json([
                "message" => "Impossible de supprimer cette personne car elle est affectée à des projets",
                "status" => 400
            ], 400);
        }

        $personne->delete();
        return response()->json([
            "message" => "La personne avec l'id $id a ete bien supprimee",
            "status" => 200
        ]);
    }

    public function affecterProjet(Request $request, $personneId)
    {
        $personne = Personne::findOrFail($personneId);
        $validatedData = $request->validate([
            'projet_id' => 'required|exists:projets,id',
        ]);

        try {
            $affectation = new AffectationController();
            $affectationRequest = new Request([
                'idpr' => $validatedData['projet_id'],
                'idp' => $personneId
            ]);
            
            return $affectation->store($affectationRequest);
        } catch (\Exception $e) {
            return response()->json([
                "status" => 400,
                "message" => "Error creating affectation: " . $e->getMessage()
            ], 400);
        }
    }

    public function detacherProjet(Request $request, $personneId)
    {
        $personne = Personne::findOrFail($personneId);
        $validatedData = $request->validate([
            'projet_id' => 'required|exists:projets,id',
        ]);

        try {
            $affectation = new AffectationController();
            $affectationRequest = new Request([
                'idpr' => $validatedData['projet_id'],
                'idp' => $personneId
            ]);
            
            return $affectation->destroy($affectationRequest);
        } catch (\Exception $e) {
            return response()->json([
                "status" => 400,
                "message" => "Error removing affectation: " . $e->getMessage()
            ], 400);
        }
    }
}
