import { GoalValidator, solve } from '../../../engine/solver'
import { Match, Player } from '.'
import { PlayerTurnAction } from './actions/PlayerTurn'

const getActions = (state: Match) => {
    const actions = []
    const players = [Player.CIRCLE, Player.CROSS]
    const cellIndexes = [...Array(9).keys()]
    for (const symbol of players) {
        for (const i of cellIndexes) {
            const action = new PlayerTurnAction({
                symbol: symbol,
                cellIndex: i,
            })
            actions.push(action)
        }
    }
    return actions
}

onmessage = (e) => {
    const symbol = e.data.symbol
    const match = JSON.parse(e.data.match)
    match.__proto__ = new Match().__proto__

    const goal: GoalValidator<Match> = (oldState, newState) => {
        return newState.winner == symbol || newState.winner == 'draw'
    }

    const actions = getActions(match)
    const response = solve(
        match,
        () => actions,
        goal,
    )
    let resultAction = response.plan?.actions[0]
    // console.log(resultAction)

    postMessage(resultAction.data)
}