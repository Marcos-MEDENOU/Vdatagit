<?php
include_once '../models/Database.php';
$connect=sgbd_connect();
/////////////////////////////////////////////////////////////////////////
//           Part 1: Subscribe a leadgen endpoint to webhook           //
/////////////////////////////////////////////////////////////////////////
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // A token that Facebook will echo back to you as part of callback URL verification.
    $VERIFY_TOKEN = 'K2BlqR2D/rKyZZtVHben2DPid5Bua9IntX8aHtFD1BgCTrDQkune4/rUkOuw';
    // Extract a verify token we set in the webhook subscription and a challenge to echo back.
    $verify_token = $_GET['hub_verify_token'];
    $challenge = $_GET['hub_challenge'];
    if (!$verify_token || !$challenge) {
      echo 'Missing hub.verify_token and hub.challenge params';
      exit();
    }
  
    if ($verify_token !== $VERIFY_TOKEN) {
      echo 'Verify token does not match';
      exit();
    }
    // We echo the received challenge back to Facebook to finish the verification process.
    echo $challenge;
  }
  ///////////////////////////////////////////////////////////////////////
  //            Part 2: Getting data from leadgen                     //
  /////////////////////////////////////////////////////////////////////
  $GRAPH_API_VERSION = 'v15.0';
$GRAPH_API_ENDPOINT = 'https://graph.facebook.com/' . $GRAPH_API_VERSION;
// Your system user access token file path.
// Note: Your system user needs to be an admin of the subscribed page.

$ACCESS_TOKEN_PATH = './token/access_token.txt';



// Facebook will post realtime leads to this endpoint if we've already subscribed to the webhook in part 1.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  // Read access token for calling graph API
  if (!file_exists($ACCESS_TOKEN_PATH)) {

    log_api_inject($connect,'400','Token_manquant','');
    exit();
  }

  $access_token = file_get_contents($ACCESS_TOKEN_PATH);
  // Get value from request body
  $body = json_decode(file_get_contents('php://input'), true);


  foreach ($body['entry'] as $page) {
    foreach ($page['changes'] as $change) {
      // We get page, form, and lead IDs from the change here.
      // We need the lead gen ID to get the lead data.
      // The form ID and page ID are optional. You may want to record them into your CRM system.
      $page_id = $change['value']['page_id'];
      $form_id = $change['value']['form_id'];
      $adset_name = $change['value']['adset_name'];
      $leadgen_id = $change['value']['leadgen_id'];
      

      // Call graph API to request lead info with the lead ID and access token.
      $leadgen_uri = $GRAPH_API_ENDPOINT . '/' . $leadgen_id . '?access_token=' . $access_token;
      $response = file_get_contents($leadgen_uri);
      if ($response) {
        $response = json_decode($response);
        $id = $response->id;
        $created_time = $response->created_time;
        $field_data = $response->field_data;
        $answers_data = [];
        foreach ($field_data as $field) {
          $question = $field->name;
          $answers = $field->values;
          //  console_log('Question '.$question);
          //  console_log('Answers '.print_r($answers, true));
          switch ($answers[0]) {
            case "sfr_/_red_by_sfr":
              $answers[0] = "SFR / Red by SFR";
              break;
            case "orange_\/_sosh":
              $answers[0] = "Orange / Sosh";
              break;
          }
         if(str_contains($question,"quel_est_votre_fournisseur")){
            $question="FAI_ACTUEL";
         }
         if(str_contains($question,"depuis_quand")){
            $question="FAI_ACTUEL_VAL";
         }
        //  if(str_contains($question,"code_postal")){
        //     $question="Code_Postal";
        //  }
         if(str_contains($question,"e-mail")){
            $question="email";
         }
         if(str_contains($question,"phone")){
            $question="phone";
         }
          $answers_data+=[$question=>$answers[0]];
          
        }
if($form_id && $leadgen_id && !empty($field_data)){
  
       $fai_actuel=$answers_data["FAI_ACTUEL"];
       $fai_actuel_val=$answers_data["FAI_ACTUEL_VAL"];
      //  $code_postal=$answers_data["Code_Postal"];
       $email_titulaire=$answers_data["email"];
       $phone=$answers_data["phone"];

        $service_url        = 'https://dim.vippinterstis.com/inject.php';
        $service_token        = 'rzal8ge2v8sq0qn8pvhqq';
        if($fai_actuel=="bouygues"){
          $campaign            = '2e530001-b373-4df8-a3b2-7857c9dc78c3'; //FREE
          $Flag='FREE_LEAD_VDATA';
        }else{
          $campaign            = '46ad8ac6-f3a6-46bf-a35d-e8fba01ed08b'; //BYTEL
          $Flag='BOUYGUES_LEADS_VDATA';
        }
        $request_array        = array(
              #	header data
              'token'                    => $service_token,
              'campagn'                => $campaign,
              #	lead data
              'ACTIVITE'                => $Flag,
              'FAI_ACTUEL'=>$fai_actuel,
              'FAI_ACTUEL_VAL'=>$fai_actuel_val,
              #'Code_Postal___Adresse_Titulaire'                => $code_postal,
              'Email___Titulaire'                =>  $email_titulaire,
              'TEL_PORT_PRIO_1'                => $phone,
              'adset_name' => $adset_name,
              'TRANSMIT_DISPATCH'                => $Flag
          
          );
          $request_json = json_encode($request_array);

          $curl = curl_init();
          curl_setopt($curl, CURLOPT_URL, $service_url);
          curl_setopt($curl, CURLOPT_COOKIESESSION, true);
          curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
          curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
          curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
          curl_setopt($curl, CURLOPT_POSTFIELDS, $request_json);
          curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
          $return = curl_exec($curl);
          $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
          curl_close($curl);
          
         
          $data_id=collect_data($connect, $form_id,'FIBRE',$leadgen_id, $adset_name,$fai_actuel,$fai_actuel_val,$email_titulaire, $phone,json_encode($return),$httpcode);
          log_api_inject($connect,$httpcode,json_encode($return),$form_id, $data_id);
          
        }
      } else {
        log_api_inject($connect,'400','Token expire','');
      }
    }
    // Send HTTP 200 OK status to indicate we've received the update.
    http_response_code(200);
  }
}