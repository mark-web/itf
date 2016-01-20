<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Events_model extends CI_Model {

  function getEvents(){

        if($this->eventId > 0) {
            $this->sqlWhere = "where event_id='{$this->eventId}'"   ;
        }

        $query = "select `event_id` ,`event_name` ,`event_description` ,`event_address` ,`event_cost` ,`event_url` ,`event_photo` ,`event_dt_start` ,`event_dt_end` ,`main_coach_id`
                  from `svoydom_itf`.`events`
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





