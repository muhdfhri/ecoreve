<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Homepage -->
    <url>
        <loc>https://ecoreve.com/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    
    <!-- Main Sitelinks Navbar Pages -->
    <url>
        <loc>https://ecoreve.com/products</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://ecoreve.com/services</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://ecoreve.com/news</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://ecoreve.com/about-us</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://ecoreve.com/contact</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- Dynamic Products -->
    @foreach ($products as $product)
    <url>
        <loc>https://ecoreve.com/products/{{ $product->slug ?? $product->id }}</loc>
        <lastmod>{{ optional($product->updated_at)->toAtomString() ?? now()->toAtomString() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    @endforeach

    <!-- Dynamic News Articles -->
    @foreach ($news as $article)
    <url>
        <loc>https://ecoreve.com/news/{{ $article->slug ?? $article->id }}</loc>
        <lastmod>{{ optional($article->updated_at)->toAtomString() ?? now()->toAtomString() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    @endforeach
</urlset>
