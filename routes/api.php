<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\PersonneController;
Route::apiResource('/projets', ProjetController::class);
Route::apiResource('/personne', PersonneController::class);