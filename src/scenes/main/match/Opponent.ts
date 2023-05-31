import { Match, Player } from '.'

let aiPlayer = Player.CIRCLE
let huPlayer = Player.CROSS
let origBoard = [
    aiPlayer, null, huPlayer,
    huPlayer, null, huPlayer,
    null, aiPlayer, aiPlayer
]

let fc = 0

onmessage = (e) => {
    aiPlayer = e.data.symbol
    huPlayer = e.data.opponent
    const match = JSON.parse(e.data.match)
    match.__proto__ = (new Match() as any).__proto__

    origBoard = [...match.grid]
    console.log('Starting state:', origBoard)

    const bestSpot = minimax(origBoard, aiPlayer)

    postMessage(bestSpot.index)
}

function minimax(newBoard, player) {
    //add one to function calls
    fc++;

    //available spots
    const availSpots = emptyIndexies(newBoard)
    // console.log(availSpots)

    if (winning(newBoard, huPlayer)) {
        return { score: -10 }
    }
    else if (winning(newBoard, aiPlayer)) {
        return { score: 10 }
    }
    else if (availSpots.length === 0) {
        return { score: 0 }
    }

    // an array to collect all the objects
    const moves = []

    // loop through available spots
    for (let i = 0; i < availSpots.length; i++) {
        //create an object for each and store the index of that spot that was stored as a number in the object's index key
        let move = {};
        move.index = availSpots[i]

        // set the empty spot to the current player
        newBoard[move.index] = player;

        //if collect the score resulted from calling minimax on the opponent of the current player
        if (player == aiPlayer) {
            let result = minimax(newBoard, huPlayer);
            move.score = result.score;
        }
        else {
            let result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        //reset the spot to empty
        newBoard[move.index] = null //move.index;

        // push the object to the array
        moves.push(move);
    }

    // if it is the computer's turn loop over the moves and choose the move with the highest score
    let bestMove
    if (player === aiPlayer) {
        let bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        // else loop over the moves and choose the move with the lowest score
        let bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    // return the chosen move (object) from the array to the higher depth
    return moves[bestMove];
}

// returns the available spots on the board
function emptyIndexies(board) {
    let result = []
    for (const i in board) {
        if (board[i] === null)
            result.push(i)
    }
    // console.info(result)
    return result

    // board.filter(s => s != "O" && s != "X");
    // return board.filter(s => s != "O" && s != "X");
}

// winning combinations using the board indexies for instace the first win could be 3 xes in a row
function winning(board, player) {
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
    ) {
        return true
    } else {
        return false
    }
}