<?php

namespace models;

class data_collected extends dtbase
{

   /**
    * Une variable dans laquel on stocke le nom de la table ou les informations sont recupérées =>Ce qui rend le code beaucoup polus flexible et dynamique
    */
   public string $data_type_name;


   /**
    * @constructor
    */
   public function __construct(
      string $data_type_valid_name,

   ) {
      /**
       * initialisation de la valeur du constructeur 
       */
      $this->data_type_name = $data_type_valid_name;
      /**
       * MAJ de la base de donnée en conformité avec la RGPD
       */
      $this->UpdateDataBeforeView();
   }

   function GetAllData()
   {
      $dta = $this->GetManyData("SELECT* FROM `vdata`.$this->data_type_name");
      return $dta;
   }

   function Insert(array $data)
   {
      $this->SendData("INSERT INTO $this->data_type_name (`formulaire`, `adsetname`, `campagne`, `leadgen_id`, `fai_actuel`, `fai_actuel_val`, `code_postal`, `email`, `telephone`, `retour_api`, `code_retour_api`, `created_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", $data);
   }

   function Update(array $data)
   {
      $this->SendData("UPDATE $this->data_type_name SET (formulaire=?,adsetname=?,campagne=?,leadgen_id=?,fai_actuel=?,fai_actuel_val=?,code_postal=?,email=?,telephone=?,retour_api=?,code_retour_api=?,created_at=?)WHERE id=?", $data);
   }
   function Delete(int $id)
   {
      $this->SendData("DELETE  FROM $this->data_type_name WHERE id=?", [$id]);
   }
   function GetData(): array
   {
      return $this->GetManyData("SELECT `formulaire`, `adsetname`, `campagne`, `leadgen_id`, `fai_actuel`, `fai_actuel_val`, `code_postal`, `email`, `telephone`, `retour_api`, `code_retour_api`, `created_at FROM $this->data_type_name,null");
   }
   function GetSearchData(array $data): array
   {
      return $this->GetManyData("SELECT * FROM $this->data_type_name WHERE `created_at` BETWEEN ? AND ?", $data);
   }

   function GetCount(array $data)
   {
      if (isset($_GET["app"])) {
         switch ($this->datadecrypt($_GET["app"])) {
            case 'energie':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `campagne`='ENERGIE' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'bytel':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `campagne`='BYTEL' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'bytel&bouygues':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `campagne`='BYTEL' AND  `activite` = 'BOUYGUES_LEADS_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'bytel&free':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE  `campagne`='BYTEL' AND `activite` = 'FREE_LEAD_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'free':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE  `campagne`='FREE' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'free&bouygues':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `campagne`='FREE' AND  `activite` = 'BOUYGUES_LEADS_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'free&freeleads':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `campagne`='FREE' AND  `activite` = 'FREE_LEAD_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            default:
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE  `created_at` BETWEEN ? AND ?", $data);
               break;
         }
      } else {
         return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `created_at` BETWEEN ? AND ?", $data);
      }
   }

   function TempData(array $data): array
   {
      return $this->GetManyData("SELECT `formulaire`, `adsetname`, `campagne`, `leadgen_id`, `fai_actuel`, `fai_actuel_val`, `code_postal`, `email`, `telephone`, `retour_api`, `code_retour_api`, `created_at FROM $this->data_type_name WHERE created_at=?", $data);
   }
   function TotalNixxis(array $data)
   {
      if (isset($_GET["app"])) {
         switch ($this->datadecrypt($_GET["app"])) {
            case 'energie':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=200 AND `campagne`='ENERGIE' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'bytel':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=200 AND `campagne`='BYTEL' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'bytel&bouygues':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=200 AND `campagne`='BYTEL' AND  `activite` = 'BOUYGUES_LEADS_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'bytel&free':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE  `code_retour_api`=200 AND `campagne`='BYTEL' AND `activite` = 'FREE_LEAD_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'free':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE  `code_retour_api`=200 AND `campagne`='FREE' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'free&bouygues':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=200 AND `campagne`='FREE' AND  `activite` = 'BOUYGUES_LEADS_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'free&freeleads':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=200 AND `campagne`='FREE' AND  `activite` = 'FREE_LEAD_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            default:
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=200 AND `created_at` BETWEEN ? AND ?", $data);
               break;
         }
      } else {
         return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=200 AND `created_at` BETWEEN ? AND ?", $data);
      }
   }


   function TotalDoublon(array $data)
   {
      if (isset($_GET["app"])) {
         switch ($this->datadecrypt($_GET["app"])) {
            case 'energie':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=409 AND `campagne`='ENERGIE' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'bytel':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=409 AND `campagne`='BYTEL' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'bytel&bouygues':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=409 AND `campagne`='BYTEL' AND  `activite` = 'BOUYGUES_LEADS_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'bytel&free':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE  `code_retour_api`=409 AND `campagne`='BYTEL' AND `activite` = 'FREE_LEAD_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'free':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE  `code_retour_api`=409 AND `campagne`='FREE' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'free&bouygues':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=409 AND `campagne`='FREE' AND  `activite` = 'BOUYGUES_LEADS_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'free&freeleads':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=409 AND `campagne`='FREE' AND  `activite` = 'FREE_LEAD_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            default:
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=409 AND `created_at` BETWEEN ? AND ?", $data);
               break;
         }
      } else {
         return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=409 AND `created_at` BETWEEN ? AND ?", $data);
      }
   }


