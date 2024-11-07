<?php

namespace App\Models;

class Attribute extends Model
{
    protected static string $table = 'attributes';

    public static function findByProductId($productId)
    {
        $query = 'SELECT 
                ai.*, 
                a.name as attribute_name, 
                a.type as attribute_type
            FROM 
                attributes a
            JOIN 
                attribute_items ai
            ON 
                ai.attribute_id = a.id 
            WHERE 
                product_id = ?';
        $params = [$productId];
        $attributes = [];
        $items = (new static)->db->query(
            $query,
            "s",
            $params,
        )->get();


        foreach ($items as $item) {
            $attributeId = $item['attribute_id'];

            if (!isset($attributes[$attributeId])) {
                $attributes[$attributeId] = [
                    'id' => $item['id'],
                    'name' => $item['attribute_name'],
                    'type' => $item['attribute_type'],
                    'items' => [],
                ];
            }
            $attributes[$attributeId]['items'][] = [
                'id' => $item['id'],
                'attribute_id' => $attributeId,
                'value' => $item['value'],
                'display_value' => $item['display_value'],
            ];
        }

        return $attributes;
    }
}