<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class PriceType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Price',
            'fields' => [
                'amount' => Type::string(),
                'currency' => new CurrencyType()
            ]
        ];
        parent::__construct($config);
    }
}