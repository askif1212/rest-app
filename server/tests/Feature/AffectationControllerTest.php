<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Projet;
use App\Models\Personne;

class AffectationControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index()
    {
        $response = $this->getJson('/api/affectation');
        $response->assertStatus(200)
                 ->assertJsonStructure(['data']);
    }

    public function test_store()
    {
        $projet = Projet::factory()->create();
        $personne = Personne::factory()->create();
        $data = [
            'idpr' => $projet->id,
            'idp' => $personne->id
        ];
        $response = $this->postJson('/api/affectation', $data);
        $response->assertStatus(200)
                 ->assertJson(['message' => "l'affectation est ajoute avec success"]);
        $this->assertDatabaseHas('affectations', ['projet_id' => $projet->id, 'personne_id' => $personne->id]);
    }

    public function test_destroy()
    {
        $projet = Projet::factory()->create();
        $personne = Personne::factory()->create();
        $projet->personne()->attach($personne->id);
        $data = [
            'idpr' => $projet->id,
            'idp' => $personne->id
        ];
        $response = $this->postJson('/api/affectation/delete', $data);
        $response->assertStatus(200)
                 ->assertJson(['message' => "l'affectation est supprimmer avec success"]);
        $this->assertDatabaseMissing('affectations', ['projet_id' => $projet->id, 'personne_id' => $personne->id]);
    }
}
