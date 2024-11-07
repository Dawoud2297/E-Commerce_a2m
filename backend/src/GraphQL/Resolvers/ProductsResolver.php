<?php

namespace App\GraphQL\Resolvers;

use App\Models\Product;

class ProductsResolver
{
    public static function allProducts(?string $category = null): array
    {
        return Product::fetchAll($category);
    }
    public static function getOneProduct(string $id): array
    {
        return Product::fetchOneProduct($id);
    }
}