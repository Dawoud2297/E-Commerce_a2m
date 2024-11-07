<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InputObjectType;

class AttributeValueInputType extends InputObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'AttributeValueInput',
            'fields' => [
                'id' => ['type' => Type::nonNull(Type::string())],
                'value' => ['type' => Type::nonNull(Type::string())],
            ],
        ];
        parent::__construct($config);
    }
}
