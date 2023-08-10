<?php

namespace models;

include_once 'config/env.php';

class dtbase
{
    function ConnectDB()
    {
        try {
            $dsn = "mysql:host=" . $_ENV['host'] . ";dbname=" . $_ENV['bdd'] . ";charset=utf8";
            $bdd = new \PDO($dsn, $_ENV['users'], $_ENV['passwords']);
           
            $bdd->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            return $bdd;
        } catch (\PDOException $e) {
            return " Une erreur est retrouvée : " . $e->getMessage();
        }
    }
     
    protected function SendData(string $request, array $data)
    {
        try {
            $bdd = $this->ConnectDB();
            $requette = $bdd->prepare($request);
            $requette->execute($data);
        } catch (\PDOException $e) {
            return " Une erreur est retrouvée : " . $e->getMessage();
        }
    }

    function GetOneData(string $request, ?array $data = NULL)
    {
        try {
            $bdd = $this->ConnectDB();
            $requette = $bdd->prepare($request);
            $requette->execute($data);
            return $requette->fetch(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            return " Une erreur est retrouvée : " . $e->getMessage();
        }
    }

    protected function GetManyData($request, ?array $data = NULL)
    {
        try {
            $bdd = $this->ConnectDB();
            $requette = $bdd->prepare($request);
            $requette->execute($data);
            return $requette->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            return " Une erreur est retrouvée : " . $e->getMessage();
        }
    }

    /**
     * updating function add by @marcos
     *
     * @return void
     */
    protected function UpdateDataBeforeView(?array $data = NULL){
        try {
            $bdd  = $this->ConnectDB();
            $requette = $bdd->prepare("UPDATE data_collected SET code_postal = 'anonyme', email = 'anonyme' , telephone = 'anonyme' WHERE created_at < NOW() - INTERVAL 6 MONTH");
            $requette->execute($data);
            return $requette->fetchAll(\PDO::FETCH_ASSOC);
        } catch(\PDOException $e){
            return "Une erreur est retrouvée : " .$e->getMessage();
        }
    }
}
