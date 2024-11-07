<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class AttributeType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Attribute',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'type' => Type::string(),
                'items' => Type::listOf(new AttributeItemType())
            ]
        ];
        parent::__construct($config);
    }
}