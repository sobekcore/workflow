package com.sobekcore.workflow.process.step.condition.state;

import com.sobekcore.workflow.process.step.condition.ConditionOption;

import java.util.List;

public class ConditionState {
    private Boolean visited;

    private ConditionOption option;

    private List<ConditionOption> options;

    public Boolean isVisited() {
        return visited;
    }

    public ConditionOption getOption() {
        return option;
    }

    public List<ConditionOption> getOptions() {
        return options;
    }
}
