import { Action } from "./Action"

export abstract class SolvableState {

    abstract clone(): SolvableState

    public commit(action: Action<this, any>) {
        action.apply(this)
        this.onActionApplied(action)
    }

    public onActionApplied(action: Action<this, any>) { }

}