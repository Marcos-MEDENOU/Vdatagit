<?php
namespace apps\router;
// http://localhost/index.php?goto=login&target=login
class router 
{
    public function datadecrypt($input)
    {
        define('FIRSTKEY', 'Lk5Uz3slx3BrAghS1aaW5AYgWZRV0tIX5eI0yPchFz4=');
        define('SECONDKEY', 'EZ44mFi3TlAey1b2w4Y7lVDuqO+SRxGXsa7nctnr/JmMrA2vN6EJhrvdVZbxaQs5jpSe34X3ejFK/o9+Y5c83w==');
        $input=str_replace('[plus]','+',$input);
        $first_key = base64_decode(FIRSTKEY);
        $second_key = base64_decode(SECONDKEY);           
        $mix = base64_decode($input);
       
        $method = "aes-256-cbc";   
        
        $iv_length = openssl_cipher_iv_length($method);
        
        $iv = substr($mix,0,$iv_length);
        $first_encrypted = substr($mix,$iv_length);
           
        $data = openssl_decrypt($first_encrypted,$method,$first_key,OPENSSL_RAW_DATA,$iv);

   
       return $data;
        
    }



    public function route()
    {
        
        spl_autoload_register(function ($class) {
            include_once str_replace('\\', '/', $class) . ".php";
        });
    
        if (isset($_GET['goto'])) {
        switch ($this->datadecrypt($_GET['goto'])) {
            
            case 'login':
                $user = new \controller\login;
             break;

            case 'dashboard':
                $user=new \controller\dashboard;
             break;

             case 'users':
                $user=new \controller\users;
             break;
             
            default:
                $user=new \controller\login;
            }
         }else{
            $user=new \controller\login;
         }
         
    }
}
