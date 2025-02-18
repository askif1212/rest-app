<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\PersonneController;
use App\Http\Controllers\AffectationController;
Route::apiResource('/projets', ProjetController::class);
Route::apiResource('/personne', PersonneController::class);
Route::apiResource('/affectation', AffectationController::class);