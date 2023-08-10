<?php
namespace models;
class tiktok_data_collected extends dtbase{

   /**
    * data_collected_tiktok
    */
function GetAllData(){
   $dta= $this->GetManyData("SELECT* FROM `vdata`.`data_collected_tiktok`");
   return $dta;
}

function Insert(array $data){
   $this->SendData("INSERT INTO `vdata`.`data_collected_tiktok` (`formulaire`, `adset_name`, `campagne`, `leadgen_id`, `fai_actuel`, `fai_actuel_val`, `code_postal`, `email`, `telephone`, `retour_api`, `code_retour_api`, `created_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",$data);
}

function Update(array $data){
   $this->SendData("UPDATE data_collected_tiktok SET (formulaire=?,adset_name=?,campagne=?,leadgen_id=?,fai_actuel=?,fai_actuel_val=?,code_postal=?,email=?,telephone=?,retour_api=?,code_retour_api=?,created_at=?)WHERE id=?",$data);
}
function Delete(int $id){
   $this->SendData("DELETE  FROM data_collected_tiktok WHERE id=?",[$id]);
}
function GetData(): array{
   return $this->GetManyData("SELECT `formulaire`, `adset_name`, `campagne`, `leadgen_id`, `fai_actuel`, `fai_actuel_val`, `code_postal`, `email`, `telephone`, `retour_api`, `code_retour_api`, `created_at FROM data_collected,null");
}
function GetCount(array $data){
   return $this->GetOneData("SELECT COUNT(*) FROM `data_collected_tiktok` WHERE `campagne`='FIBRE' AND `created_at` BETWEEN ? AND ?",$data);
}

function TempData(array $data): array{
   return $this->GetManyData("SELECT `formulaire`, `adset_name`, `campagne`, `leadgen_id`, `fai_actuel`, `fai_actuel_val`, `code_postal`, `email`, `telephone`, `retour_api`, `code_retour_api`, `created_at FROM data_collected WHERE created_at=?",$data);
}
function TotalNixxis(array $data){
   return $this->GetOneData("SELECT COUNT(*) FROM `data_collected_tiktok` WHERE `campagne`='FIBRE' AND `code_retour_api`=200 AND `created_at` BETWEEN ? AND ?",$data);
}


function TotalDoublon(array $data){
   return $this->GetOneData("SELECT COUNT(*) FROM `data_collected_tiktok` WHERE `campagne`='FIBRE' AND `code_retour_api`=409 AND `created_at` BETWEEN ? AND ?",$data);
}


function RejetErreur(array $data){
   return $this->GetOneData("SELECT COUNT(*) FROM `data_collected_tiktok` WHERE `campagne`='FIBRE' AND `code_retour_api`=500 AND `created_at` BETWEEN ? AND ?",$data);
}

function Telephone(array $data){
   return $this-> GetOneData("SELECT COUNT( DISTINCT `telephone`) FROM `data_collected_tiktok`  WHERE `campagne`='FIBRE' AND `created_at` BETWEEN ? AND ?",$data);
}

/**
 * data collected tiktok
 */

}
