<?php

namespace App\Http\Controllers;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class CountryAPI extends Controller
{
    public function index()
    {
        $countries = DB::table('countries')
                    ->leftJoin('states', 'countries.id', '=', 'states.CountryID')
                    ->select('countries.id', 'countries.CountryName as country_name', DB::raw('GROUP_CONCAT(states.StateName) as state_names'))
                    ->groupBy('countries.id')
                    ->get();

        return response()->json($countries, 200);
    }
    public function show($id)
    {
        $states = DB::table('countries')
                    ->join('states', 'countries.id', '=', 'states.CountryID')
                    ->select('states.Stateid', 'states.StateName as state_name')
                    ->where('states.CountryID', '=', $id)
                    ->get();

        return response()->json($states, 200);
    }
}
