<?php

namespace App\Models;

class Order extends Model
{
    protected static string $table = 'orders';

    public static function create(): array
    {
        $query = 'INSERT INTO ' . static::$table . ' (total_amount,total_currency) VALUE (?,?)';
        $params = [0, 'USD'];
        $order = (new static)->db->query($query, "is", $params);

        if (!$order) {
            return [
                'createInitialOrder' => false,
                'error' => 'Failed to create order'
            ];
        }

        return [
            'createInitialOrder' => true,
            'orderId' => $order->lastInsertdId()
        ];
    }

    public static function update(int $orderId, float $totalAmount, string $currency): array
    {
        $query = 'UPDATE ' . static::$table . ' SET total_amount = ?, total_currency = ? WHERE id = ?';
        $params = [$totalAmount, $currency, $orderId];
        $result = (new static)->db->query($query, "dsi", $params);


        if (!$result) {
            return [
                'updateOrder' => false,
                'error' => 'Failed to update order'
            ];
        }

        return [
            'updateOrder' => true
        ];
    }
}
