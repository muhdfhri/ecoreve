<?php

namespace App\Services;

use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Cookie as SymfonyCookie;

class JwtAuthService
{
    /**
     * Secret key for HMAC signing
     */
    protected static function getSecretKey(): string
    {
        return config('app.key') ?: 'ecoreve-fallback-secret-jwt-key-32bytes';
    }

    /**
     * Base64Url Encode
     */
    protected static function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * Base64Url Decode
     */
    protected static function base64UrlDecode(string $data): string
    {
        return base64_decode(strtr($data, '-_', '+/'));
    }

    /**
     * Generate JWT Token with payload and TTL
     */
    public static function generateToken(array $payloadData, int $ttlMinutes = 30): string
    {
        $header = json_encode(['alg' => 'HS256', 'typ' => 'JWT']);
        $now = time();
        $expiresAt = $now + ($ttlMinutes * 60);

        $payload = array_merge($payloadData, [
            'iat' => $now,
            'exp' => $expiresAt,
            'last_activity' => $now,
        ]);

        $base64UrlHeader = self::base64UrlEncode($header);
        $base64UrlPayload = self::base64UrlEncode(json_encode($payload));

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::getSecretKey(), true);
        $base64UrlSignature = self::base64UrlEncode($signature);

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    /**
     * Decode and verify JWT Token
     */
    public static function decodeToken(?string $token): ?array
    {
        if (!$token) {
            return null;
        }

        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        list($base64UrlHeader, $base64UrlPayload, $base64UrlSignature) = $parts;

        $signature = self::base64UrlDecode($base64UrlSignature);
        $expectedSignature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::getSecretKey(), true);

        if (!hash_equals($signature, $expectedSignature)) {
            return null;
        }

        $payload = json_decode(self::base64UrlDecode($base64UrlPayload), true);
        if (!$payload || !isset($payload['exp']) || time() > $payload['exp']) {
            return null;
        }

        return $payload;
    }

    /**
     * Create an HttpOnly Cookie for the JWT token
     */
    public static function makeCookie(string $token, int $ttlMinutes = 30): SymfonyCookie
    {
        return Cookie::make(
            'admin_jwt_token',
            $token,
            $ttlMinutes,
            '/',
            null,
            false, // secure
            true,  // httpOnly
            false,
            'lax'
        );
    }

    /**
     * Create a forget cookie response
     */
    public static function forgetCookie(): SymfonyCookie
    {
        return Cookie::forget('admin_jwt_token');
    }
}
