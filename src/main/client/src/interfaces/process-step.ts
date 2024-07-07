export interface ProcessStep {
  id: string;
  name: string;
  description: string;
}

export interface ProcessStepToAdd {
  name: string;
  processId: string;
}
