<?php

use App\Http\Controllers\ContactoController;
use Illuminate\Routing\Route;

Route::apiResource('contactos', ContactoController::class);
