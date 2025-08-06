#!/bin/bash

# 🚀 IA Performance Web - Development Script
# Script para facilitar el desarrollo y despliegue del proyecto

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Project information
PROJECT_NAME="IA Performance Web"
VERSION="1.0.0"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}"
    echo "=================================="
    echo "  $PROJECT_NAME v$VERSION"
    echo "  Development & Deployment Script"
    echo "=================================="
    echo -e "${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to start development server
dev_server() {
    print_status "Starting development server..."
    
    if command_exists python3; then
        print_status "Using Python 3 HTTP server on port 8080"
        python3 -m http.server 8080
    elif command_exists python; then
        print_status "Using Python HTTP server on port 8080"
        python -m http.server 8080
    elif command_exists node; then
        if command_exists npx; then
            print_status "Using Node.js serve package on port 3000"
            npx serve . -p 3000
        else
            print_error "Node.js found but npx not available. Please install serve globally: npm install -g serve"
        fi
    elif command_exists php; then
        print_status "Using PHP built-in server on port 8080"
        php -S localhost:8080
    else
        print_error "No suitable server found. Please install Python, Node.js, or PHP."
        exit 1
    fi
}

# Function to validate HTML
validate_html() {
    print_status "Validating HTML structure..."
    
    if [ -f "index.html" ]; then
        # Basic validation checks
        if grep -q "<!DOCTYPE html>" index.html; then
            print_success "HTML5 doctype found"
        else
            print_warning "HTML5 doctype not found"
        fi
        
        if grep -q "<meta charset=" index.html; then
            print_success "Character encoding specified"
        else
            print_warning "Character encoding not specified"
        fi
        
        if grep -q "<meta name=\"viewport\"" index.html; then
            print_success "Viewport meta tag found"
        else
            print_warning "Viewport meta tag not found"
        fi
        
        print_success "Basic HTML validation completed"
    else
        print_error "index.html not found"
        exit 1
    fi
}

# Function to optimize images
optimize_images() {
    print_status "Checking image optimization..."
    
    if [ -d "images" ]; then
        image_count=$(find images -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | wc -l)
        print_status "Found $image_count images in images directory"
        
        # Check if images exist
        if [ "$image_count" -gt 0 ]; then
            print_success "Images directory contains files"
        else
            print_warning "No images found in images directory"
        fi
    else
        print_error "Images directory not found"
    fi
}

# Function to run basic tests
run_tests() {
    print_status "Running basic tests..."
    
    # Check if all main files exist
    files=("index.html" "styles.css" "script.js" "package.json" "README.md" "manifest.json")
    
    for file in "${files[@]}"; do
        if [ -f "$file" ]; then
            print_success "$file ✓"
        else
            print_error "$file not found ✗"
        fi
    done
    
    validate_html
    optimize_images
    
    print_success "All tests completed"
}

# Function to prepare for deployment
prepare_deploy() {
    print_status "Preparing for deployment..."
    
    # Update lastmod in sitemap
    if [ -f "sitemap.xml" ]; then
        current_date=$(date -u +"%Y-%m-%dT%H:%M:%S+00:00")
        if command_exists sed; then
            sed -i.bak "s/<lastmod>.*<\/lastmod>/<lastmod>$current_date<\/lastmod>/g" sitemap.xml
            rm sitemap.xml.bak 2>/dev/null || true
            print_success "Sitemap timestamps updated"
        else
            print_warning "sed not available, sitemap not updated"
        fi
    fi
    
    print_success "Deployment preparation completed"
}

# Function to show project info
show_info() {
    print_header
    echo -e "${CYAN}Project Structure:${NC}"
    echo "├── index.html          # Main HTML file"
    echo "├── styles.css          # CSS styles"
    echo "├── script.js           # JavaScript functionality"
    echo "├── package.json        # Project metadata"
    echo "├── manifest.json       # PWA manifest"
    echo "├── robots.txt          # SEO robots file"
    echo "├── sitemap.xml         # SEO sitemap"
    echo "├── netlify.toml        # Netlify configuration"
    echo "├── vercel.json         # Vercel configuration"
    echo "├── README.md           # Documentation"
    echo "├── LICENSE.md          # License information"
    echo "└── images/             # Image assets"
    echo ""
    echo -e "${CYAN}Available Commands:${NC}"
    echo "  ./dev.sh serve        # Start development server"
    echo "  ./dev.sh test         # Run basic tests"
    echo "  ./dev.sh deploy       # Prepare for deployment"
    echo "  ./dev.sh info         # Show this information"
    echo ""
}

# Function to create backup
create_backup() {
    print_status "Creating backup..."
    
    backup_name="backup_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "../backups"
    
    tar -czf "../backups/${backup_name}.tar.gz" . --exclude="node_modules" --exclude=".git" --exclude="../backups"
    
    print_success "Backup created: ../backups/${backup_name}.tar.gz"
}

# Main script logic
main() {
    case "${1:-help}" in
        "serve"|"dev"|"start")
            print_header
            dev_server
            ;;
        "test"|"validate")
            print_header
            run_tests
            ;;
        "deploy"|"build")
            print_header
            prepare_deploy
            ;;
        "info"|"help")
            show_info
            ;;
        "backup")
            print_header
            create_backup
            ;;
        *)
            print_header
            echo -e "${YELLOW}Usage:${NC} ./dev.sh [command]"
            echo ""
            echo -e "${CYAN}Commands:${NC}"
            echo "  serve     Start development server"
            echo "  test      Run basic tests and validation"
            echo "  deploy    Prepare project for deployment"
            echo "  backup    Create backup of the project"
            echo "  info      Show project information"
            echo ""
            ;;
    esac
}

# Run main function with all arguments
main "$@"