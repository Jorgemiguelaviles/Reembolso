<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserExternal;
use Illuminate\Support\Facades\Http;


class LoginController extends Controller
{

    public function validarLogin(Request $request)
    {
        $all = $request->all();



        $usuario = $request->input('Usuario');
        $senha = $request->input('Senha');
        $captcha = $request->input('captcha');


        /*$recaptchaSecretKey = '6LeD-McpAAAAAKcjy3rvEMLCEYSuk3lrGjm1zjHA';


        $recaptchaVerifyResponse = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => $recaptchaSecretKey,
            'response' => $captcha,
        ]);*/



        /*$user = UserExternal::with(['aprovadores' => function ($query) {
            $query->where('isAprovador', true);
        }])->where('Usuario', $usuario)->first();*/

        $user = UserExternal::with('aprovadores')->where('Usuario', $usuario)->first();






        if ($user) {
            $hash = $user['Senha'];
            $adminitracao = $user['ReembolsoAdministraoreembolso'];
            $comum = $user['ReembolsoComumreembolso'];
            $gestor = $user['ReembolsoGestorreembolso'];
            $contab = $user['ReembolsoContabilidadereembolso'];

            /*if (!$recaptchaVerifyResponse['success']) {
                return response()->json(['status' => false, 'message' => 'Falha na verificacao do reCAPTCHA', 'data' => null]);
            }*/


            if (password_verify($senha, $hash)) {

                $id = $user['id'];



                if ($adminitracao || $comum || $gestor || $contab) {
                    if ($adminitracao) {
                        $tipo = 'AdministracaoRembolso';
                    } elseif ($contab) {
                        $tipo = 'ContabilidadeRembolso';
                    } elseif ($gestor) {
                        $tipo = 'GestorRembolso';
                    } elseif ($comum) {
                        $tipo = 'ComumRembolso';
                    }

                    // Usuário encontrado, você pode fazer mais validações aqui, como verificar a senha
                    return response()->json(['status' => true, 'message' => 'Usuário encontrado', 'data' => [$tipo, $user]]);
                } else {
                    // Usuário não encontrado
                    return response()->json(['status' => false, 'message' => 'Usuário ou senha invalidos', 'data' => null]);
                }
            } else {
                // Usuário não encontrado
                return response()->json(['status' => false, 'message' => 'Usuário ou senha invalidos', 'data' => null]);
            }
        } else {
            // Usuário não encontrado
            return response()->json(['status' => false, 'message' => 'Usuário ou senha invalidos', 'data' => null]);
        }
    }
}
