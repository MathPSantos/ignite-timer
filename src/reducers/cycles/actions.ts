import { Cycle } from "./reducer";

export enum CycleActionTypes {
  CREATE_CYCLE = "CREATE_CYCLE",
  INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
  MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED",
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: CycleActionTypes.CREATE_CYCLE,
    payload: { newCycle },
  };
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: CycleActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  };
}

export function interruptCurrentCycleAction() {
  return {
    type: CycleActionTypes.INTERRUPT_CURRENT_CYCLE,
  };
}
