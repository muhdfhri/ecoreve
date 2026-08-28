<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Services\JwtAuthService;
use Inertia\Inertia;

class AdminAuthController extends Controller
{
    /**
     * Render Secret Admin Login View
     */
    public function loginView(Request $request)
    {
        $token = $request->cookie('admin_jwt_token');
        $payload = JwtAuthService::decodeToken($token);

        if ($payload && isset($payload['user_id'])) {
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('Admin/Login');
    }

    /**
     * Submit Admin Login Credentials (JWT Auth Issue)
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ], [
            'email.required' => 'Work email address is required.',
            'email.email' => 'Please enter a valid work email address (e.g. admin@ecoreve.com).',
            'password.required' => 'Password is required.',
        ]);

        $rememberMe = (bool) $request->input('rememberMe', false);

        $user = DB::table('users')->where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            $exception = \Illuminate\Validation\ValidationException::withMessages([
                'email' => 'These credentials do not match our admin records.',
            ]);
            $exception->redirectTo = route('admin.secret.login');
            throw $exception;
        }

        $ttlMinutes = $rememberMe ? 525600 : 30; // 1 year (525,600 mins) vs 30 mins

        $token = JwtAuthService::generateToken([
            'user_id' => $user->id,
            'email' => $user->email,
            'role' => $user->role ?? 'admin',
            'remember_me' => $rememberMe,
            'last_activity' => time(),
        ], $ttlMinutes);

        $cookie = JwtAuthService::makeCookie($token, $ttlMinutes);

        return redirect()->route('admin.dashboard')
            ->withCookie($cookie)
            ->with('success', 'Welcome back to EcoReve Admin Dashboard.');
    }

    /**
     * Admin Logout (Revoke JWT Token & Cookie)
     */
    public function logout()
    {
        $cookie = JwtAuthService::forgetCookie();
        return redirect()->route('home')->withCookie($cookie);
    }
}
