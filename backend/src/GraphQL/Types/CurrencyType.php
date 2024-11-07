<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class CurrencyType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Currency',
            'fields' => [
                'label' => Type::string(),
                'symbol' => Type::string()
            ]
        ];
        parent::__construct($config);
    }
}