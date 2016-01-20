<?php
defined('BASEPATH') OR exit('No direct script access allowed');
error_reporting(E_ALL);
ini_set( "display_errors", "on" );
class Events extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('Events_model', 'mod');
		$this->eventId = 0;
		$this->sqlWhere = '';
	}
	
	/**
	 * Users functions
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/users
	 *	- or -
	 * 		http://example.com/index.php/users/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/users/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		echo 'Events index';
	}
	
	
	public function Add()
	{
		echo 'Events Add';
	}

	public function Set()
	{
		echo 'Events Set';
	}

	public function Get($eventId=0)
	{
		if(isset($eventId) && (int)$eventId>0){
			$this->eventId=$eventId;
		}
		echo json_encode($this->mod->getEvents());
	}
	
	public function AddUser()
	{
		echo 'Events AddUser';
	}	
}
