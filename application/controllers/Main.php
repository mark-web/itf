<?php
defined('BASEPATH') OR exit('No direct script access allowed');

error_reporting(E_ALL);
ini_set( "display_errors", "on" );

class Main extends CI_Controller {

	public function __construct() {
		parent::__construct();
		//$this->load->model('Main_m','mod');
		//$this->load->library('response');
		//$this->setIp($this->input->post('ip'));
		//$this->load->model('service/auth_model', 'auth', true);
	}

    public $menu = array('/'=>'Home',
					  	 'users'=>'Участники',
					  	 'events'=>'События',
//					  	 'projects'=>'Проекты',
//						 'services'=>'Сервисы',
						 'contacts'=>'Контакты');

	//public $admins = array('it051289pmo','it171184poj','it070389gds','dn031276via','dn020986rvv1','it280484mav','dn160690dev1');

	private $compassname;
	private $ip;
	private $port = 13031;
	private $method = 'get';
	private $device_parameters;

	public function index()
	{

		//var_dump($this->auth->getAccessUsers($_SESSION['user_login']));
		$data['menu'] = $this->menu;
		$this->load->view('layout/header_v',$data);
		$this->load->view('layout/footer_v');
	}
/*
	public function get_data()
	{

		//error_reporting(-1);ini_set('display_errors', 'On');error_reporting(E_ALL);
		$data['method'] = $this->input->post('method');

		if (!is_logined()){
			$this->response->bad_response('Необхідно авторизуватися!',401);
		}

		if (!get_access_flag($data['method'])){
			$this->response->bad_response('Метод заборонений!',400);
		}


		if (!empty($this->ip)){

			try{

				//подключаемся к устройству
				$this->device_parameters = $this->mod->connect_device('https://'.$this->ip.'/'.$this->method,$data['method']);

				//получаем данные по устройству
				$data['result'] = $this->mod->get_data($data['method'],'https://'.$this->ip.'/'.$this->method);

				$data['device_parameters'] = $this->device_parameters;
				$this->load->view('parts/elements/device_info',$data);
				$this->load->view('parts/'.$data['method'].'_v',$data);
			}catch (Exception $e){
				$this->response->bad_response($e->getMessage().'',400);
			}
		}else{
			$this->response->bad_response('Не вкзаний ip термінала',400);
		}
	}

	public function set_parameters($url){

		if (!get_edit_flag()){
			$this->response->bad_response('Метод заборонений!',400);
		}

	    $parameters = $this->input->post('parameters');

		try{
			
			$this->mod->set_parameters('https://'.$this->ip.'/'.$url,$parameters);
		
		}catch(Exception $e){
			$this->response->bad_response($e->getMessage(),400);
		}
	}

	public function send_action(){

		if (!get_edit_flag()){
			$this->response->bad_response('Метод заборонений!',400);
		}

		$data['url'] = $this->input->post('url');
		$variable = $this->input->post('variable');
		$additional_param = $this->input->post('additional_param');
		try{
			
			$response = $this->mod->send_action('https://'.$this->ip,$data['url'],$variable,$additional_param);
				

			if($variable == 'traceMaxLen' and is_numeric($response)){
				$this->setTraceMaxLen();
			}elseif($variable == 'traceMaxReportLen' and is_numeric($response)){
				$this->setTraceMaxReportLen();
			}
		}catch(Exception $e){
			$this->response->bad_response($e->getMessage(),400);
		}
	}

	public function saveTrace($ip){

		if (!is_logined()){
			$this->response->bad_response('Необхідно авторизуватися!',401);
		}

		if (!get_edit_flag()){
			$this->response->bad_response('Метод заборонений!',400);
		}

		try{
			
			$result = $this->mod->saveTrace('https://'.$ip.'/'.$this->method);
			
		}catch (Exception $e){
			$result = $e->getMessage();
		}

		header( "Content-Type: text/plain" );
		header( "Content-Disposition: attachment;filename=trace-".date('Y-m-d').".txt");
		header( "Cache-Control: max-age=0" );
		echo $result;
	}

	public function set_device(){
		if (!is_logined()){
			$this->response->bad_response('Необхідно авторизуватися!',401);
		}

		$this->mod->set_device($this->input->post('device_ip'));
	}

	public function setIp($ip)
	{
		$this->ip = $ip;
	}

	public function setCompassname($compassname)
	{
		$this->compassname = $compassname;
	}

	public function setTraceMaxLen($TraceMaxLen)
	{
		if (!is_logined()){
			$this->response->bad_response('Необхідно авторизуватися!',401);
		}

		$this->traceMaxLen = $TraceMaxLen;
	}

	public function setTraceMaxReportLen($TraceMaxReportLen)
	{
		if (!is_logined()){
			$this->response->bad_response('Необхідно авторизуватися!',401);
		}

		$this->traceMaxReportLen = $TraceMaxReportLen;
	}

	public function get_page_access()
	{

		if (!is_admin()){
			$this->response->bad_response('Доступ дозволено лише для адміністратора!',401);
		}
		$this->load->model('service/auth_model','auth');
		try {
			$data['users'] = $this->auth->getAccessUsers();
			$data['menu'] = $this->menu;
			$this->load->view('layout/admin_v',$data);
		} catch (Exception $e) {
			$this->response->bad_response($e->getMessage(), 400);
		}
	}

	public function add_user()
	{
		if (!is_admin()){
			$this->response->bad_response('Доступ дозволено лише для адміністратора!',401);
		}
		$this->load->model('service/auth_model','auth');
		$user =  str_replace("'",'',htmlspecialchars($this->input->post('user')));
		$add_reason = str_replace("'",'',htmlspecialchars($this->input->post('add_reason')));
		$is_admin = (int)$this->input->post('is_admin');

		try{

			$res = $this->auth->get_auth_user_info($user);
			if(empty($res)){
				$this->response->bad_response('Такий LDAP відсутній:(',400);
			}

			$res = $this->auth->getAccessUsers($user);

			if(!empty($res)){
				$this->response->bad_response('Користувач вже має доступ!',400);
			}

			$this->auth->addAccessUsers($user,$add_reason,$is_admin,$this->menu);
			$this->response->good_response('Користувач добавлений:)');
		}catch(Exception $e){
			$this->response->bad_response($e->getMessage(),400);
		}

	}

	public function edit_user()
	{
		if (!is_admin()){
			$this->response->bad_response('Доступ дозволено лише для адміністратора!',401);
		}

		$this->load->model('service/auth_model','auth');
		$ldap = htmlspecialchars($this->input->post('ldap'));
		$checked = htmlspecialchars($this->input->post('checked'));
		$access = htmlspecialchars($this->input->post('access'));

		try{
			$this->auth->edit_user($ldap,$checked,$access);
		}catch(Exception $e){
			$this->response->bad_response($e->getMessage(),400);
		}
	}

	public function get_GroupCommand()
	{
		$this->load->view('parts/groupCommands_v');
	}

	public function getDeviceIPs()
	{
		$this->load->model('service/device_m','device');
		$deviceList = $this->input->post('deviceList');
		try {
			$this->response->good_response_json($this->device->getDeviceIPs($deviceList));
		} catch (Exception $e) {
			$this->response->bad_response($e->getMessage(), 400);
		}
	}

	public function get_term_ip()
	{
		$this->load->model('service/device_m','device');
		$deviceList = $this->input->post('compassname');
		try {
			$this->response->good_response($this->device->get_term_ip($deviceList));
		} catch (Exception $e) {
			$this->response->bad_response($e->getMessage(), 400);
		}
	}

	public function sendGroupRequest()
	{
		if (!is_admin()){
			$this->response->bad_response('Доступ дозволено лише для адміністратора!',401);
		}

  	    $request = $this->input->post();

		$postData = '';
		foreach($request['params']['groupName'] as $key => $val){
			if (!empty($val)){
				$postData .= trim($val) . '=' . trim($request['params']['groupValue'][$key]) . '&';
			}
		}

		$postData = substr($postData,0,strlen($postData)-1);

		try{
			$res = $this->mod->set_parameters('https://'.$request['ip'].'/'.$request['action'],$postData,$request['timeout']);
			$response['https'] = 'ok';
			$response['response_https'] = $res;
		}catch(Exception $e){
			$response['https'] = 'error';
			$response['response_https'] = $e->getMessage();;
		}

		try{
			$res = $this->mod->set_parameters('http://'.$request['ip'].'/'.$request['action'],$postData,$request['timeout']);
			$response['http'] = 'ok';
			$response['response_http'] = $res;
		}catch(Exception $e){
			$response['http'] = 'error';
			$response['response_http'] = $e->getMessage();;
		}

		//$response['https'] = 'ok';
		//$response['http'] = 'ok';
		$this->response->good_response_json($response);

	}

	public function test(){

	}

	public function getFileContent(){
		echo file_get_contents($_FILES['actionValueFile']['tmp_name']);
	}

*/


}
