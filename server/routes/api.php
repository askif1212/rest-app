<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\PersonneController;
use App\Http\Controllers\AffectationController;
use App\Http\Controllers\AuthController;
Route::apiResource('/projets', ProjetController::class);
Route::apiResource('/affectation', AffectationController::class);

Route::post('/affectation/delete', [AffectationController::class, 'destroy']);

Route::post("/login",[AuthController::class,"login"]);
Route::post("/register",[AuthController::class,"register"]);
Route::apiResource('/personne', PersonneController::class)->middleware('auth:sanctum');