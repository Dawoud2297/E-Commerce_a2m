<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\ProductType;
use App\GraphQL\Resolvers\ProductsResolver;
use App\Models\Category;

class Query extends ObjectType
{
    public function __construct()
    {
        $productType = new ProductType();
        $config = [
            'name' => 'Query',
            'fields' => [
                'echo' => [
                    'type' => Type::string(),
                    'args' => [
                        'message' => ['type' => Type::string()],
                    ],
                    'resolve' => static fn($rootValue, array $args): string => $rootValue['prefix'] . $args['message'],
                ],
                'categories' => [
                    'type' => Type::listOf(new CategoryType()),
                    'resolve' => static fn() => Category::fetchAll()
                ],
                'products' => [
                    'type' => Type::listOf($productType),
                    'args' => [
                        'category' => [
                            'type' => Type::string()
                        ]
                    ],
                    'resolve' => static fn($rootValue, $args) => ProductsResolver::allProducts($args['category'] ?? null)
                ],
                'product' => [
                    'type' => $productType,
                    'args' => [
                        'id' => [
                            'type' => Type::nonNull(Type::string())
                        ],
                    ],
                    'resolve' => static fn($rootValue, $args) => ProductsResolver::getOneProduct($args['id'])
                ]
            ],
        ];
        parent::__construct($config);
    }
}
