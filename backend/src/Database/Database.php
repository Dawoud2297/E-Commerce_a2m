<?php

namespace App\Database;

use Throwable;
use mysqli;

class Database
{
    private $DB_HOST;
    private $DB_USERNAME;
    private $DB_PASSWORD;
    private $DB_NAME;
    private $connection;
    private $stmt;

    public function __construct()
    {
        $this->DB_HOST = $_ENV['DB_HOST'];
        $this->DB_USERNAME = $_ENV['DB_USERNAME'];
        $this->DB_PASSWORD = $_ENV['DB_PASSWORD'];
        $this->DB_NAME = $_ENV['DB_NAME'];

        try {
            $this->connection = new mysqli(
                $this->DB_HOST,
                $this->DB_USERNAME,
                $this->DB_PASSWORD,
                $this->DB_NAME,
            );
            if ($this->connection->connect_error) {
                die("Mysqli Connection Error " . $this->connection->connect_error);
            }
        } catch (Throwable $th) {
            die("Catch Database Connection " . $th);
        }
    }

    public function query($query, string $type = "", array $params = [])
    {
        $this->stmt = $this->connection->prepare($query);
        if ($type && $params) {
            $this->stmt->bind_param($type, ...$params);
        }
        $this->stmt->execute();

        return $this;
    }
    public function get()
    {
        return $this->stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
    public function row()
    {
        return $this->stmt->get_result()->fetch_assoc();
    }
    public function lastInsertdId()
    {
        return $this->connection->insert_id;
    }
    public function beginTransaction()
    {
        return $this->connection->begin_transaction();
    }
    public function commitTransaction()
    {
        return $this->connection->commit();
    }
    public function rollbackTransaction()
    {
        return $this->connection->rollback();
    }
}
