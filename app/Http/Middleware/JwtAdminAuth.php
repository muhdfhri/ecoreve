<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\JwtAuthService;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class JwtAdminAuth
{
    /**
     * Handle an incoming request for Admin Auth & Sliding Session.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie('admin_jwt_token');
        $payload = JwtAuthService::decodeToken($token);

        if (!$payload || !isset($payload['user_id'])) {
            // Mask unauthorized access as 404 Not Found Page (Stealth Mode)
            return inertia('Error404')->toResponse($request);
        }

        $now = time();
        $isRememberMe = $payload['remember_me'] ?? false;
        $lastActivity = $payload['last_activity'] ?? $now;

        // Sliding Session Check: For normal sessions, check 30-minute idle inactivity timeout
        if (!$isRememberMe && ($now - $lastActivity > 1800)) {
            // Expired due to 30-minute idle timeout
            $cookie = JwtAuthService::forgetCookie();
            $res = inertia('Error404')->toResponse($request);
            $res->headers->setCookie($cookie);
            return $res;
        }

        // Fetch User Data from DB
        $user = DB::table('users')->where('id', $payload['user_id'])->first();
        if (!$user) {
            $cookie = JwtAuthService::forgetCookie();
            $res = inertia('Error404')->toResponse($request);
            $res->headers->setCookie($cookie);
            return $res;
        }

        // Share authAdmin with Inertia
        Inertia::share('authAdmin', [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role ?? 'admin',
            'avatar_url' => $user->avatar_url ?? null,
        ]);

        $response = $next($request);

        // Renew last_activity timestamp on sliding session
        $ttlMinutes = $isRememberMe ? (525600) : 30; // 1 year vs 30 mins
        $newToken = JwtAuthService::generateToken([
            'user_id' => $user->id,
            'email' => $user->email,
            'role' => $user->role ?? 'admin',
            'remember_me' => $isRememberMe,
            'last_activity' => $now,
        ], $ttlMinutes);

        $cookie = JwtAuthService::makeCookie($newToken, $ttlMinutes);
        if (method_exists($response, 'withCookie')) {
            $response->withCookie($cookie);
        }

        return $response;
    }
}
