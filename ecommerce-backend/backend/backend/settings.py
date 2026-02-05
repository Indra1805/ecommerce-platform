# backend/settings.py

from pathlib import Path
import os
from datetime import timedelta
from dotenv import load_dotenv

# --------------------------------------------------
# BASE DIR
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env ONCE
load_dotenv(BASE_DIR / ".env")

# --------------------------------------------------
# CORE
# --------------------------------------------------

SECRET_KEY = os.getenv("SECRET_KEY")

if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY missing in .env")

DEBUG = os.getenv("DEBUG", "False") == "True"

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "").split(",")

# --------------------------------------------------
# APPS
# --------------------------------------------------

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "corsheaders",
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",

    "users",
    "products",
    "wishlist",
    "cart",
    "orders",
]

# --------------------------------------------------
# MIDDLEWARE
# --------------------------------------------------

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# --------------------------------------------------
# URL / WSGI
# --------------------------------------------------

ROOT_URLCONF = "backend.urls"
WSGI_APPLICATION = "backend.wsgi.application"

# --------------------------------------------------
# TEMPLATES
# --------------------------------------------------

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# --------------------------------------------------
# DATABASE
# --------------------------------------------------

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# --------------------------------------------------
# PASSWORDS
# --------------------------------------------------

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# --------------------------------------------------
# I18N
# --------------------------------------------------

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True

# --------------------------------------------------
# STATIC
# --------------------------------------------------

STATIC_URL = "/static/"

# --------------------------------------------------
# CORS / CSRF
# --------------------------------------------------

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
]

SESSION_COOKIE_SAMESITE = "Lax"
CSRF_COOKIE_SAMESITE = "Lax"

SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

# --------------------------------------------------
# DRF
# --------------------------------------------------

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.AllowAny",
    ),
}

# --------------------------------------------------
# SIMPLE JWT
# --------------------------------------------------

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),

    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": True,

    "AUTH_HEADER_TYPES": ("Bearer",),
}

# --------------------------------------------------
# DEFAULT PK
# --------------------------------------------------

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
