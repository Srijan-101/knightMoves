import { click } from '@testing-library/user-event/dist/click';
import { useState } from 'react';
import './App.css';

const App = () => {
  let arr = [];
  for(let i = 0 ; i < 8 ; i++){
    arr[i] = []
    for(let j = 0 ; j < 8 ; j++ ){
          arr[i][j] = "";
    }
  }
  
  const [cells,setCells] = useState(arr);
  const [click,setClick] = useState(true);




  const handleClick = (num) => {
      if(click) {
        let squares = [...cells];
        let y = num[0] - 1;
        let x = num[1] - 1;
        squares[x][y] = "K";
        
        setCells(squares);
        CalculatePossibleMoves(num,squares);
        setClick(false);
      }
  }

  const Cell = ({ num }) => {
       let y = num[0] - 1;
       let x = num[1] - 1;
    return <td disabled={click} onClick={() => handleClick(num)} style={{fontSize:"25px"}}><center>{cells[x][y]}</center></td>
  }

  const Reset = () => {
     setCells(arr);
     setClick(true);
  }


 const CalculatePossibleMoves = (cell,squares) =>{
  var possibleCoordinates = [];

  var xCoordinates = ['1', '2', '3', '4', '5', '6', '7', '8'];

  var cellX = xCoordinates.indexOf(cell[0]) + 1; //The X Position
  var cellY = parseInt(cell[1]); //The Y Position
  
  var cellXpositions = [cellX + 2, cellX - 2, cellX + 1, cellX - 1].filter(function(cellPosition) {
      return (cellPosition > 0 && cellPosition < 9);
  })
  
  var cellYpositions = [cellY + 2, cellY - 2, cellY + 1, cellY - 1].filter(function(cellPosition) {
      return (cellPosition > 0 && cellPosition < 9);
  })
  

  for (var i = 0; i < cellXpositions.length; i++) {
      for (var j = 0; j < cellYpositions.length; j++) {
          if (Math.abs(cellX - cellXpositions[i]) + Math.abs(cellY - cellYpositions[j]) === 2) {
               
            console.log('This is a valid coordinate: ', [cellXpositions[i], cellYpositions[j]]);
            squares[cellXpositions[i]-1][cellYpositions[j]-1] = "p";


              if (!possibleCoordinates.includes([cellXpositions[i]-1, cellYpositions[j]-1])) {
                  possibleCoordinates.push([cellXpositions[i]-1, cellYpositions[j]-1]);
              } 
          }
      }
  }
 }


  return (
    <div className='Container'>
      <table>
        <tbody>
          {
            [1, 2, 3, 4, 5, 6, 7, 8].map((ele) => {
              return (
                <tr key={ele}>
                  <Cell num={`1${ele}`} />
                  <Cell num={`2${ele}`} />
                  <Cell num={`3${ele}`} />
                  <Cell num={`4${ele}`} />
                  <Cell num={`5${ele}`} />
                  <Cell num={`6${ele}`} />
                  <Cell num={`7${ele}`} />
                  <Cell num={`8${ele}`} />
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <br/>
      <button onClick={Reset}>Reset</button>
    </div>
  )
}

export default App;