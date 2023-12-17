window.addEventListener('DOMContentLoaded', () => {
const tiles=Array.from(document.querySelectorAll(".tile"));
const  turn=document.querySelector('.turn');
const announced=document.querySelector('#announcer');
const restart=document.querySelector('#restart');

let board =['','','','','','','','','']
let current_player='X';
let game_active=true;


const playerx='X';
const playero='O';
const tie='TIE';

const winconditions=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[2,4,6],
[0,4,8]
];
function HandleResultValid(){
    let roundWon=false;
    for(let i=0;i<=7;i++){
        const wincondition=winconditions[i];
        const a=board[wincondition[0]];
        const b=board[wincondition[1]];
        const c=board[wincondition[2]];
        if(a===''||b===''||c===''){
            continue;
        }
        if(a===b && b===c){
            roundWon=true;
            break;
        }


    }
    
    if(roundWon){
        announcer(current_player==='X'? 'X':'O');
        game_active=false;
        return;
    }
    if(!board.includes('')){
        announcer(tie);
        
    }
}
    const announcer=(type)=>{
        switch(type){
            case 'O':
                announced.innerText='Player O Won';
                break;
            case 'X':
                announced.innerText='Player X Won';
                break;
            case tie:
                announced.innerText=('Tie');
                break;
        
        }
        announced.classList.remove('hide');

    };
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard=(index)=> {
        board[index]=current_player;
    }
    const changeplayer=()=>{
        turn.classList.remove('player'+current_player);
        current_player=current_player==='X'?'O':'X';
        turn.innerText=current_player+' player turn';
        turn.classList.add('player'+current_player);


    }
    const userAction=(tile,index)=>{
        if(isValidAction(tile) && game_active){
            tile.innerText=current_player;
            // tile.classList.add('player'+current_player);
            
            updateBoard(index);
            HandleResultValid();
            changeplayer();
            
        }

    }
    const resetBoard=()=>{
         board =['','','','','','','','','']
         current_player='X';
         game_active=true;
        announced.classList.add('hide');
        if(current_player=='O'){
            changeplayer();
        }

        tiles.forEach(tile=>{
            tile.innerText=''
            tile.classList.remove('playerx')
            tile.classList.remove('playero')
        });

    }

    tiles.forEach((tile,index)=>{
        tile.addEventListener('click',()=>userAction(tile,index));
    })

    restart.addEventListener('click',resetBoard);

});



