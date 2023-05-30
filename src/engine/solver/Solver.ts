import PriorityQueue from "fastpriorityqueue"
import { SolvableState } from "./SolvableState"
import { Action } from './Action'

export type GoalValidator<T extends SolvableState> = (oldState: T | null, newState: T) => boolean
export type ActionQueuer = (state: SolvableState) => Action<any, any>[]

export const SolverMessage = {
    SOLVED: 'Solution found',
    ALREADY_SOLVED: 'Solution already found',
    IMPOSSIBLE: 'Solution impossible',
}

class PlanNode {
    parent: PlanNode | null
    state: SolvableState
    action: Action<any, any> | null
    cost: number

    constructor(parent: PlanNode | null, state: SolvableState, action: Action<any, any> | null) {
        this.cost = 0
        this.parent = parent
        this.state = state.clone()
        this.action = action
    }
}

function buildGraph(
    parent: PlanNode,
    leaves: PriorityQueue,
    getActions: ActionQueuer,
    goalValidator: GoalValidator<any>,
) {
    const actions = getActions(parent.state)
    const availableActions = actions.filter(a => a.canApply(parent.state))
    // console.log(availableActions)

    availableActions.forEach(action => {
        if (goalValidator(null, parent.state)) {
            // Already satisfied, no reason to continue
            return
        }

        let nextState = parent.state.clone()
        nextState.commit(action)

        const node = new PlanNode(parent, nextState, action)
        node.cost = parent.cost + action.getCost(nextState)

        if (goalValidator(parent.state, nextState)) {
            // console.warn('Found a solution with cost', node.cost)
            leaves.add(node)
        }
        else {
            return buildGraph(node, leaves, getActions, goalValidator)
        }
    })

    return leaves
}

function getPlanFromLeaf(node: PlanNode) {
    const actions = []
    const cost = node.cost
    while (node) {
        if (node.action) actions.unshift(node.action)
        node = node.parent!
    }

    return {
        cost,
        actions,
        length: actions.length,
    }
}

export interface SolverResponse {
    message: String,
    stats: {
        startedAt: Date,
        finishedAt: Date,
        solvingTook: number,
    },
    plan: {
        cost: number,
        actions: Action<any, any>[],
        length: number
    } | null,
}

export function solve(
    state: SolvableState,
    getActions: ActionQueuer,
    goalValidator: GoalValidator<any>,
    stateComparator = (a: PlanNode, b: PlanNode) => a.cost < b.cost
): SolverResponse {
    const startedAt = new Date()
    let message = SolverMessage.ALREADY_SOLVED
    let plan = null

    if (!goalValidator(null, state)) {
        const root = new PlanNode(null, state.clone(), null)
        const leaves = new PriorityQueue(stateComparator)
        buildGraph(root, leaves, getActions, goalValidator)

        if (!leaves.isEmpty()) {
            plan = getPlanFromLeaf(leaves.poll())
            message = SolverMessage.SOLVED
        }
        else {
            message = SolverMessage.IMPOSSIBLE
        }
    }

    const finishedAt = new Date()
    const solvingTook = (finishedAt.getTime() - startedAt.getTime()) / 1000

    return {
        message,
        stats: {
            startedAt,
            finishedAt,
            solvingTook,
        },
        plan,
    }
}