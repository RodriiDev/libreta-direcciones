<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use Illuminate\Http\Request;

class ContactoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $searchTerm = $request->input('search', '');

        $contactos = Contacto::
        where('nombre', 'like', '%' . $searchTerm . '%')
        ->orWhere('notas', 'like', '%' . $searchTerm . '%')
        ->orWhere('cumpleanos', 'like', '%' . $searchTerm . '%')
        ->orWhere('pagina_web', 'like', '%' . $searchTerm . '%')
        ->orWhere('empresa', 'like', '%' . $searchTerm . '%')
        ->orderBy('created_at', 'desc')->limit(300)->get();

        return response()->json([
            'data' => $contactos
        ]);
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

        // Guardar los teléfonos
       
        foreach ($request->input('telefonos') as $telefono) {
            if($telefono['telefono'] != ''){
                $contacto->telefonos()->create([
                    'telefono' => $telefono['telefono']
                ]);
            }    
        }
        // Guardar los emails
        foreach ($request->input('emails') as $em) {
            if($em['email'] != ''){
                $contacto->emails()->create([
                    'email' => $em['email']
                ]);
            }
        }
        // Guardar las direcciones
        foreach ($request->input('direcciones') as $dir) {
            if($dir['direccion'] != ''){
                $contacto->direcciones()->create([
                    'direccion' => $dir['direccion']
                ]);
            }
        }
        return response()->json($contacto, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Contacto::with('telefonos','emails','direcciones')->findOrFail($id);
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

        $contacto->telefonos()->delete();
        if ($request->has('telefonos')) {
            foreach ($request->input('telefonos') as $telefono) {
                if($telefono['telefono'] != ''){
                    $contacto->telefonos()->create([
                        'telefono' => $telefono['telefono']
                    ]);
                }
                
            }
        }

        $contacto->emails()->delete();
        if ($request->has('emails')) {
            foreach ($request->input('emails') as $em) {
                if($em['email'] != ''){
                    $contacto->emails()->create([
                        'email' => $em['email']
                    ]);
                }
            }
        }

        $contacto->direcciones()->delete();
        if ($request->has('direcciones')) {
            foreach ($request->input('direcciones') as $dir) {
                if($dir['direccion'] != ''){
                    $contacto->direcciones()->create([
                        'direccion' => $dir['direccion']
                    ]);
                }
            }
        }


        return response()->json($contacto, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $contacto = Contacto::findOrFail($id);
        $contacto->emails()->delete();
        $contacto->telefonos()->delete();
        $contacto->direcciones()->delete();
        $contacto->delete();

        return response()->json(['message' => 'Contacto eliminado con éxito'], 200);
    }
}
