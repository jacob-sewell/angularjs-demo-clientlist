<?php
header('Content-type: application/json');

$return_array = ['success' => false, 'message' => 'Missing or invalid "action" parameter.'];

try {
    $in_p = $_POST;
    if (substr($_SERVER['CONTENT_TYPE'], 0, 16) == 'application/json') {
        $request_body = json_decode(@file_get_contents('php://input'), true);
        $in_p = array_merge($in_p, $request_body);
    }
    switch ($_GET['action']) {
        case 'update':
            $client_id = intval($in_p['client_id']);
            if (!$client_id) throw new RuntimeException('Invalid or missing "client_id" parameter ('.$in_p['client_id'].').');
            $clients_json = file_get_contents('clients.json');
            $clients_array = json_decode($clients_json, true);
            if (!$clients_array) throw new RuntimeException('Unable to read clients.json.');
            $client_found = false;
            foreach ($clients_array['rows'] as $index => $row) {
                if ($row['client_id'] == $client_id) {
                    $client_found = true;
                    $row = array_intersect_key($in_p, $row);
                    $clients_array['rows'][$index] = $row;
                    break;
                }
            }
            if (!$client_found) throw new RuntimeException('Client #"'.$in_p['client_id'].'" not found.');
            $clients_json = json_encode($clients_array);
            if (!$clients_json) throw new RuntimeException('Unable to encode clients.json.');
            if (false === file_put_contents('clients.json', $clients_json)) throw new RuntimeException('Unable to write clients.json.');
            $return_array['success'] = true;
            $return_array['message'] = 'Client #'.$client_id.' updated.';
        break;
    }
} catch (Throwable $e) {
    $return_array['success'] = false;
    $return_array['message'] = $e->getMessage();
    $return_array['trace'] = $e->getTraceAsString();
}
echo json_encode($return_array);
exit;