   function RejetErreur(array $data)
   {
      if (isset($_GET["app"])) {
         switch ($this->datadecrypt($_GET["app"])) {
            case 'energie':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=500 AND `campagne`='ENERGIE' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'bytel':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=500 AND `campagne`='BYTEL' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'bytel&bouygues':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=500 AND `campagne`='BYTEL' AND  `activite` = 'BOUYGUES_LEADS_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'bytel&free':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE  `code_retour_api`=500 AND `campagne`='BYTEL' AND `activite` = 'FREE_LEAD_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'free':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE  `code_retour_api`=500 AND `campagne`='FREE' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'free&bouygues':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=500 AND `campagne`='FREE' AND  `activite` = 'BOUYGUES_LEADS_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'free&freeleads':
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=500 AND `campagne`='FREE' AND  `activite` = 'FREE_LEAD_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            default:
               return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=500 AND `created_at` BETWEEN ? AND ?", $data);
               break;
         }
      } else {
         return $this->GetOneData("SELECT COUNT(`id`) as total FROM $this->data_type_name WHERE `code_retour_api`=500 AND `created_at` BETWEEN ? AND ?", $data);
      }
   }

   function Telephone(array $data)
   {
      if (isset($_GET["app"])) {
         switch ($this->datadecrypt($_GET["app"])) {
            case 'energie':
               return $this->GetOneData("SELECT COUNT( DISTINCT `telephone`) FROM $this->data_type_name  WHERE `campagne`='ENERGIE' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'bytel':
               return $this->GetOneData("SELECT COUNT( DISTINCT `telephone`) FROM $this->data_type_name  WHERE `campagne`='BYTEL' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'bytel&bouygues':
               return $this->GetOneData("SELECT COUNT( DISTINCT `telephone`) FROM $this->data_type_name  WHERE `campagne`='BYTEL' AND  `activite` = 'BOUYGUES_LEADS_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'bytel&free':
               return $this->GetOneData("SELECT COUNT( DISTINCT `telephone`) FROM $this->data_type_name  WHERE `campagne`='BYTEL' AND  `activite` = 'FREE_LEAD_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'free':
               return $this->GetOneData("SELECT COUNT( DISTINCT `telephone`) FROM $this->data_type_name  WHERE `campagne`='FREE' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'free&bouygues':
               return $this->GetOneData("SELECT COUNT( DISTINCT `telephone`) FROM $this->data_type_name  WHERE `campagne`='FREE' AND  `activite` = 'BOUYGUES_LEADS_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            case 'free&freeleads':
               return $this->GetOneData("SELECT COUNT( DISTINCT `telephone`) FROM $this->data_type_name  WHERE  `campagne`='FREE' AND  `activite` = 'FREE_LEAD_VDATA' AND `created_at` BETWEEN ? AND ?", $data);
               break;
            default:
               return $this->GetOneData("SELECT COUNT( DISTINCT `telephone`) FROM $this->data_type_name  WHERE `created_at` BETWEEN ? AND ?", $data);
               break;
         }
      } else {
         return $this->GetOneData("SELECT COUNT( DISTINCT `telephone`) FROM $this->data_type_name  WHERE `created_at` BETWEEN ? AND ?", $data);
      }
   }

   function exportBasequo(array $data)
   {
      $data = $this->GetManyData("SELECT* FROM `vdata`.$this->data_type_name WHERE `created_at` BETWEEN ? AND ?", $data);
      return $data;
   }

   function fai_actuel()
   {
      $data = $this->GetManyData("SELECT DISTINCT `fai_actuel` FROM `data_collected`");
      return $data;
   }
   function fai_actuel_temp(array $data)
   {
      $data = $this->GetManyData("SELECT DISTINCT `fai_actuel` FROM `data_collected`", $data);
      return $data;
   }

   function fai_actuel_count()
   {
      return $this->GetManyData("SELECT `fai_actuel`, COUNT(id) FROM `data_collected` GROUP BY `fai_actuel`");
   }
   function fai_actuel_count_temp(array $data)
   {
      $data = $this->GetManyData("SELECT `fai_actuel`, COUNT(id) FROM `data_collected` GROUP BY `fai_actuel`;
   ", $data);
      return $data;
   }
   function duree_general()
   {
      return $this->GetManyData("SELECT `fai_actuel`, `fai_actuel_val`, COUNT(*) as count FROM data_collected GROUP BY `fai_actuel`, `fai_actuel_val` HAVING COUNT(*) = ( SELECT MAX(count) FROM ( SELECT `fai_actuel`, `fai_actuel_val`, COUNT(*) as count FROM data_collected GROUP BY `fai_actuel`, `fai_actuel_val` ) as temp WHERE temp.`fai_actuel` = data_collected.`fai_actuel` )");
   }
   function verifdata()
   {
      return $this->GetOneData(" SELECT id FROM data_collected ORDER BY id DESC LIMIT 1;");
   }
   function datadecrypt($input)
   {
      $input = str_replace('[plus]', '+', $input);
      $first_key = base64_decode(FIRSTKEY);
      $second_key = base64_decode(SECONDKEY);
      $mix = base64_decode($input);

      $method = "aes-256-cbc";
      $iv_length = openssl_cipher_iv_length($method);

      $iv = substr($mix, 0, $iv_length);
      $first_encrypted = substr($mix, $iv_length);

      $data = openssl_decrypt($first_encrypted, $method, $first_key, OPENSSL_RAW_DATA, $iv);


      return $data;
   }
}
