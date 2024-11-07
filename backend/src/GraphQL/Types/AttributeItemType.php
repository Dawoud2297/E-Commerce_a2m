<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class AttributeItemType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'AttributeItem',
            'fields' => [
                'id' => Type::string(),
                'attribute_id' => Type::string(),
                'value' => Type::string(),
                'display_value' => Type::string()
            ]
        ];
        parent::__construct($config);
    }
}
