
<?php

namespace App\Services;

use Abraham\TwitterOAuth\TwitterOAuth;

class TwitterService
{
    protected $consumer_key;
    protected $consumer_secret;
    protected $access_token;
    protected $access_token_secret;

    public function __construct($consumer_key, $consumer_secret, $access_token, $access_token_secret)
    {
        $this->consumer_key = $consumer_key;
        $this->consumer_secret = $consumer_secret;
        $this->access_token = $access_token;
        $this->access_token_secret = $access_token_secret;
    }

    public function search($q, $count = 10000)
    {
        $connection = new TwitterOAuth($this->consumer_key, $this->consumer_secret, $this->access_token, $this->access_token_secret);
        $tweets = $connection->get('search/tweets', [
            'q' => $q,
            'count' => $count,
        ]);

        return $tweets;
    }
}
