<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use Illuminate\Http\Request;

class ContactoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Contacto::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $contacto = Contacto::create($request->all());
        return response()->json($contacto, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Contacto::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $contacto = Contacto::findOrFail($id);
        $contacto->update($request->all());
        return response()->json($contacto, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Contacto::destroy($id);
        return response()->json(null, 204);
    }
}
