<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users_model extends CI_Model {

  function getUsers(){

        if($this->userId > 0) {
            $this->sqlWhere = "where user_id='{$this->userId}'"   ;
        }

        $query = "select `user_id` ,`user_login` ,`user_current_level` ,`user_gender` ,`user_weight` ,`user_age` ,`user_photo_name` ,`user_role`
                  from `svoydom_itf`.`users`
                  ". $this->sqlWhere ;

        $res = $this->db->query($query);

        if($res){
            return $res->result_array();

        }else{
            throw new Exception('Помилка запиту до бази данних!');
        }
        return $result;
  }
}





