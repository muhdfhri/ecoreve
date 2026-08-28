<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;

use App\Http\Controllers\AdminAuthController;
use App\Http\Middleware\JwtAdminAuth;

/*
|--------------------------------------------------------------------------
| Web Routes (EcoReve Inertia 3.0 Platform)
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

// Dynamic Dynamic Sitemap.xml for Google Search Console
Route::get('/sitemap.xml', function () {
    $products = DB::table('products')->select(['id', 'slug', 'updated_at'])->get();
    $news = DB::table('news')->select(['id', 'slug', 'updated_at'])->get();

    return response()->view('sitemap', compact('products', 'news'))
        ->header('Content-Type', 'text/xml');
});

// Products Catalog Routes
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

// Services Routes
Route::get('/service', [ServiceController::class, 'index'])->name('service.index');
Route::get('/service/{slug}', [ServiceController::class, 'show'])->name('service.show');

// News & Research Routes
Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{slug}', [NewsController::class, 'show'])->name('news.show');

// About Us & Contact Us Routes
Route::get('/about-us', [AboutController::class, 'index'])->name('about.index');
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact/inquiry', [ContactController::class, 'storeInquiry'])->name('contact.inquiry');

// Secret Admin Login URL (Configured in .env via ADMIN_LOGIN_SLUG)
$secretSlug = env('ADMIN_LOGIN_SLUG', 'ecoreve-portal');
Route::get('/' . ltrim($secretSlug, '/'), [AdminAuthController::class, 'loginView'])->name('admin.secret.login');
Route::post('/admin/login-auth', [AdminAuthController::class, 'login'])->name('admin.auth.login');
Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.auth.logout');

// Public Masking (Returns 404 Inertia page for guessing public admin login routes)
Route::get('/admin/login', fn() => inertia('Error404'));
Route::get('/login', fn() => inertia('Error404'));

// Protected Admin Panel Routes (Guarded by JwtAdminAuth & Sliding Inactivity Session)
Route::middleware([JwtAdminAuth::class])->group(function () {
    Route::get('/admin', function () {
        $sortDir = request()->input('sort_dir', 'desc') === 'asc' ? 'asc' : 'desc';
        $search = request()->input('search');

        $usersQuery = DB::table('users')->select(['id', 'name', 'email', 'role', 'avatar_url', 'created_at']);
        if (!empty($search)) {
            $usersQuery->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('role', 'like', "%{$search}%");
            });
        }
        $usersPagination = $usersQuery->orderBy('id', $sortDir)->cursorPaginate(20)->withQueryString();

        $authAdmin = Inertia::getShared('authAdmin') ?? DB::table('users')->where('email', 'admin@ecoreve.com')->first();

        // 1. Products Cursor Pagination & Joined Categories
        $productsQuery = DB::table('products')
            ->leftJoin('category_product', 'products.id', '=', 'category_product.product_id')
            ->leftJoin('categories', 'category_product.category_id', '=', 'categories.id')
            ->select(
                'products.id as id',
                'products.name',
                'products.slug',
                'products.short_desc',
                'products.full_desc',
                'products.rating',
                'products.rating_count',
                'products.badge_text',
                'products.price_label',
                'products.price',
                'products.note',
                'products.options',
                'products.accordions',
                'products.image_url',
                'products.is_featured',
                'products.created_at',
                'categories.id as category_id',
                'categories.name as category_title',
                'categories.slug as category_slug'
            );

        if (!empty($search)) {
            $productsQuery->where('products.name', 'like', "%{$search}%");
        }

        $productsPagination = $productsQuery->orderBy('id', $sortDir)->cursorPaginate(20)->withQueryString();
        
        $productsData = collect($productsPagination->items())->map(function ($p) {
            if (isset($p->options) && is_string($p->options)) {
                $p->options = json_decode($p->options, true) ?? [];
            }
            if (isset($p->accordions) && is_string($p->accordions)) {
                $p->accordions = json_decode($p->accordions, true) ?? [];
            }
            return $p;
        });

        // 2. Services Cursor Pagination
        $servicesQuery = DB::table('services')
            ->leftJoin('service_categories', 'services.service_category_id', '=', 'service_categories.id')
            ->select(
                'services.id as id',
                'services.service_category_id',
                'services.title',
                'services.slug',
                'services.short_desc',
                'services.full_desc',
                'services.features',
                'services.deliverables',
                'services.turnaround_time',
                'services.metric_label',
                'services.metric_value',
                'services.metric_desc',
                'services.content',
                'services.image_url',
                'services.icon_name',
                'services.created_at',
                'service_categories.title as category_title'
            );
        if (!empty($search)) {
            $servicesQuery->where('services.title', 'like', "%{$search}%");
        }
        $servicesPagination = $servicesQuery->orderBy('id', $sortDir)->cursorPaginate(20)->withQueryString();

        // 3. Inquiries CRM Cursor Pagination
        $inquiriesQuery = DB::table('inquiries');
        if (!empty($search)) {
            $inquiriesQuery->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('work_email', 'like', "%{$search}%")
                  ->orWhere('company_name', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }
        $inquiriesPagination = $inquiriesQuery->orderBy('id', $sortDir)->cursorPaginate(20)->withQueryString();

        // 4. FAQs Cursor Pagination
        $faqsQuery = DB::table('faqs');
        if (!empty($search)) {
            $faqsQuery->where(function ($q) use ($search) {
                $q->where('question', 'like', "%{$search}%")
                  ->orWhere('answer', 'like', "%{$search}%");
            });
        }
        $faqsPagination = $faqsQuery->orderBy('id', $sortDir)->cursorPaginate(20)->withQueryString();

        // 5. Offices Cursor Pagination
        $officesQuery = DB::table('offices');
        if (!empty($search)) {
            $officesQuery->where(function ($q) use ($search) {
                $q->where('badge', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
            });
        }
        $officesPagination = $officesQuery->orderBy('id', $sortDir)->cursorPaginate(20)->withQueryString();

        // 6. News & Articles Cursor Pagination
        $newsQuery = DB::table('news')
            ->leftJoin('news_categories', 'news.news_category_id', '=', 'news_categories.id')
            ->select(
                'news.id as id',
                'news.news_category_id',
                'news.title',
                'news.slug',
                'news.summary',
                'news.content',
                'news.read_time',
                'news.author_name',
                'news.author_role',
                'news.author_avatar',
                'news.image_url',
                'news.is_featured',
                'news.published_at',
                'news.created_at',
                'news_categories.name as category'
            );

        if (!empty($search)) {
            $newsQuery->where(function ($q) use ($search) {
                $q->where('news.title', 'like', "%{$search}%")
                  ->orWhere('news_categories.name', 'like', "%{$search}%")
                  ->orWhere('news.author_name', 'like', "%{$search}%");
            });
        }
        $newsPagination = $newsQuery->orderBy('id', $sortDir)->cursorPaginate(20)->withQueryString();

        // Category Datasets
        $productCategories = DB::table('categories')->orderBy('id', 'desc')->get();
        $serviceCategories = DB::table('service_categories')->orderBy('id', 'desc')->get();
        $newsCategories = DB::table('news_categories')->orderBy('id', 'desc')->get();

        // Overview Aggregations & Activity Feeds
        $totalProducts = DB::table('products')->count();
        $totalServices = DB::table('services')->count();
        $totalInquiries = DB::table('inquiries')->count();
        $pendingInquiries = DB::table('inquiries')->where('status', 'pending')->count();
        $closedInquiries = DB::table('inquiries')->where('status', 'closed')->count();
        $totalNews = DB::table('news')->count();
        $totalOffices = DB::table('offices')->count();
        $totalUsers = DB::table('users')->count();

        // Weekly Growth Rate Calculations (Mathematically Sound & Best Practice Logic)
        $thisWeekInquiries = DB::table('inquiries')->where('created_at', '>=', now()->subDays(7))->count();
        $lastWeekInquiries = DB::table('inquiries')->whereBetween('created_at', [now()->subDays(14), now()->subDays(7)])->count();
        $inquiriesGrowth = $lastWeekInquiries > 0 
            ? round((($thisWeekInquiries - $lastWeekInquiries) / $lastWeekInquiries) * 100, 1)
            : ($thisWeekInquiries > 0 ? 100 : 0);

        $thisWeekCatalog = DB::table('products')->where('created_at', '>=', now()->subDays(7))->count() + DB::table('services')->where('created_at', '>=', now()->subDays(7))->count();
        $lastWeekCatalog = DB::table('products')->whereBetween('created_at', [now()->subDays(14), now()->subDays(7)])->count() + DB::table('services')->whereBetween('created_at', [now()->subDays(14), now()->subDays(7)])->count();
        $catalogGrowth = $lastWeekCatalog > 0 
            ? round((($thisWeekCatalog - $lastWeekCatalog) / $lastWeekCatalog) * 100, 1)
            : ($thisWeekCatalog > 0 ? 100 : 0);

        $resolutionRate = $totalInquiries > 0 
            ? round((($totalInquiries - $pendingInquiries) / $totalInquiries) * 100) 
            : 100;

        $overviewStats = [
            'totalProducts' => $totalProducts,
            'totalServices' => $totalServices,
            'totalInquiries' => $totalInquiries,
            'pendingInquiries' => $pendingInquiries,
            'closedInquiries' => $closedInquiries,
            'resolutionRate' => $resolutionRate,
            'totalNews' => $totalNews,
            'totalOffices' => $totalOffices,
            'totalUsers' => $totalUsers,
            'catalogGrowth' => $catalogGrowth,
            'inquiriesGrowth' => $inquiriesGrowth,
        ];

        // Activity Feed Compilation across tables
        $latestInquiries = DB::table('inquiries')->orderBy('id', 'desc')->take(5)->get();
        $latestNews = DB::table('news')->orderBy('id', 'desc')->take(3)->get();
        $latestProducts = DB::table('products')->orderBy('id', 'desc')->take(3)->get();

        $activityItems = [];

        foreach ($latestInquiries as $inq) {
            $activityItems[] = [
                'id' => 'inq-' . $inq->id,
                'title' => 'New Client Inquiry',
                'description' => ($inq->company_name ?: $inq->full_name) . ' submitted a request',
                'timestamp' => $inq->created_at ? date('h:i A', strtotime($inq->created_at)) : 'Today',
                'type' => 'inquiry',
                'status' => $inq->status,
            ];
        }

        foreach ($latestNews as $n) {
            $activityItems[] = [
                'id' => 'news-' . $n->id,
                'title' => 'Knowledge Article Published',
                'description' => '"' . $n->title . '"',
                'timestamp' => $n->created_at ? date('h:i A', strtotime($n->created_at)) : 'Recently',
                'type' => 'news',
            ];
        }

        foreach ($latestProducts as $p) {
            $activityItems[] = [
                'id' => 'prod-' . $p->id,
                'title' => 'Catalog Asset Added',
                'description' => '"' . $p->name . '"',
                'timestamp' => $p->created_at ? date('h:i A', strtotime($p->created_at)) : 'Recently',
                'type' => 'product',
            ];
        }

        // Real Dynamic Inquiry Volume Trend Queries
        // 1. Last 7 Days Inquiry Count grouped by Day
        $trend7Days = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = date('Y-m-d', strtotime("-$i days"));
            $dayName = date('D', strtotime($date));
            $count = DB::table('inquiries')->whereDate('created_at', $date)->count();
            $trend7Days[] = ['label' => $dayName, 'value' => $count];
        }

        // 2. Last 30 Days Inquiry Count grouped into 4 Weeks
        $trend30Days = [];
        for ($w = 3; $w >= 0; $w--) {
            $startDate = date('Y-m-d', strtotime("-" . (($w + 1) * 7) . " days"));
            $endDate = date('Y-m-d', strtotime("-" . ($w * 7) . " days"));
            $count = DB::table('inquiries')
                ->whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59'])
                ->count();
            $weekLabel = 'W' . (4 - $w);
            $trend30Days[] = ['label' => $weekLabel, 'value' => $count];
        }

        // 3. Last 1 Year Inquiry Count grouped by Quarter / Month
        $trend1Year = [];
        for ($m = 11; $m >= 0; $m -= 3) {
            $startDate = date('Y-m-01', strtotime("-$m months"));
            $endDate = date('Y-m-t', strtotime("-" . max(0, $m - 2) . " months"));
            $count = DB::table('inquiries')
                ->whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59'])
                ->count();
            $qNum = ceil((12 - $m) / 3);
            $trend1Year[] = ['label' => 'Q' . $qNum, 'value' => $count];
        }

        $trendData = [
            'days7' => $trend7Days,
            'days30' => $trend30Days,
            'year1' => $trend1Year,
        ];

        $latestActivityFeed = array_slice($activityItems, 0, 8);
        $recentInquiriesList = DB::table('inquiries')->orderBy('id', 'desc')->take(10)->get();

        return inertia('Admin/Dashboard', [
            'overviewStats' => $overviewStats,
            'trendData' => $trendData,
            'latestActivityFeed' => $latestActivityFeed,
            'recentInquiriesList' => $recentInquiriesList,
            'users' => collect($usersPagination->items()),
            'usersPagination' => $usersPagination,
            'authAdmin' => $authAdmin,
            'products' => $productsData,
            'productsPagination' => $productsPagination,
            'services' => collect($servicesPagination->items()),
            'servicesPagination' => $servicesPagination,
            'faqs' => collect($faqsPagination->items()),
            'faqsPagination' => $faqsPagination,
            'offices' => collect($officesPagination->items()),
            'officesPagination' => $officesPagination,
            'news' => collect($newsPagination->items()),
            'newsPagination' => $newsPagination,
            'inquiries' => collect($inquiriesPagination->items()),
            'inquiriesPagination' => $inquiriesPagination,
            'productCategories' => $productCategories,
            'serviceCategories' => $serviceCategories,
            'newsCategories' => $newsCategories,
            'filters' => [
                'sort_dir' => $sortDir,
                'search' => $search,
            ],
        ]);
    })->name('admin.dashboard');

    // Admin Inquiry CRM Routes
    Route::post('/admin/inquiries/{id}/status', [ContactController::class, 'updateStatus'])->name('admin.inquiries.status');
    Route::post('/admin/inquiries/{id}/delete', [ContactController::class, 'destroy'])->name('admin.inquiries.destroy');

    // Admin Product CRUD Routes & Dedicated Form Pages
    Route::get('/admin/products/create', [ProductController::class, 'create'])->name('admin.products.create');
    Route::get('/admin/products/{id}/edit', [ProductController::class, 'edit'])->name('admin.products.edit');
    Route::post('/admin/products', [ProductController::class, 'store'])->name('admin.products.store');
    Route::post('/admin/products/{id}/update', [ProductController::class, 'update'])->name('admin.products.update');
    Route::post('/admin/products/{id}/delete', [ProductController::class, 'destroy'])->name('admin.products.destroy');

    // Admin Service CRUD Routes & Dedicated Form Pages
    Route::get('/admin/services/create', [ServiceController::class, 'create'])->name('admin.services.create');
    Route::get('/admin/services/{id}/edit', [ServiceController::class, 'edit'])->name('admin.services.edit');
    Route::post('/admin/services', [ServiceController::class, 'store'])->name('admin.services.store');
    Route::post('/admin/services/{id}/update', [ServiceController::class, 'update'])->name('admin.services.update');
    Route::post('/admin/services/{id}/delete', [ServiceController::class, 'destroy'])->name('admin.services.destroy');

    // Admin FAQ CRUD Routes
    Route::post('/admin/faqs', [\App\Http\Controllers\FaqController::class, 'store'])->name('admin.faqs.store');
    Route::post('/admin/faqs/{id}/update', [\App\Http\Controllers\FaqController::class, 'update'])->name('admin.faqs.update');
    Route::post('/admin/faqs/{id}/delete', [\App\Http\Controllers\FaqController::class, 'destroy'])->name('admin.faqs.destroy');

    // Admin Office CRUD Routes
    Route::post('/admin/offices', [\App\Http\Controllers\OfficeController::class, 'store'])->name('admin.offices.store');
    Route::post('/admin/offices/{id}/update', [\App\Http\Controllers\OfficeController::class, 'update'])->name('admin.offices.update');
    Route::post('/admin/offices/{id}/delete', [\App\Http\Controllers\OfficeController::class, 'destroy'])->name('admin.offices.destroy');

    // Admin News CRUD Routes & Dedicated Form Pages
    Route::get('/admin/news/create', [NewsController::class, 'create'])->name('admin.news.create');
    Route::get('/admin/news/{id}/edit', [NewsController::class, 'edit'])->name('admin.news.edit');
    Route::post('/admin/news', [NewsController::class, 'store'])->name('admin.news.store');
    Route::post('/admin/news/{id}/update', [NewsController::class, 'update'])->name('admin.news.update');
    Route::post('/admin/news/{id}/delete', [NewsController::class, 'destroy'])->name('admin.news.destroy');

    // Admin Users CRUD Routes
    Route::post('/admin/users', [\App\Http\Controllers\UserController::class, 'store'])->name('admin.users.store');
    Route::post('/admin/users/{id}/update', [\App\Http\Controllers\UserController::class, 'update'])->name('admin.users.update');
    Route::post('/admin/users/{id}/delete', [\App\Http\Controllers\UserController::class, 'destroy'])->name('admin.users.destroy');

    // Admin Category CRUD Routes (Products, Services, News)
    Route::post('/admin/categories/product', [\App\Http\Controllers\CategoryController::class, 'storeProductCategory'])->name('admin.categories.product.store');
    Route::post('/admin/categories/product/{id}/update', [\App\Http\Controllers\CategoryController::class, 'updateProductCategory'])->name('admin.categories.product.update');
    Route::post('/admin/categories/product/{id}/delete', [\App\Http\Controllers\CategoryController::class, 'destroyProductCategory'])->name('admin.categories.product.destroy');

    Route::post('/admin/categories/service', [\App\Http\Controllers\CategoryController::class, 'storeServiceCategory'])->name('admin.categories.service.store');
    Route::post('/admin/categories/service/{id}/update', [\App\Http\Controllers\CategoryController::class, 'updateServiceCategory'])->name('admin.categories.service.update');
    Route::post('/admin/categories/service/{id}/delete', [\App\Http\Controllers\CategoryController::class, 'destroyServiceCategory'])->name('admin.categories.service.destroy');

    Route::post('/admin/categories/news', [\App\Http\Controllers\CategoryController::class, 'storeNewsCategory'])->name('admin.categories.news.store');
    Route::post('/admin/categories/news/{id}/update', [\App\Http\Controllers\CategoryController::class, 'updateNewsCategory'])->name('admin.categories.news.update');
    Route::post('/admin/categories/news/{id}/delete', [\App\Http\Controllers\CategoryController::class, 'destroyNewsCategory'])->name('admin.categories.news.destroy');

    // Admin Media API Routes
    Route::get('/admin/api/media', [\App\Http\Controllers\MediaController::class, 'index'])->name('admin.media.index');
    Route::post('/admin/api/media', [\App\Http\Controllers\MediaController::class, 'store'])->name('admin.media.store');
    Route::put('/admin/api/media/{id}', [\App\Http\Controllers\MediaController::class, 'update'])->name('admin.media.update');
    Route::delete('/admin/api/media/{id}', [\App\Http\Controllers\MediaController::class, 'destroy'])->name('admin.media.destroy');
});

// Fallback 404 Route for any unmatched URLs
Route::fallback(fn() => inertia('Error404'));
