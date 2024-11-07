<?php

namespace App\Models;

class Product extends Model
{
    protected static string $table = 'products';

    public static function fetchAll(?string $category = null)
    {
        $products = new static();
        $query = 'SELECT * FROM ' . static::$table;
        $params = [];
        $type = "";

        if ($category && strtolower($category) !== 'all') {
            $query .= ' WHERE category = ?';
            $params = [$category];
            $type = "s";
        }

        $products = $products->db->query($query, $type, $params)->get();

        foreach ($products as &$product) {
            self::fetchDetails($product);
        }

        return $products;
    }

    public static function fetchOneProduct(string $value)
    {
        $product = parent::find($value);

        if ($product[0]) {
            self::fetchDetails($product[0]);
        }
        return $product[0];
    }
    private static function fetchDetails(&$product)
    {
        $gallery = json_decode($product['gallery'], true);
        $product['gallery'] = $gallery !== null && is_array($gallery) ? $gallery : [];
        $product['prices'] = Price::findByProductId($product['id']);
        $product['attributes'] = Attribute::findByProductId($product['id']);
    }
}