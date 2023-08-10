<?php 
function sgbd_connect()
{
  $database = new \mysqli ('localhost', 'si-dev-vipp', 'SI-dev-vipp123!!', 'vippdata');

  if (mysqli_connect_errno()) {
    printf("Echec de la connexion : %s\n", mysqli_connect_error());
    exit();
  }


  $database->set_charset("utf8mb4");
  return $database;
}

function collect_data($mysqli,$formulaire,$campagne,$leadgen,$adset_name,$fai,$fai_val,$email,$phone,$retour_api,$code_retour){
    $stmt = mysqli_prepare($mysqli, "INSERT INTO data_collected (formulaire,campagne,leadgen_id,adset_name,fai_actuel,fai_actuel_val,email,telephone,retour_api,code_retour_api) VALUES (?,?,?,?,?,?,?,?,?,?)");
  
    mysqli_stmt_bind_param($stmt, "ssssssssss", $formulaire,$campagne,$leadgen,$adset_name,$fai,$fai_val,$email,$phone,$retour_api,$code_retour);
    mysqli_stmt_execute($stmt);
    $id = mysqli_insert_id($mysqli);
    mysqli_stmt_close($stmt);
    return $id;
}
function log_api_inject($mysqli,$code_retour,$message_retour,$formulaire,$data_id=Null){
    $stmt = mysqli_prepare($mysqli,"INSERT INTO log_api (code_erreur,message_erreur,form_id,data_id) VALUES (?,?,?,?)");
    mysqli_stmt_bind_param($stmt, "sssi", $code_retour,$message_retour,$formulaire,$data_id);
    mysqli_stmt_execute($stmt);
  
    mysqli_stmt_close($stmt);

}