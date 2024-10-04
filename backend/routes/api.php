<?php

use App\Http\Controllers\ContactoController;
use Illuminate\Support\Facades\Route;

Route::apiResource('contactos', ContactoController::class);
