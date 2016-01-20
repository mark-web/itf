<?PHP   if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Response{
    function __construct(){

    }

    public function good_response($data='',$content_type='')
    {
        self::set_content_type($content_type);
        die($data);
    }

    public function bad_response($error_data = '', $status_code = 200, $content_type = '')
    {
        self::set_content_type($content_type);
        self::set_http_status($status_code);
        die($error_data);
    }

    public function good_response_json($data='',$description='')
    { 
        self::set_content_type('json');
        die( json_encode(array('answer' => 'ok','data' => $data,'description' => $description)));
    }

    public function bad_response_json($error_data = '', $error_description = '', $status_code = 200)
    {
        self::set_content_type('json');
        self::set_http_status($status_code);
        die( json_encode(array('answer' => 'error','data' => $error_data,'description' => $error_description)));

    }

    public function set_content_type($type=''){
        if(!empty(self::$headers[$type])){
            header(self::$headers[$type]);
        }
    }

    public function set_http_status($status_code = 200){
        header($_SERVER['SERVER_PROTOCOL'] . ' ' . $status_code . ' ' . self::get_status_description($status_code), true, $status_code);
    }

    private function get_status_description($status = 200){
        return self::$http_status_codes[$status];
    }

    public static $headers =array(
        'json'=>'Content-Type: application/json' );


    public static $http_status_codes = array(
        // Informational 1xx
        100 => 'Continue',
        101 => 'Switching Protocols',

        // Success 2xx
        200 => 'OK',
        201 => 'Created',
        202 => 'Accepted',
        203 => 'Non-Authoritative Information',
        204 => 'No Content',
        205 => 'Reset Content',
        206 => 'Partial Content',

        // Redirection 3xx
        300 => 'Multiple Choices',
        301 => 'Moved Permanently',
        302 => 'Found',  // 1.1
        303 => 'See Other',
        304 => 'Not Modified',
        305 => 'Use Proxy',
        // 306 is deprecated but reserved
        307 => 'Temporary Redirect',

        // Client Error 4xx
        400 => 'Bad Request',
        401 => 'Unauthorized',
        402 => 'Payment Required',
        403 => 'Forbidden',
        404 => 'Not Found',
        405 => 'Method Not Allowed',
        406 => 'Not Acceptable',
        407 => 'Proxy Authentication Required',
        408 => 'Request Timeout',
        409 => 'Conflict',
        410 => 'Gone',
        411 => 'Length Required',
        412 => 'Precondition Failed',
        413 => 'Request Entity Too Large',
        414 => 'Request-URI Too Long',
        415 => 'Unsupported Media Type',
        416 => 'Requested Range Not Satisfiable',
        417 => 'Expectation Failed',

        // Server Error 5xx
        500 => 'Internal Server Error',
        501 => 'Not Implemented',
        502 => 'Bad Gateway',
        503 => 'Service Unavailable',
        504 => 'Gateway Timeout',
        505 => 'HTTP Version Not Supported',
        509 => 'Bandwidth Limit Exceeded'
    );
}