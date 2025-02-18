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
        $data = Personne::find($id);
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
        
        $projet = Projet::find($validatedData['projet_id']);
        $personne->projet()->attach($projet);

        return response()->json([
            "status" => 200,
            "message" => "La personne avec l'id $personneId a ete associee au projet avec l'id {$projet->id}"
        ]);
    }

    public function detacherProjet(Request $request, $personneId)
    {
        $personne = Personne::findOrFail($personneId);
        $validatedData = $request->validate([
            'projet_id' => 'required|exists:projets,id',
        ]);
        
        $projet = Projet::find($validatedData['projet_id']);
        $personne->projet()->detach($projet);

        return response()->json([
            "status" => 200,
            "message" => "La personne avec l'id $personneId a ete detachee du projet avec l'id {$projet->id}"
        ]);
    }
}
