<!DOCTYPE html>
<html>
<body>

  <?php
    //presi i dati di input
    $dataFromJSJson = file_get_contents('php://input');
    $data = json_decode($dataFromJSJson, true);

    print_r($data);
    echo $data;

    // //presi i dati dal file json e codificati in php
    // $stringFromFile= file_get_contents("data1.json");
    // $dataFromFile = json_decode($stringFromFile, false);
    //
    // //scorre l'array
    // echo "ARRAY CARICATO DA JSON"."<br>";
    // $index=0;
    // foreach ($dataFromFile as $value){
    //   echo $index." ".$value->name." ".$value->score."<br>";
    //   $index++;
    // }
    // //inserimento valore da javascript nel array letto da file
    // array_push($dataFromFile,$data);
    // //funzione per comparare lo score dei vari oggetti
    // function cmp($a, $b){
    //     if($a == $b){
    //       return 0;
    //     }
    //     return($a->score > $b->score) ? -1 : 1;
    // }
    // //funzione per riordinare array con funzione definita da utente
    // usort($dataFromFile, "cmp");
    //
    // echo "ARRAY CARICATO DA JSON ORDINATO"."<br>";
    // $index=0;
    // foreach ($dataFromFile as $value){
    //   echo $index." ".$value->name." ".$value->score."<br>";
    //   $index++;
    // }
    // //codifica del nuovo array con nuovo valore e riordinato in json
    // $dataToWrite = json_encode($dataFromFile);
    //
    // //scrittura json su file
    // $scoreDataBase = fopen("data.json", "w") or die("Unable to open data2.json file!");
    // fwrite($scoreDataBase, $dataToWrite);
    // fclose($scoreDataBase);

  ?>


</body>
</html>
