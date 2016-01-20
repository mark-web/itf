<?PHP if (!defined('BASEPATH')) exit('No direct script access allowed');

class Request
{
    public function SendRequest($data = '', $url, $type='',$request_type='post', $timeout = 60)
    {
        switch ($type) {
            case 'xml':
                $type = 'application/xml';
                break;
            case 'json':
                $type = 'application/json';
                break;
            default:
                $type = 'text/plain';
        }

        $ch = curl_init($url);

        $cert_file = $_SERVER['DOCUMENT_ROOT'].'/cert/trace_cert.pem';
        $cert_key = $_SERVER['DOCUMENT_ROOT'].'/cert/trace_cert.key';
        // $cert_password = "";

        if ($ch) {
            if ($request_type=='post'){
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            }
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 20);
            curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: {$type}"));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

            curl_setopt($ch, CURLOPT_SSLCERT, $cert_file);
            curl_setopt($ch, CURLOPT_SSLKEY, $cert_key);
            //curl_setopt($ch, CURLOPT_SSLCERTPASSWD, $cert_password);

            //продолжительность выполнения запроса
            $start = microtime(true);


            $response = curl_exec($ch);

            $end = microtime(true);
            $runtime = $end - $start;

            $this->log($data, $url, $request_type,$runtime);

            $info = curl_getinfo($ch);

            if(curl_errno($ch) == 0){
                curl_close($ch);
                if ($info['http_code'] !=200){
                    $this->log_error($response, $url, 'Статус код: '.$info['http_code'],$request_type,$runtime);
                    throw new Exception('Помилка підключення до терміналу! Статус код: '.$info['http_code']);
                }
            }else{
                $this->log_error($response, $url, curl_error($ch),$request_type,$runtime);
                throw new Exception('Помилка підключення до терміналу! Причина: '.curl_error($ch));
            }
        } else {
            throw new Exception("Не вдалося встановити підключення!");
        }
        return $response;
    }

    /**
     * Метод вытягивания RAW_POST_DATA из потока.
     *
     * @return varchar
     */
    public function get_post()
    {

        $handle = fopen("php://input", "rb");
        $contents = '';
        while (!feof($handle))
        {
            $contents .= fread($handle, 8192);
        }
        fclose($handle);


        return $contents;

    }

    public function log($data, $url,$request_type,$time=0){
        //когда подливаем контент не логируем, много места занимает
        if(strpos($url,'setContent')!==false){
            $data = 'setContent';
        }
        $info  = '<Log>';
        $info .= '<Date>'.date("Y-m-d H:i:s")."</Date>";
        $info .= '<Ldap>'.$_SESSION['user_login']."</Ldap>";
        $info .= '<URL>'.$url."</URL>";
        $info .= '<Method>'.$request_type."</Method>";
        $info .= '<Info>'.base64_encode($data)."</Info>";
        $info .= '<Execution_time>'.$time."</Execution_time>";
        $info .= "</Log>";
        file_put_contents('logs/log_'.date("Y-m-d").'.log',$info, FILE_APPEND);
    }

    public function log_error($response, $url,$Error,$request_type,$time=0){

        if(strpos($url,'setContent')!==false){
            $response = 'setContent';
        }
        $info  = '<Log>';
        $info .= '<Date>'.date("Y-m-d H:i:s")."</Date>";
        $info .= '<Ldap>'.$_SESSION['user_login']."</Ldap>";
        $info .= '<URL>'.$url."</URL>";
        $info .= '<Method>'.$request_type."</Method>";
        $info .= '<Info>'.base64_encode($response)."</Info>";
        $info .= '<Execution_time>'.$time."</Execution_time>";
        $info .= "</Log>";
        file_put_contents('logs/error-log_'.date("Y-m-d").'.log',$info, FILE_APPEND);
    }
}