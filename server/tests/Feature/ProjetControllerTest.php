<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Projet;
use App\Models\Personne;

class ProjetControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index()
    {
        Projet::factory()->count(3)->create();
        $response = $this->getJson('/api/projets');
        $response->assertStatus(200)
                 ->assertJsonStructure(['data' => [['id', 'intitule', 'dateDebut', 'duree']]]);
    }

    public function test_show()
    {
        $projet = Projet::factory()->create();
        $response = $this->getJson("/api/projets/{$projet->id}");
        $response->assertStatus(200)
                 ->assertJsonStructure(['data' => ['id', 'intitule', 'dateDebut', 'duree']]);
    }

    public function test_store()
    {
        $personne = Personne::factory()->create();
        $data = [
            'intitule' => 'Test Project',
            'dateDebut' => '2023-01-01',
            'duree' => 10,
            'personnes' => [$personne->id]
        ];
        $response = $this->postJson('/api/projets', $data);
        $response->assertStatus(200)
                 ->assertJson(['message' => 'Projet ajoute avec success']);
        $this->assertDatabaseHas('projets', ['intitule' => 'Test Project']);
    }

    public function test_update()
    {
        $projet = Projet::factory()->create();
        $data = [
            'intitule' => 'Updated Project',
            'dateDebut' => '2023-01-01',
            'duree' => 15
        ];
        $response = $this->putJson("/api/projets/{$projet->id}", $data);
        $response->assertStatus(200)
                 ->assertJson(['message' => 'Projet mis à jour avec succès']);
        $this->assertDatabaseHas('projets', ['intitule' => 'Updated Project']);
    }

    public function test_destroy()
    {
        $projet = Projet::factory()->create();
        $response = $this->deleteJson("/api/projets/{$projet->id}");
        $response->assertStatus(200)
                 ->assertJson(['message' => "le projet avec l'id {$projet->id} a ete bien supprimmer"]);
        $this->assertDatabaseMissing('projets', ['id' => $projet->id]);
    }
}
