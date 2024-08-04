<?php

namespace App\Http\Controllers;

use App\Http\Classes\EmailConfig;
use App\Models\Form;
use Illuminate\Http\Request;
use App\Http\Requests\StoreFormRequest;
use App\Http\Requests\UpdateFormRequest;


class FormController extends Controller
{
    public function store(Request $request)
    {
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required',
        ];
        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El campo nombre no puede tener más de :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo electrónico no es válido.',
            'email.max' => 'El campo correo electrónico no puede tener más de :max caracteres.',
            'telefono.required' => 'El campo teléfono es obligatorio.',
        ];
        $request->validate($reglasValidacion, $mensajes);
        $contactopopup = Form::create($request->all());
        return redirect()->route('ecommercepage', $contactopopup)->with('mensaje', 'Mensaje enviado exitoso')->with('name', $request->nombre);
    }

    public function store2(Request $request)
    {
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required',
        ];
        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El campo nombre no puede tener más de :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo electrónico no es válido.',
            'email.max' => 'El campo correo electrónico no puede tener más de :max caracteres.',
            'telefono.required' => 'El campo teléfono es obligatorio.',
        ];
        $request->validate($reglasValidacion, $mensajes);
        $contactopopup = Form::create($request->all());
        return redirect()->route('landingpage', $contactopopup)->with('mensaje', 'Mensaje enviado exitoso')->with('name', $request->nombre);
    }

    public function store3(Request $request)
    {
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required',
        ];
        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El campo nombre no puede tener más de :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo electrónico no es válido.',
            'email.max' => 'El campo correo electrónico no puede tener más de :max caracteres.',
            'telefono.required' => 'El campo teléfono es obligatorio.',
        ];
        $request->validate($reglasValidacion, $mensajes);
        $contactopopup = Form::create($request->all());
        return redirect()->route('onepage', $contactopopup)->with('mensaje', 'Mensaje enviado exitoso')->with('name', $request->nombre);
    }


    public function store4(Request $request)
    {
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required',
        ];
        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El campo nombre no puede tener más de :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo electrónico no es válido.',
            'email.max' => 'El campo correo electrónico no puede tener más de :max caracteres.',
            'telefono.required' => 'El campo teléfono es obligatorio.',
        ];
        $request->validate($reglasValidacion, $mensajes);
        $contactopopup = Form::create($request->all());
        return redirect()->route('aplicativospage', $contactopopup)->with('mensaje', 'Mensaje enviado exitoso')->with('name', $request->nombre);
    }


    public function store5(Request $request)
    {
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required',
        ];
        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El campo nombre no puede tener más de :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo electrónico no es válido.',
            'email.max' => 'El campo correo electrónico no puede tener más de :max caracteres.',
            'telefono.required' => 'El campo teléfono es obligatorio.',
        ];
        $request->validate($reglasValidacion, $mensajes);
        $formulariohome = Form::create($request->all());
        $this->envioCorreo($formulariohome);
        // return redirect()->route('inicio', $formulariohome)->with('mensaje','Mensaje enviado exitoso')->with('name', $request->nombre);
        return response()->json(['message' => 'Mensaje enviado con exito']);
    }

    public function thankyoupage()
    {
        return view('Thankyupage');
    }

    private function envioCorreo($data)
    {
        $name = $data['nombre'];
        $mail = EmailConfig::config($name); /* variable $name agregada */
        try {
            $mail->addAddress($data['email']);
            $mail->Body = "Buenas tardes $name su solicitud fue procesada";
            $mail->isHTML(true);
            $mail->send();
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
