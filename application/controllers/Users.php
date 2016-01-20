<?php
defined('BASEPATH') OR exit('No direct script access allowed');
error_reporting(E_ALL);
ini_set( "display_errors", "on" );
class Users extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('Users_model', 'mod');
		$this->userId = 0;
		$this->sqlWhere = '';
	}

	public function index()
	{
		echo "test";
	}

	public function Add()
	{
		echo 'Users Add';
	}

	public function Set()
	{
		echo 'Users Set';
	}

	public function Get($userId=0)
	{
		if(isset($userId) && (int)$userId>0){
			$this->user_id=$userId;
		}
		echo json_encode($this->mod->getUsers());
	}
}
