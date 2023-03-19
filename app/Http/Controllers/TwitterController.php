<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MongoService;
use App\Services\TwitterService;

class TwitterController extends Controller
{
    public function twitters()
    {
        $consumer_key="";
        $consumer_secret="";
        $access_token="";
        $access_token_secret="";
        $host="";
        $port="";
        $database="";
        $collection="";
        // Create TwitterService instance
        $twitterService = new TwitterService($consumer_key, $consumer_secret, $access_token, $access_token_secret);

        // Create MongoService instance
        $mongoService = new MongoService($host, $port, $database, $collection);

        // Search for tweets
        $word="word";
        $tweets = $twitterService->search($word);

        // Insert tweets into MongoDB
        foreach ($tweets->statuses as $tweet) {
            $mongoService->insertTweet($tweet);
        }
    }
}
