<?php
namespace models;
class LogConnect extends dtbase{
function Insert(array $data){
    return $this->SendData("INSERT INTO log_connexion (pseudo,_message,statuts,created_at,user_ip,user_id) VALUES (?,?,?,?,?)",$data);
}
function Update(array $data){
   $this->SendData("UPDATE log_connexion SET (pseudo=?,_message=?,statuts=?,created_at=?,user_ip=?,user_id=?)WHERE id=?",$data);
}

function GetAll(): array{
   return $this->GetManyData("SELECT pseudo,_message,statuts,created_at,user_ip,user_id FROM log_connexion WHERE id=?");
}
}
?>