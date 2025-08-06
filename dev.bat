@echo off
setlocal enabledelayedexpansion

:: 🚀 IA Performance Web - Development Script (Windows)
:: Script para facilitar el desarrollo y despliegue del proyecto

set "PROJECT_NAME=IA Performance Web"
set "VERSION=1.0.0"

:: Colors (using Windows color codes)
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "PURPLE=[95m"
set "CYAN=[96m"
set "NC=[0m"

:: Function to print colored output
:print_status
echo %BLUE%[INFO]%NC% %~1
goto :eof

:print_success
echo %GREEN%[SUCCESS]%NC% %~1
goto :eof

:print_warning
echo %YELLOW%[WARNING]%NC% %~1
goto :eof

:print_error
echo %RED%[ERROR]%NC% %~1
goto :eof

:print_header
echo %PURPLE%
echo ==================================
echo   %PROJECT_NAME% v%VERSION%
echo   Development ^& Deployment Script
echo ==================================
echo %NC%
goto :eof

:: Function to check if command exists
:command_exists
where %1 >nul 2>&1
exit /b %errorlevel%

:: Function to start development server
:dev_server
call :print_status "Starting development server..."

call :command_exists python
if %errorlevel% == 0 (
    call :print_status "Using Python HTTP server on port 8080"
    python -m http.server 8080
    goto :eof
)

call :command_exists py
if %errorlevel% == 0 (
    call :print_status "Using Python HTTP server on port 8080"
    py -m http.server 8080
    goto :eof
)

call :command_exists node
if %errorlevel% == 0 (
    call :command_exists npx
    if !errorlevel! == 0 (
        call :print_status "Using Node.js serve package on port 3000"
        npx serve . -p 3000
        goto :eof
    ) else (
        call :print_error "Node.js found but npx not available. Please install serve: npm install -g serve"
        goto :eof
    )
)

call :command_exists php
if %errorlevel% == 0 (
    call :print_status "Using PHP built-in server on port 8080"
    php -S localhost:8080
    goto :eof
)

call :print_error "No suitable server found. Please install Python, Node.js, or PHP."
goto :eof

:: Function to validate HTML
:validate_html
call :print_status "Validating HTML structure..."

if exist "index.html" (
    findstr /c:"<!DOCTYPE html>" index.html >nul
    if !errorlevel! == 0 (
        call :print_success "HTML5 doctype found"
    ) else (
        call :print_warning "HTML5 doctype not found"
    )
    
    findstr /c:"<meta charset=" index.html >nul
    if !errorlevel! == 0 (
        call :print_success "Character encoding specified"
    ) else (
        call :print_warning "Character encoding not specified"
    )
    
    findstr /c:"<meta name=\"viewport\"" index.html >nul
    if !errorlevel! == 0 (
        call :print_success "Viewport meta tag found"
    ) else (
        call :print_warning "Viewport meta tag not found"
    )
    
    call :print_success "Basic HTML validation completed"
) else (
    call :print_error "index.html not found"
)
goto :eof

:: Function to optimize images
:optimize_images
call :print_status "Checking image optimization..."

if exist "images" (
    set image_count=0
    for %%f in (images\*.png images\*.jpg images\*.jpeg) do (
        set /a image_count+=1
    )
    
    call :print_status "Found !image_count! images in images directory"
    
    if !image_count! gtr 0 (
        call :print_success "Images directory contains files"
    ) else (
        call :print_warning "No images found in images directory"
    )
) else (
    call :print_error "Images directory not found"
)
goto :eof

:: Function to run basic tests
:run_tests
call :print_status "Running basic tests..."

set "files=index.html styles.css script.js package.json README.md manifest.json"
for %%f in (%files%) do (
    if exist "%%f" (
        call :print_success "%%f ✓"
    ) else (
        call :print_error "%%f not found ✗"
    )
)

call :validate_html
call :optimize_images

call :print_success "All tests completed"
goto :eof

:: Function to prepare for deployment
:prepare_deploy
call :print_status "Preparing for deployment..."

if exist "sitemap.xml" (
    call :print_success "Sitemap found (manual update recommended)"
) else (
    call :print_warning "Sitemap not found"
)

call :print_success "Deployment preparation completed"
goto :eof

:: Function to show project info
:show_info
call :print_header
echo %CYAN%Project Structure:%NC%
echo ├── index.html          # Main HTML file
echo ├── styles.css          # CSS styles
echo ├── script.js           # JavaScript functionality
echo ├── package.json        # Project metadata
echo ├── manifest.json       # PWA manifest
echo ├── robots.txt          # SEO robots file
echo ├── sitemap.xml         # SEO sitemap
echo ├── netlify.toml        # Netlify configuration
echo ├── vercel.json         # Vercel configuration
echo ├── README.md           # Documentation
echo ├── LICENSE.md          # License information
echo └── images/             # Image assets
echo.
echo %CYAN%Available Commands:%NC%
echo   dev.bat serve         # Start development server
echo   dev.bat test          # Run basic tests
echo   dev.bat deploy        # Prepare for deployment
echo   dev.bat info          # Show this information
echo.
goto :eof

:: Function to create backup
:create_backup
call :print_status "Creating backup..."

set "backup_name=backup_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%"
set "backup_name=%backup_name: =0%"

if not exist "..\backups" mkdir "..\backups"

powershell -command "Compress-Archive -Path * -DestinationPath '..\backups\%backup_name%.zip' -Force"

if %errorlevel% == 0 (
    call :print_success "Backup created: ..\backups\%backup_name%.zip"
) else (
    call :print_error "Failed to create backup. PowerShell may not be available."
)
goto :eof

:: Main script logic
:main
set "command=%~1"
if "%command%"=="" set "command=help"

if "%command%"=="serve" goto :serve_command
if "%command%"=="dev" goto :serve_command
if "%command%"=="start" goto :serve_command
if "%command%"=="test" goto :test_command
if "%command%"=="validate" goto :test_command
if "%command%"=="deploy" goto :deploy_command
if "%command%"=="build" goto :deploy_command
if "%command%"=="info" goto :info_command
if "%command%"=="help" goto :help_command
if "%command%"=="backup" goto :backup_command
goto :help_command

:serve_command
call :print_header
call :dev_server
goto :eof

:test_command
call :print_header
call :run_tests
goto :eof

:deploy_command
call :print_header
call :prepare_deploy
goto :eof

:info_command
call :show_info
goto :eof

:backup_command
call :print_header
call :create_backup
goto :eof

:help_command
call :print_header
echo %YELLOW%Usage:%NC% dev.bat [command]
echo.
echo %CYAN%Commands:%NC%
echo   serve     Start development server
echo   test      Run basic tests and validation
echo   deploy    Prepare project for deployment
echo   backup    Create backup of the project
echo   info      Show project information
echo.
goto :eof

:: Call main function
call :main %*