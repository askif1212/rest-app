<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error.',
                'data' => $validator->errors(),
            ], 422); // Code 422 pour "Unprocessable Entity"
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] = $user->createToken('MyApp')->plainTextToken;
        $success['name'] = $user->name;
        return response()->json([
            'success' => true,
            'data' => $success,
            'message' => 'User registered successfully.',
        ], 201); // Code 201 pour "Created"
    }
    public function login(Request $request): JsonResponse
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('MyApp')->plainTextToken;
            $success['name'] = $user->name;
            return response()->json([
                'success' => true,
                'data' => $success,
                'message' => 'User logged in successfully.',
            ], 200); // Code 200 pour "OK"
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorised',
                'data' => ['error' => 'Invalid credentials'],
            ], 401); // Code 401 pour "Unauthorized"
        }
    }
}
