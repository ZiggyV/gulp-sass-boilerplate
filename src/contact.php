<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    parse_str($_POST['formData'], $input);
    
    $name = htmlspecialchars($input["name"]);
  	$email = htmlspecialchars($input["email"]);
    $phone = htmlspecialchars($input["tel"]);
  	$message = htmlspecialchars($input["message"]);
  	$address = htmlspecialchars($input["address"]);

    $subject = "Contact formulier ruitenwasserboes.be - ";
    $subject .= htmlspecialchars($input["subject"]);

    $to = 'info@ziggyv.be';
    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $headers .= 'From:' . $email . "\r\n"; // sender's Email
    //html template
    $template = '<div>Naam: ' . $name . '<br/>'
    . 'Emailadres: ' . $email . '<br/>'
    . 'Telefoonnummer: ' . $phone . '<br/>'
    . 'Adres: ' . $address . '<br/>'
    . 'Onderwerp: ' . $subject . '<br/><br/>' 
    . $message . '<br/>'
    . '</div>';
    
    // Message lines should not exceed 70 characters (PHP rule), so wrap it.
    $sendmessage = wordwrap($template, 70);
    
    $send = mail($to, $subject, $sendmessage, $headers);
	if($send) {
        $data = array( 
            'result' => 'success',
            'message' => 'We hebben uw bericht goed ontvangen.'
        );
    } else {
        $data = array( 
            'result' => 'error',
            'message' => 'Er ging iets mis. Probeer later opnieuw!'
        );
    }
    
    echo json_encode($data);
} else {
    $data = array( 
        'result' => 'error',
        'message' => 'No post request'
    );
    
	echo json_encode($data);
}