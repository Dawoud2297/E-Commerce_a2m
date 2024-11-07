<?php

namespace App\Models;

class OrderItem extends Model
{
    protected static string $table = 'order_items';

    public static function insertItem(int $orderId, array $productDetails): array
    {
        $query ='INSERT INTO ' .
                static::$table .
                ' (order_id, product_id, product_name, attribute_values, quantity, paid_amount, paid_currency) VALUES (?, ?, ?, ?, ?, ?, ?)';
        $params = [
            $orderId,
            $productDetails['productId'],
            $productDetails['productName'],
            $productDetails['attributeValues'],
            $productDetails['quantity'],
            $productDetails['paidAmount'],
            $productDetails['paidCurrency'],
        ];
        $insertOrderDetails = (new static)->db->query($query,'isssids',$params);

        if (!$insertOrderDetails) {
            return [
                'insertOrderDetails' => false,
                'error' => 'Failed to insert order item.'
            ];
        }

        return [
            'insertOrderDetails' => true
        ];
    }
}