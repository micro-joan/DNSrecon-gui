
<!DOCTYPE html>
<html lang="en">

  <head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <title>DNSRECON GUI v1.0</title>

    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Additional CSS Files -->
    <link rel="stylesheet" href="assets/css/fontawesome.css">
    <link rel="stylesheet" href="assets/css/templatemo-plot-listing.css">
    <link rel="stylesheet" href="assets/css/animated.css">
    <link rel="stylesheet" href="assets/css/owl.css">

  </head>

<body>

  <!-- ***** Preloader Start ***** -->
  <div id="js-preloader" class="js-preloader">
    <div class="preloader-inner">
      <span class="dot"></span>
      <div class="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>

  <div class="main-banner">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="top-text header-text">
            <h6>DNSRECON GUI by <u><a style="color:white" href="https://microjoan.com/" target="_blank">MicroJoan</a></u></h6>
            <h2>INFORMATION GATHERING DNS</h2>
          </div>
        </div>
        <div class="col-lg-12">
          <form id="search-form" form action="" method="post">
            <div class="row">
              <div class="col-lg-9 align-self-center">
                  <fieldset>
                      <input name="domain" id="domain" class="searchText" placeholder="Enter domain" required>
                  </fieldset>
              </div>
              <div class="col-lg-3">                        
                  <button type="submit">Search Now</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <?php 

    $domain = $_POST['domain'];

    if($domain > ""){

      //se elimina la ultima búsqueda
      $delete_last_search = 'rm /var/www/html/dnsrecon-gui/dnsrecon_results/search.json';
      exec($delete_last_search);

      //se guarda el resultado de la nueva búsqueda
      $run_dnsrecon = 'dnsrecon -d'.$domain.' -j /var/www/html/dnsrecon-gui/dnsrecon_results/search.json';
      exec($run_dnsrecon);

      //se guardan los datos de los resultados
      $search_json = file_get_contents('/var/www/html/dnsrecon-gui/dnsrecon_results/search.json');
      $decoded_json = json_decode($search_json, true);
      
      $domains = $decoded_json;
      
      $document_content = "const defaultValues = {";
      $document_content .= '"documentContent": "Map of '.$domain.'\n\tDNS servers (NS)\n\t\t';
      
      $ns_registers = "";//registros de los dns encontrados
      $a_registers = '\n\t'."Domains and ip's (A)".'\n\t\t';
      $mx_registers = '\n\t'."Email registers (MX)".'\n\t\t';
      $srv_registers = '\n\t'."Special services (SRV)".'\n\t\t';
      $txt_registers = '\n\t'."Text registers (TXT)".'\n\t\t';

      foreach($domains as $domain) {
          $type = $domain["type"];

          if($type == "NS"){
            $address = $domain["address"];
            $target = $domain["target"];

            $ns_registers .= $target." (".$address.")";
            $ns_registers .= '\n\t\t';
          }

          if($type == "A"){
            $address = $domain["address"];
            $domain = $domain["domain"];

            $a_registers .= $domain." (".$address.")";
            $a_registers .= '\n\t\t';
          }

          if($type == "MX"){
            $address = $domain["address"];
            $exchange = $domain["exchange"];

            $mx_registers .= $exchange." (".$address.")";
            $mx_registers .= '\n\t\t';
          }

          if($type == "SRV"){
            $address = $domain["address"];
            $port = $domain["port"];
            $domain = $domain["domain"];

            $srv_registers .= $domain.":".$port." - ".$address;
            $srv_registers .= '\n\t\t';
          }

          
          if($type == 'TXT'){
            $strings = $domain["strings"];
            $domain = $domain["domain"];
            
            $txt_registers .= $domain." = ".$strings;
            $txt_registers .= '\n\t\t';
          }
      }

      $document_content .= $ns_registers.$a_registers.$mx_registers.$srv_registers.$txt_registers.'",';
      $document_content .= '"documentTitle": "Untitled Document" };';

      //echo $document_content;

      //eliminamos archivo con los resultados anteriores
      unlink('text2mindmap/scripts/data_graph.js');

      //creamos el nuevo archivo con la información
      $file_handle = fopen('text2mindmap/scripts/data_graph.js', 'a+');
      fwrite($file_handle, $document_content);
      fclose($file_handle);

      header('Location: '.'text2mindmap/index.php');
      
    }else{}
    
  ?>

  <footer style="margin-top: -8%;">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="sub-footer">
			      Designed by: <a rel="nofollow" href="https://microjoan.com/" title="CSS Templates"><b>MicroJoan</b></a></p>
          </div>
        </div>
      </div>
    </div>
  </footer>


  <!-- Scripts -->
  <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/owl-carousel.js"></script>
  <script src="assets/js/animation.js"></script>
  <script src="assets/js/imagesloaded.js"></script>
  <script src="assets/js/custom.js"></script>

</body>

</html>
