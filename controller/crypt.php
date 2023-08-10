<?php
namespace controller;
include_once 'config/env.php';
trait crypt{


    public function datacrypt($data)
    {
        $first_key = base64_decode($_ENV['FIRSTKEY']);
        $second_key = base64_decode($_ENV['SECONDKEY']);   
   
        $method = "aes-256-cbc";   
        $iv_length = openssl_cipher_iv_length($method);
        $iv = openssl_random_pseudo_bytes($iv_length);
       
        $first_encrypted = openssl_encrypt($data,$method,$first_key, OPENSSL_RAW_DATA ,$iv);   
        $output = base64_encode($iv.$first_encrypted);   
        $output = str_replace('+','[plus]',$output);
        return $output;        
    }

    public function datadecrypt($input)
    {
        $input=str_replace('[plus]','+',$input);
        $first_key = base64_decode($_ENV['FIRSTKEY']);
        $second_key = base64_decode($_ENV['SECONDKEY']);           
        $mix = base64_decode($input);
       
        $method = "aes-256-cbc";   
        $iv_length = openssl_cipher_iv_length($method);
           
        $iv = substr($mix,0,$iv_length);
        $first_encrypted = substr($mix,$iv_length);
           
        $data = openssl_decrypt($first_encrypted,$method,$first_key,OPENSSL_RAW_DATA,$iv);

   
       return $data;
        
    }
}

?>