<?php

namespace App\Models;

use App\Database\Database;

abstract class Model
{
    protected $db;
    protected static string $table;
    public function __construct()
    {
        $this->db = new Database();

    }
    public static function fetchAll()
    {
        $query = 'SELECT * FROM ' . static::$table;
        return (new static)->db->query($query)->get();
    }
    public static function find(string $value, ?string $column = 'id')
    {
        $query = 'SELECT * FROM ' . static::$table . ' WHERE ' . $column . ' = ? LIMIT 1';
        $params = [$value];
        return (new static)->db->query($query, "s", $params)->get();
    }
}