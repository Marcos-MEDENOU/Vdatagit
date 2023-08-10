<?php
namespace controller;
class calendar {
    function __construct(){
        if (isset($_GET['target'])) {
            $target = $_GET['target'];
            if ($this->$target()) {
                $this->$target();
            }
        } else {
            $this->calendar();
        }
    }
    function calendar(){
        include_once 'views/pages/apps/calendar.html';
    }
}
?>