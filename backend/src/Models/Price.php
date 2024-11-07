<?php

namespace App\Models;

class Price extends Model
{
    protected static string $table = 'prices';
    public static function findByProductId($productId)
    {
        $query = 'SELECT amount, currency_symbol,currency_label FROM ' . static::$table . ' WHERE product_id = ?';
        $params = [$productId];
        $prices = (new static)->db
            ->query($query, "s", $params)
            ->get();

        $productPrices = [];
        foreach ($prices as $price) {
            $productPrices[] = [
                'amount' => number_format($price['amount'], 2, thousands_separator: ''),
                'currency' => [
                    'label' => $price['currency_label'],
                    'symbol' => $price['currency_symbol']
                ]
            ];
        }
        return $productPrices;
    }
}