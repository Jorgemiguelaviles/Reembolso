<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RecoveryEspecificDataTables extends Controller
{
    public function getEspecificDataTables(Request $request)
    {
        $all = $request->all();
        return response()->json(['dados' => $all]);
    }
}
