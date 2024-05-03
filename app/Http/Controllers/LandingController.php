<?php

namespace App\Http\Controllers;

use App\Helpers\EmailConfig;
use App\Models\Landing;
use Illuminate\Http\Request;
use App\Http\Requests\StoreLandingRequest;
use App\Http\Requests\UpdateLandingRequest;

class LandingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function viewAplicativos()
    {
        return view('Landing/Landingaplicativos');
    }

    public function viewstoreLanding()
    {
        return view('Landing/Landingmundoweb');
    }

    public function viewstoreEcommerce()
    {
        return view('Landing/Landingecommerce');
    }

    public function viewstoreWebsite()
    {
        return view('Landing/Landingwebsite');
    }

    public function viewLandingpagemundoweb(){
        return view('Landing/Landingmundowebfinal');
    }
    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeAplicativos(Request $request)
    {
        
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|integer|max:99999999999',
            
        ];
    
        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El campo nombre no puede tener más de :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo electrónico no es válido.',
            'email.max' => 'El campo correo electrónico no puede tener más de :max caracteres.',
            'telefono.required' => 'El campo teléfono es obligatorio.',
            'telefono.integer' => 'El campo teléfono debe ser un número entero.',
           
        ];

        

        $request->validate($reglasValidacion, $mensajes);

       
        $formlanding = Landing::create($request->all());
        $this-> envioCorreo($formlanding);
       
        
        // return redirect()->route('landingaplicativos', $formlanding)->with('mensaje','Mensaje enviado exitoso')->with('name', $request->nombre);
        return response()->json(['message'=> 'Mensaje enviado con exito']);
    }


    public function storeLanding(Request $request)
    {
        
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|integer|max:99999999999',
            
        ];
    
        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El campo nombre no puede tener más de :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo electrónico no es válido.',
            'email.max' => 'El campo correo electrónico no puede tener más de :max caracteres.',
            'telefono.required' => 'El campo teléfono es obligatorio.',
            'telefono.integer' => 'El campo teléfono debe ser un número entero.',
           
        ];

        

        $request->validate($reglasValidacion, $mensajes);

       
        $formlanding = Landing::create($request->all());
       
        $this-> envioCorreo($formlanding);
        // return redirect()->route('landingmundoweb', $formlanding)->with('mensaje','Mensaje enviado exitoso')->with('name', $request->nombre);
        return response()->json(['message'=> 'Mensaje enviado con exito']);
    }




    public function storeEcommerce(Request $request)
    {
        
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|integer|max:99999999999',
            
        ];
    
        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El campo nombre no puede tener más de :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo electrónico no es válido.',
            'email.max' => 'El campo correo electrónico no puede tener más de :max caracteres.',
            'telefono.required' => 'El campo teléfono es obligatorio.',
            'telefono.integer' => 'El campo teléfono debe ser un número entero.',
           
        ];
        
        $request->validate($reglasValidacion, $mensajes);
       
        $formlanding = Landing::create($request->all());
        $this-> envioCorreo($formlanding);
               
        // return redirect()->route('landingecommerce', $formlanding)->with('mensaje','Mensaje enviado exitoso')->with('name', $request->nombre);
        return response()->json(['message'=> 'Mensaje enviado con exito']);
    }




    public function storeWebsite(Request $request)
    {
        
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|integer|max:99999999999',
            
        ];
    
        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El campo nombre no puede tener más de :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo electrónico no es válido.',
            'email.max' => 'El campo correo electrónico no puede tener más de :max caracteres.',
            'telefono.required' => 'El campo teléfono es obligatorio.',
            'telefono.integer' => 'El campo teléfono debe ser un número entero.',
           
        ];

        

        $request->validate($reglasValidacion, $mensajes);

       
        $formlanding = Landing::create($request->all());
        $this-> envioCorreo($formlanding);
        
        // return redirect()->route('landingwebsite', $formlanding)->with('mensaje','Mensaje enviado exitoso')->with('name', $request->nombre);
        return response()->json(['message'=> 'Mensaje enviado con exito']);
    }
    /**
     * Display the specified resource.
     */
    public function show(Landing $landing)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Landing $landing)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLandingRequest $request, Landing $landing)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Landing $landing)
    {
        //
    }

    private function envioCorreo($data){
        
        $name = $data['nombre'];
        $mail = EmailConfig::config();
        try {
            $mail->addAddress($data['email']);
            $mail->Body = '<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Mundo web</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    @font-face {
                        font-family: grotesk;
                        src: url(tipografia/RightGrotesk-WideMedium.otf);
                        font-weight: normal;
                    }
                    body {
                        background-image: url(https://mundoweb.pe/mail/Fondo.png);
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: cover;
                        margin: 0;
                        padding: 0;
                        font-family: Montserrat, sans-serif;
                        color: #050a41;
                    }
                    main {
                        width: 600px;
                        margin: 0 auto;
                        text-align: center;
                    }
                    img {
                        display: block;
                        margin: 0 auto;
                    }
                    p {
                        font-size: 40px;
                        
                        color: #e15a29;
                        font-family: grotesk;
                    }
                    td {
                        padding: 20px 0;
                    }
                    .cta-button {
                        text-decoration: none;
                        background-color: #e15a29;
                        color: white;
                        border-radius: 40px;
                        padding: 12px 20px;
                        display: inline-flex;
                        justify-content: center;
                        align-items: center;
                        gap: 10px;
                        font-weight: 600;
                    }
                </style>
            </head>
            <body>
                <main>
                    <table style="width: 600px;
                    margin: auto; background: url(https://mundoweb.pe/mail/Fondo.png) no-repeat center center fixed;" >
                        <thead>
                            <tr>
                                <th>
                                    <img src="https://mundoweb.pe/mail/Frame_14466.png" alt="mundo web" style="padding-top: 100px;
                                    padding-bottom: 50px;">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="text-align: center;">
                                <p
                                style="
                                  color: #e15a29;
                                  font-size: 40px;
                                  line-height: 70px;
                                  font-family: grotesk;
                                "
                              >
                                !Gracias <span style="color: #050a41">por escribirnos! 🚀</span>
                              </p>
                                    
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <p style="color: #050a41; text-align: center; font-size: 24px; padding: 0 20px;">
                                    
                                        ¡Hola '.$name.'! En breve nuestra ejecutiva comercial
                                                se estará comunicando contigo.
                                        
                                    </p>
                                    
                                </td>
                            
                            </tr>
                            <tr>
                                <td style="text-align: center;">
                                    <a href="#" class="cta-button">
                                    <span style="color: white; font-size: 18px">Haz que tu negocio despegue</span>
                                    <svg
                                      width="41"
                                      height="40"
                                      viewBox="0 0 41 40"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <circle cx="20.5" cy="20" r="20" fill="white" />
                                      <path
                                        d="M16.9587 15.0808L25.4807 15.0807M25.4807 15.0807L25.4807 23.4815M25.4807 15.0807L15.5812 24.9802"
                                        stroke="#E15A29"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="https://mundoweb.pe/mail/10_rgb.png" alt="mundo web" style="width: 80%; margin-top: 100px;">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </main>
            </body>
            </html>
            ';
            $mail->isHTML(true);
            $mail->send();
            
        } catch (\Throwable $th) {
            //throw $th;
        }
        
       
    }
}
