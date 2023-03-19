<?php

namespace App\Services;

use MongoDB\Client;

class MongoService
{
    protected $client;
    protected $database;
    protected $collection;

    public function __construct($host, $port, $database, $collection)
    {
        $this->client = new Client("mongodb://$host:$port");
        $this->database = $this->client->selectDatabase($database);
        $this->collection = $this->database->selectCollection($collection);
    }

    public function insertTweet($tweet)
    {
        $result = $this->collection->insertOne([
            'tweet' => $tweet->text,
            'useruid' => $tweet->user->id,
            'datetime' => $tweet->created_at,
        ]);

        return $result;
    }
}
