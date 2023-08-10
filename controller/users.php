<?php
namespace controller;
session_start();
class users
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
            $this->list();
        }
    }

    public function list()
    {
        $adminUsername = $_SESSION['auth'];

        $data = $this->model->GetUser();
        include_once 'views/user-table.phtml';
    }

    public function delete(){
        $adminUsername = $_SESSION['auth'];
        $pseudo=$_GET['pseudo'];
        if (isset($pseudo)){
        $pseudodecrypt=$this->datadecrypt($_GET['pseudo']);
        
        $data=$this->model->Delete($pseudodecrypt);
    }
    header("location:index.php?goto=" . $this->datacrypt('users') . "&target=" . $this->datacrypt('list'));
    }
}
