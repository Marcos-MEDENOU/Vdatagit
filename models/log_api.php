<?php
namespace models;
class log extends dtbase{
function Insert(array $data){
   $this->SendData("INSERT INTO log_api(code_erreur,message_erreur,form_id,data_id) VALUES (?,?,?,?)",$data);
}
function Update(array $data){
   $this->SendData("UPDATE log_api_inject SET (code_erreur=?,message_erreur=?,form_id=?,data_id=?)WHERE id=?",$data);
}
function  GetAll(): array{
   return $this->GetManyData("SELECT code_erreur,message_erreur,form_id,data_id FROM log_connexion WHERE id=?");
}
}
?>