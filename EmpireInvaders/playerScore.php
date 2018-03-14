<!DOCTYPE html>
<html>
<body>

  <?php
    //presi i dati di input
    $dataFromJSJson = file_get_contents('php://input');       //dati ricevuti da javascript
    $data = json_decode($dataFromJSJson, false);              //decodifica dei dati
    print_r($data);

    //presi i dati dal file json e codificati in php
    $stringFromFile= file_get_contents("rank.json");          //dati letti dal file json del rank
    $dataFromFile = json_decode($stringFromFile, false);      //decodifica dei dati

    // // //inserimento valore da javascript nel array letto da file
    array_push($dataFromFile,$data);
    //funzione per comparare lo score dei vari oggetti
    function cmp($a, $b){
        if($a == $b){
          return 0;
        }
        return($a->score > $b->score) ? -1 : 1;
    }

    //funzione per riordinare array con funzione definita da utente
    usort($dataFromFile, "cmp");


    //codifica del nuovo array con nuovo valore e riordinato in json
    $dataToWrite = json_encode($dataFromFile);


    //scrittura json su file
    $scoreDataBase = fopen("rank.json", "w") or die("Unable to open rank.json file!");
    fwrite($scoreDataBase, $dataToWrite);
    fclose($scoreDataBase);

  ?>


</body>
</html>
