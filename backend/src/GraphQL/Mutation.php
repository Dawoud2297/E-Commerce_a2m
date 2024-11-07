<?php

namespace App\GraphQL;

use App\GraphQL\Types\MakeOrderResponseType;
use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\OrderInputType;
use GraphQL\Type\Definition\ObjectType;
use App\GraphQL\Resolvers\OrderResolver;

class Mutation extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Mutation',
            'fields' => [
                'makeOrder' => [
                    'type' => new MakeOrderResponseType(),
                    'args' => [
                        'orderInput' => [
                            'type' => Type::nonNull(new OrderInputType())
                        ],
                    ],
                    'resolve' => static fn($rootValue, array $args) => OrderResolver::store($args['orderInput'])
                ],
            ]
        ];
        parent::__construct($config);
    }
}
