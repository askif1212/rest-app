<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Personne;

class PersonneControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index()
    {
        Personne::factory()->count(3)->create();
        $response = $this->getJson('/api/personne');
        $response->assertStatus(200)
                 ->assertJsonStructure(['data' => [['id', 'nom', 'prenom', 'tele', 'ville']]]);
    }

    public function test_show()
    {
        $personne = Personne::factory()->create();
        $response = $this->getJson("/api/personne/{$personne->id}");
        $response->assertStatus(200)
                 ->assertJsonStructure(['data' => ['id', 'nom', 'prenom', 'tele', 'ville']]);
    }

    public function test_store()
    {
        $data = [
            'nom' => 'Doe',
            'prenom' => 'John',
            'tele' => '123456789',
            'ville' => 'City'
        ];
        $response = $this->postJson('/api/personne', $data);
        $response->assertStatus(200)
                 ->assertJson(['message' => 'Personne ajoutee avec succes']);
        $this->assertDatabaseHas('personnes', ['nom' => 'Doe']);
    }

    public function test_update()
    {
        $personne = Personne::factory()->create();
        $data = [
            'nom' => 'Updated Doe',
            'prenom' => 'John',
            'tele' => '987654321',
            'ville' => 'New City'
        ];
        $response = $this->putJson("/api/personne/{$personne->id}", $data);
        $response->assertStatus(200)
                 ->assertJson(['message' => "Personne avec l'id {$personne->id} a ete mise a jour avec succes"]);
        $this->assertDatabaseHas('personnes', ['nom' => 'Updated Doe']);
    }

    public function test_destroy()
    {
        $personne = Personne::factory()->create();
        $response = $this->deleteJson("/api/personne/{$personne->id}");
        $response->assertStatus(200)
                 ->assertJson(['message' => "La personne avec l'id {$personne->id} a ete bien supprimee"]);
        $this->assertDatabaseMissing('personnes', ['id' => $personne->id]);
    }
}
