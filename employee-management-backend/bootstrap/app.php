<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Đăng ký middleware CORS
        $middleware->alias([
            'cors' => \App\Middleware\HandleCors::class,
        ]);

        // Tắt CSRF protection cho các route API
        $middleware->validateCsrfTokens(except: [
            'api/*', // Bỏ CSRF protection cho tất cả route API
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();