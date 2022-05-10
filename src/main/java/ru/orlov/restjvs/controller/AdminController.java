package ru.orlov.restjvs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/admin")
public class AdminController {

    @GetMapping()
    public String showAllUsers() {
        return "admin/adminTestRest";
    }
}
