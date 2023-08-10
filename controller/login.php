<?php

namespace controller;

session_start();




class login
{
    private $model;
    use crypt;
    function __construct()
    {
        $this->model = new \models\user();
        if (isset($_GET['target'])) {
            $target = $this->datadecrypt($_GET['target']);
            if ($this->$target()) {
                $this->$target();
            }
        } else {
            $this->login();
        }
    }

    public function Ajout()
    {

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (isset($_POST["user_name"]) && isset($_POST["user_surname"]) && isset($_POST["pseudo"]) && isset($_POST["_password"]) && isset($_POST["user_role"])) {
                $datacryptlogin = $this->datacrypt('login');
                $password = password_hash(stripslashes(trim($_POST["_password"])), PASSWORD_DEFAULT);
                $verif = $this->model->verifUser($_POST["pseudo"]);
                if ($verif) {
                    header("location:index.php?goto=" . $this->datacrypt('login') . "&target=" . $this->datacrypt('Ajout') . "&invalid=yes");
                } else {
                    $this->model->Insert([stripslashes(trim($_POST["user_name"])), stripslashes(trim($_POST["user_surname"])), stripslashes(trim($_POST["pseudo"])), $password, stripslashes(trim($_POST["user_role"]))]);
                    header("location:index.php?goto=" . $this->datacrypt('users') . "&target=" . $this->datacrypt('list'));
                }
            }
        }

        include 'views/pages/register.phtml';
    }
    public function login()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (isset($_POST["pseudo"]) && isset($_POST["_password"])) {
                $user = $this->model->GetAdminByLogin($_POST["pseudo"]);

                if ($user) {
                    
                    if (password_verify($_POST["_password"], $user['_password'])) {
                        $_SESSION["auth"] = ['pseudo' => $_POST["pseudo"], '_password' => $_POST["_password"], 'user_role' => $user["user_role"]];
                        // if($user['user_role'] == "token_viewers"){
                        if($user['user_role'] == "user"){
                            header("location: index.php?goto=" . $this->datacrypt('dashboard') . "&target=" . $this->datacrypt('token_viewers') );
                            exit();
                        }else{
                            header("location: index.php?goto=" . $this->datacrypt('dashboard') . "&target=" . $this->datacrypt('dashboard') . "&data_type=" . $this->datacrypt('data_collected'));
                            exit();
                        }
                       
                    }
                } else {
                    $pseudo = $_POST["pseudo"];
                    header("location:index.php?goto=" . $this->datacrypt('login') . "&target=" . $this->datacrypt('login') . "&pseudo=$pseudo&invalid=yes");
                    exit();
                }
            }
        }
        include 'views/pages/login.phtml';
    }
}
