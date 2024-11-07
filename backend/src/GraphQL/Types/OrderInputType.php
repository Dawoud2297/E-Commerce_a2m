<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InputObjectType;

class OrderInputType extends InputObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'OrderInput',
            'fields' => [
                'items' => [
                    'type' => Type::listOf(new OrderItemInputType())
                ],
            ],
        ];
        parent::__construct($config);
    }
}
