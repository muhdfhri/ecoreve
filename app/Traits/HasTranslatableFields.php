<?php

namespace App\Traits;

trait HasTranslatableFields
{
    /**
     * Fill missing language keys with default fallback text (English or first non-empty value).
     */
    public static function fillMissingTranslations(array|string|null $translations, array $locales = ['en', 'id', 'ms', 'th', 'zh']): array
    {
        if (is_string($translations)) {
            $decoded = json_decode($translations, true);
            $translations = is_array($decoded) ? $decoded : ['en' => $translations];
        }

        if (!is_array($translations)) {
            $translations = [];
        }

        // Find primary fallback text: 'en' preferred, else first non-empty string
        $fallbackText = '';
        if (!empty($translations['en']) && is_string($translations['en'])) {
            $fallbackText = trim($translations['en']);
        } else {
            foreach ($translations as $val) {
                if (!empty($val) && is_string($val)) {
                    $fallbackText = trim($val);
                    break;
                }
            }
        }

        $result = [];
        foreach ($locales as $locale) {
            $val = $translations[$locale] ?? null;
            if (is_string($val) && trim($val) !== '') {
                $result[$locale] = trim($val);
            } else {
                $result[$locale] = $fallbackText;
            }
        }

        return $result;
    }
}
