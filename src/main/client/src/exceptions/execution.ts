export class ExecutionCantDetermineNextProcessStepException extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
  }
}
