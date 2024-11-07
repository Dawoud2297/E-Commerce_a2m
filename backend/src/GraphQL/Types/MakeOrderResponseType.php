<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class MakeOrderResponseType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'MakeOrderResponse',
            'fields' => [
                'message' => Type::string(),
                'orderId'=>Type::int()
            ]
        ];
        parent::__construct($config);
    }
}