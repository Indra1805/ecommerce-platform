from django.contrib import admin
from .models import Order, OrderItem

# Register your models here.

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("product_title", "product_price", "quantity")
    can_delete = False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "total_amount",
        "status",
        "created_at",
    )
    list_filter = ("status", "created_at")
    search_fields = ("id", "user__username")
    ordering = ("-created_at",)

    inlines = [OrderItemInline]

    readonly_fields = (
        "user",
        "total_amount",
        "created_at",
    )

    fieldsets = (
        ("Order Info", {
            "fields": ("user", "status", "total_amount")
        }),
        ("Timestamps", {
            "fields": ("created_at",)
        }),
    )


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "product_title",
        "product_price",
        "quantity",
    )
    readonly_fields = (
        "order",
        "product_title",
        "product_price",
        "quantity",
    )
