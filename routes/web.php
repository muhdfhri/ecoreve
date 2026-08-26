<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;

/*
|--------------------------------------------------------------------------
| Web Routes (EcoReve Inertia 3.0 Platform)
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

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

// Admin Panel Routes
Route::get('/admin/login', function () {
    return inertia('Admin/Login');
})->name('admin.login');

Route::get('/admin', function () {
    $users = DB::table('users')->select(['id', 'name', 'email', 'role', 'avatar_url', 'created_at'])->get();
    $authAdmin = DB::table('users')->where('email', 'admin@ecoreve.com')->first() ?? $users->first();
    $products = DB::table('products')->orderBy('id', 'desc')->get();
    $services = DB::table('services')->orderBy('id', 'desc')->get();
    $faqs = DB::table('faqs')->orderBy('sort_order', 'asc')->get();
    $offices = DB::table('offices')->orderBy('id', 'desc')->get();
    $news = DB::table('news')->orderBy('id', 'desc')->get();
    $inquiries = DB::table('inquiries')->orderBy('id', 'desc')->get();

    // Category Datasets
    $productCategories = DB::table('categories')->orderBy('id', 'desc')->get();
    $serviceCategories = DB::table('service_categories')->orderBy('id', 'desc')->get();
    $newsCategories = DB::table('news_categories')->orderBy('id', 'desc')->get();

    return inertia('Admin/Dashboard', [
        'users' => $users,
        'authAdmin' => $authAdmin,
        'products' => $products,
        'services' => $services,
        'faqs' => $faqs,
        'offices' => $offices,
        'news' => $news,
        'inquiries' => $inquiries,
        'productCategories' => $productCategories,
        'serviceCategories' => $serviceCategories,
        'newsCategories' => $newsCategories,
    ]);
})->name('admin.dashboard');

// Admin Inquiry CRM Routes
Route::post('/admin/inquiries/{id}/status', [ContactController::class, 'updateStatus'])->name('admin.inquiries.status');
Route::post('/admin/inquiries/{id}/delete', [ContactController::class, 'destroy'])->name('admin.inquiries.destroy');

// Admin Product CRUD Routes
Route::post('/admin/products', [ProductController::class, 'store'])->name('admin.products.store');
Route::post('/admin/products/{id}/update', [ProductController::class, 'update'])->name('admin.products.update');
Route::post('/admin/products/{id}/delete', [ProductController::class, 'destroy'])->name('admin.products.destroy');

// Admin Service CRUD Routes
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

// Admin News CRUD Routes
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
