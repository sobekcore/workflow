package com.sobekcore.workflow.controllers;

import com.sobekcore.workflow.process.Process;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/processes")
class ProcessesController {
    @GetMapping
    public List<Process> get() {
        List<Process> list = new ArrayList<>();
        list.add(new Process("Process 1"));
        list.add(new Process("Process 2"));

        return list;
    }
}
