<?php

namespace App\GraphQL\Resolvers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Database\Database;

class OrderResolver
{
    public static function store(array $args)
    {
        if (empty($args['items'])) {
            http_response_code(400);
            die('Items are required');
        }
        $db = new Database();
        $db->beginTransaction();

        try {
            $createOrder = Order::create();
            if (!$createOrder['createInitialOrder']) {
                http_response_code(500);
                die($createOrder['error']);
            }
            $orderId = $createOrder['orderId'];

            $totalAmount = 0;
            $currency = null;

            foreach ($args['items'] as $item) {
                self::validateItemAttributes($db, $item);

                $productDetails = self::calculatePaidAmount($db, $item);

                $insertItemResult = OrderItem::insertItem($orderId, $productDetails);
                if (!$insertItemResult['insertOrderDetails']) {
                    http_response_code(500);
                    die($insertItemResult['error']);
                }
                $totalAmount += $productDetails['paidAmount'];

                if ($currency === null) {
                    $currency = $productDetails['paidCurrency'];
                }
            }
            $updateOrderResult = Order::update($orderId, $totalAmount, $currency);
            if (!$updateOrderResult['updateOrder']) {
                http_response_code(500);
                die($updateOrderResult['error']);
            }

            $db->commitTransaction();

            return [
                "message" => "Order Dispatched Successfully!",
                "orderId" => $orderId
            ];
        } catch (\Throwable $th) {
            $db->rollbackTransaction();
            throw $th;
        }
    }
    private static function validateItemAttributes($db, array $item): void
    {
        $productId = $item['productId'];

        if (!isset($productId)) {
            http_response_code(400);
            die('Missing Product ID');
        }

        $productQuery = 'SELECT inStock, name FROM products WHERE id = ?';
        $productParams = [$productId];
        $product = $db->query($productQuery, "s", $productParams)->row();

        if (!$product) {
            http_response_code(400);
            die('Product Not Found!');
        }

        if (!$product['inStock']) {
            http_response_code(400);
            die('Product ' . $product['name'] . ' is out of stock');
        }

        $attributesQuery = 'SELECT COUNT(DISTINCT attribute_id) FROM attribute_items WHERE product_id = ?';
        $attributesParams = [$productId];
        $countDistinctRes = 'COUNT(DISTINCT attribute_id)';
        $attributeCount = $db->query($attributesQuery, "s", $attributesParams)->row();
        if (!isset($item['attributeValues']) || $attributeCount[$countDistinctRes] !== count($item['attributeValues'])) {
            http_response_code(400);
            die('Attribute values are required');
        }

        foreach ($item['attributeValues'] as $attribute) {
            $query = 'SELECT COUNT(*) FROM attribute_items WHERE id = ? AND value = ? LIMIT 1';
            $params = [$attribute['id'], $attribute['value']];
            $result = $db->query($query, "ss", $params);
            $countAllRes = 'COUNT(*)';
            if ($result->row()[$countAllRes] == 0) {
                http_response_code(400);
                die("'{$product['name']}' with '{$attribute['value']}' attribute does not exist or is invalid. Please check and try again.");
            }
        }
    }

    private static function calculatePaidAmount($db, array $item): array
    {
        $productId = $item['productId'];
        $quantity = $item['quantity'] ?? 1;
        $query = 'SELECT name FROM products WHERE id = ?';
        $params = [$productId];
        $productQuery = $db->query($query, 's', $params);
        $product = $productQuery->row();

        if (!$product) {
            http_response_code(400);
            die('Product not found');
        }

        $priceQuery = 'SELECT amount, currency_label FROM prices WHERE product_id = ?';
        $priceQuery = $db->query($priceQuery, 's', $params);
        $price = $priceQuery->row();

        if (!$price) {
            http_response_code(500);
            die("Can't Show the Price in the Meanwhile");
        }

        $paidAmount = $price['amount'] * $quantity;
        $paidCurrency = $price['currency_label'];

        $formattedAttributeValues = [];
        foreach ($item['attributeValues'] as $attribute) {
            $formattedAttributeValues[strtolower($attribute['id'])] = $attribute['value'];
        }
        $attributeValuesJson = json_encode([$formattedAttributeValues]);

        return [
            'productId' => $productId,
            'productName' => $product['name'],
            'attributeValues' => $attributeValuesJson,
            'quantity' => $quantity,
            'paidAmount' => $paidAmount,
            'paidCurrency' => $paidCurrency,
        ];
    }
}
