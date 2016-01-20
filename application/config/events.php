<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Events extends CI_Controller {

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
	
	public function Get()
	{
		echo 'Events Get';
	}
	
	public function AddUser()
	{
		echo 'Events AddUser';
	}	
}
