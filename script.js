document.addEventListener('DOMContentLoaded', sizer)
function sizer(){
  if(window.innerWidth < 1366 || window.innerHeight < 675){
    let body = document.getElementsByTagName('body')
    body[0].innerHTML = 'WIDTH>=1366, HEIGHT>= 675 ONLY...'
  }
}

document.addEventListener('DOMContentLoaded', controls)
function controls(){
  let controls_link = document.getElementById('controls')
  let controls_info_string = "p - up"+'          '+"l - left"+'          '+"; - down"+'          '+"'- right"+'          '+"SPACE - START"
  controls_link.onclick = function(){
    alert(controls_info_string)
  }
  let restart_link = document.getElementById('restart')
  restart_link.onclick = function(){
    document.location.reload()
  }
}
//separate string
document.addEventListener('DOMContentLoaded', streamline)
function streamline(){
  let rowCollection = document.querySelectorAll('#game_monitor .gamerow')
  let rowArray = Array.from(rowCollection)
  let rowPos = 0
  rowArray.forEach(function(current, index, array){
    let currentBrickCollection = current.querySelectorAll('.brick')
    let currentBrickArray = Array.from(currentBrickCollection)
    let brickPos = 0
    currentBrickArray.forEach(function(current, index, array){
      current.setAttribute('id', '_'+rowPos+'_'+brickPos)
      brickPos++
    })
    rowPos++
  })
}
//separate string
document.addEventListener('DOMContentLoaded', game)
 function game(){
   let gameOver = 0
   let startInterval
   let started = false
   let global_counter = 0
   let global_ids = []
   let score = 0
   document.getElementById('score').innerHTML = score
   function refreshScore(multiplexer){
     score += 16*multiplexer
     document.getElementById('score').innerHTML = score
   }

  let axis = [1, 7]
  let cur_coords = []
  let is_there_a_figure = false
  let cur_figure_name = ''
  let cur_figure_position = 0
  let check_statement = [true,true,true,true]
  let stop_signal = false


  let figures = ['triangle','pipe','reversed_pipe','horse','reversed_horse','block','line',]

                function randomInteger(min, max) {
                  var rand = min + Math.random() * (max + 1 - min);
                  rand = Math.floor(rand);
                  return rand;
                }
  function getElement(a,b){
    return document.getElementById('_'+a+'_'+b)
  }

  function makeFigure(name){
    if(is_there_a_figure == false){
      axis = [1, 7]

      if(name == 'triangle'){
        let cht0 = document.getElementById('_'+axis[0]+'_'+axis[1]).getAttribute('class')
        let cht1 = document.getElementById('_'+axis[0]+'_'+(axis[1]-1)).getAttribute('class')
        let cht2 = document.getElementById('_'+axis[0]+'_'+(axis[1]+1)).getAttribute('class')
        let cht3 = document.getElementById('_'+(axis[0]-1)+'_'+axis[1]).getAttribute('class')
        if(cht0 == 'brick active' || cht1 == 'brick active' || cht2 == 'brick active' || cht3 == 'brick active'){alert('Game over');document.location.reload()}

        var body = [    [ axis[0],axis[1] ], [  axis[0],axis[1]-1 ], [  axis[0],axis[1]+1 ], [  axis[0]-1,axis[1]] ]
        var name = 'triangle'
      }
      if(name == 'pipe'){
        let chp0 = document.getElementById('_'+axis[0]+'_'+axis[1]).getAttribute('class')
        let chp1 = document.getElementById('_'+axis[0]+'_'+(axis[1]+1)).getAttribute('class')
        let chp2 = document.getElementById('_'+(axis[0]-1)+'_'+axis[1]).getAttribute('class')
        let chp3 = document.getElementById('_'+(axis[0]-1)+'_'+(axis[1]-1)).getAttribute('class')
        if(chp0 == 'brick active' || chp1 == 'brick active' || chp2 == 'brick active' || chp3 == 'brick active'){alert('Game over');document.location.reload()}

        var body = [    [ axis[0],axis[1] ], [  axis[0],axis[1]+1 ], [  axis[0]-1,axis[1] ], [  axis[0]-1,axis[1]-1] ]
        var name = 'pipe'
      }
      if(name == 'reversed_pipe'){
        let chrp0 = document.getElementById('_'+axis[0]+'_'+axis[1]).getAttribute('class')
        let chrp1 = document.getElementById('_'+axis[0]+'_'+(axis[1]-1)).getAttribute('class')
        let chrp2 = document.getElementById('_'+(axis[0]-1)+'_'+axis[1]).getAttribute('class')
        let chrp3 = document.getElementById('_'+(axis[0]-1)+'_'+(axis[1]+1)).getAttribute('class')
        if(chrp0 == 'brick active' || chrp1 == 'brick active' || chrp2 == 'brick active' || chrp3 == 'brick active'){alert('Game over');document.location.reload()}

        var body = [    [ axis[0],axis[1] ], [  axis[0],axis[1]-1 ], [  axis[0]-1,axis[1] ], [  axis[0]-1,axis[1]+1] ]
        var name = 'reversed_pipe'
      }
      if(name == 'horse'){
        let chh0 = document.getElementById('_'+axis[0]+'_'+axis[1]).getAttribute('class')
        let chh1 = document.getElementById('_'+(axis[0]+1)+'_'+axis[1]).getAttribute('class')
        let chh2 = document.getElementById('_'+(axis[0]-1)+'_'+axis[1]).getAttribute('class')
        let chh3 = document.getElementById('_'+(axis[0]-1)+'_'+(axis[1]+1)).getAttribute('class')
        if(chh0 == 'brick active' || chh1 == 'brick active' || chh2 == 'brick active' || chh3 == 'brick active'){alert('Game over');document.location.reload()}

        var body = [    [ axis[0],axis[1] ], [  axis[0]+1,axis[1] ], [  axis[0]-1,axis[1] ], [  axis[0]-1,axis[1]+1] ]
        var name = 'horse'
      }
      if(name == 'reversed_horse'){
        let chrh0 = document.getElementById('_'+axis[0]+'_'+axis[1]).getAttribute('class')
        let chrh1 = document.getElementById('_'+(axis[0]+1)+'_'+axis[1]).getAttribute('class')
        let chrh2 = document.getElementById('_'+(axis[0]-1)+'_'+axis[1]).getAttribute('class')
        let chrh3 = document.getElementById('_'+(axis[0]-1)+'_'+(axis[1]-1)).getAttribute('class')
        if(chrh0 == 'brick active' || chrh1 == 'brick active' || chrh2 == 'brick active' || chrh3 == 'brick active'){alert('Game over');document.location.reload()}

        var body = [    [ axis[0],axis[1] ], [  axis[0]+1,axis[1] ], [  axis[0]-1,axis[1] ], [  axis[0]-1,axis[1]-1] ]
        var name = 'reversed_horse'
      }
      if(name == 'block'){
        let chb0 = document.getElementById('_'+axis[0]+'_'+axis[1]).getAttribute('class')
        let chb1 = document.getElementById('_'+axis[0]+'_'+(axis[1]+1)).getAttribute('class')
        let chb2 = document.getElementById('_'+(axis[0]-1)+'_'+(axis[1]+1)).getAttribute('class')
        let chb3 = document.getElementById('_'+(axis[0]-1)+'_'+axis[1]).getAttribute('class')
        if(chb0 == 'brick active' || chb1 == 'brick active' || chb2 == 'brick active' || chb3 == 'brick active'){alert('Game over');document.location.reload()}

        var body = [    [ axis[0],axis[1] ], [  axis[0],axis[1]+1 ], [  axis[0]-1,axis[1]+1 ], [  axis[0]-1,axis[1]] ]
        var name = 'block'
      }
      if(name == 'line'){
        let chl0 = document.getElementById('_'+axis[0]+'_'+axis[1]).getAttribute('class')
        let chl1 = document.getElementById('_'+(axis[0]-1)+'_'+axis[1]).getAttribute('class')
        let chl2 = document.getElementById('_'+(axis[0]+1)+'_'+axis[1]).getAttribute('class')
        let chl3 = document.getElementById('_'+(axis[0]+2)+'_'+axis[1]).getAttribute('class')
        if(chl0 == 'brick active' || chl1 == 'brick active' || chl2 == 'brick active' || chl3 == 'brick active'){alert('Game over');document.location.reload()}

        var body = [    [ axis[0],axis[1] ], [  axis[0]-1,axis[1] ], [  axis[0]+1,axis[1] ], [  axis[0]+2,axis[1]] ]
        var name = 'line'
      }
    cur_coords = body
    cur_figure_name = name
    is_there_a_figure = true
    cur_figure_position = 0
    startCoordsToCheck = body
    }
  }
  function makeRandomFigure(){
    let x = randomInteger(0, 500)
    if(x >= 0 && x<= 70){makeFigure('triangle')}
    else if(x >= 71 && x<= 141){makeFigure('pipe')}
    else if(x >= 142 && x<= 212){makeFigure('reversed_pipe')}
    else if(x >= 213 && x<= 284){makeFigure('horse')}
    else if(x >= 285 && x<= 356){makeFigure('reversed_horse')}
    else if(x >= 357 && x<= 431){makeFigure('block')}
    else if(x >= 432 && x<= 500){makeFigure('line')}
  }
  function colorBlock(row, col){
    document.getElementById('_'+row+'_'+col).setAttribute('class', 'brick active')
  }
  function uncolorBlock(row, col){
    document.getElementById('_'+row+'_'+col).setAttribute('class', 'brick')
  }
  function placeFigure(){
    cur_coords.forEach(function(current, index, array){
      colorBlock(current[0],current[1])
    })
  }
  function unplaceFigure(){
    cur_coords.forEach(function(current, index, array){
      uncolorBlock(current[0],current[1])
    })
  }
  function switchFigurePosition(){
    if(cur_figure_name == 'triangle'){
      unplaceFigure()
      if(cur_figure_position == 0){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0]+1,axis[1] ], [  axis[0]-1,axis[1] ], [  axis[0],axis[1]+1]     ]
        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            else if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          //unplaceFigure()
          cur_coords = temp_coords_to_check
          cur_figure_position = 1
          //placeFigure()
        }
      }
      else if(cur_figure_position == 1){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0],axis[1]+1 ], [  axis[0],axis[1]-1 ], [  axis[0]+1,axis[1]]     ]
        console.log(temp_coords_to_check)
        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            else if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          unplaceFigure()
          cur_coords = temp_coords_to_check
          cur_figure_position = 2
          placeFigure()
        }
      }
      else if(cur_figure_position == 2){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0]+1,axis[1] ], [  axis[0]-1,axis[1] ], [  axis[0],axis[1]-1]     ]
        console.log(temp_coords_to_check)
        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            else if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          unplaceFigure()
          cur_coords = temp_coords_to_check
          cur_figure_position = 3
          placeFigure()
        }
      }
      else if(cur_figure_position == 3){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0],axis[1]-1 ], [  axis[0],axis[1]+1 ], [  axis[0]-1,axis[1]]     ]
        console.log(temp_coords_to_check)
        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            else if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          unplaceFigure()
          cur_coords = temp_coords_to_check
          cur_figure_position = 0
          placeFigure()
        }
      }
        placeFigure()
      }
    else if(cur_figure_name == 'reversed_pipe'){
      unplaceFigure()
      if(cur_figure_position == 0){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0]-1,axis[1] ], [  axis[0],axis[1]+1 ], [  axis[0]+1,axis[1]+1]     ]
        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            else if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          cur_coords = temp_coords_to_check
          cur_figure_position = 1
        }
      }
      else if(cur_figure_position == 1){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0],axis[1]-1 ], [  axis[0]-1,axis[1] ], [  axis[0]-1,axis[1]+1]     ]
        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            else if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          cur_coords = temp_coords_to_check
          cur_figure_position = 0
        }
      }
      placeFigure()
    }
    else if(cur_figure_name == 'pipe'){
      unplaceFigure()
      if(cur_figure_position == 0){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0]+1,axis[1] ], [  axis[0],axis[1]+1 ], [  axis[0]-1,axis[1]+1]     ]
        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            else if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          cur_coords = temp_coords_to_check
          cur_figure_position = 1
        }
      }
      else if(cur_figure_position == 1){
          var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0],axis[1]+1 ], [  axis[0]-1,axis[1] ], [  axis[0]-1,axis[1]-1]     ]
          temp_coords_to_check.forEach(function(current, index, array){
              if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
                check_statement[index] = false
              }
              else if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
                check_statement[index] = false
              }
              else{check_statement[index] = true}
          })
          if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
            cur_coords = temp_coords_to_check
            cur_figure_position = 0
          }
        }
      placeFigure()
    }
    else if(cur_figure_name == 'horse'){
      unplaceFigure()
      if(cur_figure_position == 0){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0],axis[1]-1 ], [  axis[0],axis[1]+1 ], [  axis[0]+1,axis[1]+1]     ]

        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            else if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          cur_coords = temp_coords_to_check
          cur_figure_position = 1
        }
      }
      else if(cur_figure_position == 1){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0]-1,axis[1] ], [  axis[0]+1,axis[1] ], [  axis[0]+1,axis[1]-1]     ]
        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            else if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          cur_coords = temp_coords_to_check
          cur_figure_position = 2
        }
      }
      else if(cur_figure_position == 2){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0],axis[1]+1 ], [  axis[0],axis[1]-1 ], [  axis[0]-1,axis[1]-1]     ]
        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            else if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          cur_coords = temp_coords_to_check
          cur_figure_position = 3
        }
      }
      else if(cur_figure_position == 3){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0]+1,axis[1] ], [  axis[0]-1,axis[1] ], [  axis[0]-1,axis[1]+1]     ]
        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            else if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          cur_coords = temp_coords_to_check
          cur_figure_position = 0
        }
      }
      placeFigure()
    }
    else if(cur_figure_name == 'reversed_horse'){
      unplaceFigure()
      if(cur_figure_position == 0){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0],axis[1]-1 ], [  axis[0],axis[1]+1 ], [  axis[0]-1,axis[1]+1]     ]
        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            else if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          cur_coords = temp_coords_to_check
          cur_figure_position = 1
        }
      }
      else if(cur_figure_position == 1){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0]-1,axis[1] ], [  axis[0]+1,axis[1] ], [  axis[0]+1,axis[1]+1]     ]
        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            else if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          cur_coords = temp_coords_to_check
          cur_figure_position = 2
        }
      }
      else if(cur_figure_position == 2){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0],axis[1]+1 ], [  axis[0],axis[1]-1 ], [  axis[0]+1,axis[1]-1]     ]
        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          cur_coords = temp_coords_to_check
          cur_figure_position = 3
        }
      }
      else if(cur_figure_position == 3){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0]+1,axis[1] ], [  axis[0]-1,axis[1] ], [  axis[0]-1,axis[1]-1]     ]
        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          cur_coords = temp_coords_to_check
          cur_figure_position = 0
        }
      }
      placeFigure()
    }
    else if(cur_figure_name == 'block'){
      return
    }
    else if(cur_figure_name == 'line'){
      unplaceFigure()
      if(cur_figure_position == 0){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0],axis[1]+1 ], [  axis[0],axis[1]-1 ], [  axis[0],axis[1]-2]     ]
        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            else if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          cur_coords = temp_coords_to_check
          cur_figure_position = 1
        }
      }
      else if(cur_figure_position == 1){
        var temp_coords_to_check = [    [ axis[0],axis[1] ], [  axis[0]-1,axis[1] ], [  axis[0]+1,axis[1] ], [  axis[0]+2,axis[1]]     ]
        temp_coords_to_check.forEach(function(current, index, array){
            if(current[0] < 0 || current[0] > 19 || current[1] < 0 || current[1] > 15){
              check_statement[index] = false
            }
            else if( getElement(current[0], current[1]).getAttribute('class') == 'brick active' ){
              check_statement[index] = false
            }
            else{check_statement[index] = true}
        })
        if(check_statement[0] == true && check_statement[1] == true && check_statement[2] == true && check_statement[3] == true){
          cur_coords = temp_coords_to_check
          cur_figure_position = 0
        }
      }
      placeFigure()
    }
  }
  function moveFigure(){
      unplaceFigure()
      cur_coords.forEach(function(current, index, array){
        cur_coords[index][0]++
      })
      axis[0]++
      placeFigure()
  }
  function flow(){
    if(checkBottomCollision()){is_there_a_figure = false}
    else if(checkIfDownThereAnActiveBlock()){is_there_a_figure = false}
    else if(!checkBottomCollision()){moveFigure()}
  }
  function checkIfDownThereAnActiveBlock(){
    if(cur_figure_name == 'triangle'){
      if(cur_figure_position == 0){
        var x1 = document.getElementById('_'+(cur_coords[0][0]+1)+'_'+cur_coords[0][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[1][0]+1)+'_'+cur_coords[1][1]).getAttribute('class')
        var x3 = document.getElementById('_'+(cur_coords[2][0]+1)+'_'+cur_coords[2][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active'){is_there_a_figure = false;x1='';x2='';x3='';checkForFulfill();return true}
      }
      else if(cur_figure_position == 1){
        var x1 = document.getElementById('_'+(cur_coords[1][0]+1)+'_'+cur_coords[1][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[3][0]+1)+'_'+cur_coords[3][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active'){is_there_a_figure = false;x1='';x2='';x3='';checkForFulfill();return true}
      }
      else if(cur_figure_position == 2){
        var x1 = document.getElementById('_'+(cur_coords[1][0]+1)+'_'+cur_coords[1][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[2][0]+1)+'_'+cur_coords[2][1]).getAttribute('class')
        var x3 = document.getElementById('_'+(cur_coords[3][0]+1)+'_'+cur_coords[3][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active'){is_there_a_figure = false;x1='';x2='';x3='';checkForFulfill();return true}
      }
      else if(cur_figure_position == 3){
        var x1 = document.getElementById('_'+(cur_coords[1][0]+1)+'_'+cur_coords[1][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[3][0]+1)+'_'+cur_coords[3][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active'){is_there_a_figure = false;x1='';x2='';x3='';checkForFulfill();return true}
      }
    }
    else if(cur_figure_name == 'pipe'){
      if(cur_figure_position == 0){
        var x1 = document.getElementById('_'+(cur_coords[0][0]+1)+'_'+cur_coords[0][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[1][0]+1)+'_'+cur_coords[1][1]).getAttribute('class')
        var x3 = document.getElementById('_'+(cur_coords[3][0]+1)+'_'+cur_coords[3][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active'){is_there_a_figure = false;x1='';x2='';x3='';checkForFulfill();return true}
      }
      else if(cur_figure_position == 1){
        var x1 = document.getElementById('_'+(cur_coords[1][0]+1)+'_'+cur_coords[1][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[2][0]+1)+'_'+cur_coords[2][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active'){is_there_a_figure = false;x1='';x2='';x3='';checkForFulfill();return true}
      }
    }
    else if(cur_figure_name == 'reversed_pipe'){
      if(cur_figure_position == 0){
        var x1 = document.getElementById('_'+(cur_coords[0][0]+1)+'_'+cur_coords[0][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[1][0]+1)+'_'+cur_coords[1][1]).getAttribute('class')
      var x3 = document.getElementById('_'+(cur_coords[3][0]+1)+'_'+cur_coords[3][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active'){is_there_a_figure = false;x1='';x2='';x3='';checkForFulfill();return true}
      }
      else if(cur_figure_position == 1){
        var x1 = document.getElementById('_'+(cur_coords[0][0]+1)+'_'+cur_coords[0][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[3][0]+1)+'_'+cur_coords[3][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active'){is_there_a_figure = false;x1='';x2='';x3='';checkForFulfill();return true}
      }
    }
    else if(cur_figure_name == 'horse'){
      if(cur_figure_position == 0){
        var x1 = document.getElementById('_'+(cur_coords[1][0]+1)+'_'+cur_coords[1][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[3][0]+1)+'_'+cur_coords[3][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active'){x1='';x2='';x3='';checkForFulfill();return true}
      }
      else if(cur_figure_position == 1){
        var x1 = document.getElementById('_'+(cur_coords[0][0]+1)+'_'+cur_coords[0][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[1][0]+1)+'_'+cur_coords[1][1]).getAttribute('class')
        var x3 = document.getElementById('_'+(cur_coords[3][0]+1)+'_'+cur_coords[3][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active'){x1='';x2='';x3='';checkForFulfill();return true}
      }
      else if(cur_figure_position == 2){
        var x1 = document.getElementById('_'+(cur_coords[2][0]+1)+'_'+cur_coords[2][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[3][0]+1)+'_'+cur_coords[3][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active'){x1='';x2='';x3='';checkForFulfill();return true}
      }
      else if(cur_figure_position == 3){
        var x1 = document.getElementById('_'+(cur_coords[0][0]+1)+'_'+cur_coords[0][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[1][0]+1)+'_'+cur_coords[1][1]).getAttribute('class')
        var x3 = document.getElementById('_'+(cur_coords[2][0]+1)+'_'+cur_coords[2][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active'){x1='';x2='';x3='';checkForFulfill();return true}
      }
    }
    else if(cur_figure_name == 'reversed_horse'){
      if(cur_figure_position == 0){
        var x1 = document.getElementById('_'+(cur_coords[1][0]+1)+'_'+cur_coords[1][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[3][0]+1)+'_'+cur_coords[3][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active'){is_there_a_figure = false;x1='';x2='';x3='';checkForFulfill();return true}
      }
      else if(cur_figure_position == 1){
        var x1 = document.getElementById('_'+(cur_coords[0][0]+1)+'_'+cur_coords[0][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[1][0]+1)+'_'+cur_coords[1][1]).getAttribute('class')
        var x3 = document.getElementById('_'+(cur_coords[2][0]+1)+'_'+cur_coords[2][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active'){is_there_a_figure = false;x1='';x2='';x3='';checkForFulfill();return true}
      }
      else if(cur_figure_position == 2){
        var x1 = document.getElementById('_'+(cur_coords[2][0]+1)+'_'+cur_coords[2][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[3][0]+1)+'_'+cur_coords[3][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active'){is_there_a_figure = false;x1='';x2='';x3='';checkForFulfill();return true}
      }
      else if(cur_figure_position == 3){
        var x1 = document.getElementById('_'+(cur_coords[0][0]+1)+'_'+cur_coords[0][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[1][0]+1)+'_'+cur_coords[1][1]).getAttribute('class')
        var x3 = document.getElementById('_'+(cur_coords[3][0]+1)+'_'+cur_coords[3][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active'){is_there_a_figure = false;x1='';x2='';x3='';checkForFulfill();return true}
      }
    }
    else if(cur_figure_name == 'block'){
      if(cur_figure_position == 0){
        var x1 = document.getElementById('_'+(cur_coords[0][0]+1)+'_'+cur_coords[0][1]).getAttribute('class')
        var x2 = document.getElementById('_'+(cur_coords[1][0]+1)+'_'+cur_coords[1][1]).getAttribute('class')
        if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active'){is_there_a_figure = false;x1='';x2='';x3='';checkForFulfill();return true}
      }
    }
    else if(cur_figure_name == 'line'){
      if(cur_figure_position == 0){
        var x1 = document.getElementById('_'+(cur_coords[3][0]+1)+'_'+cur_coords[3][1]).getAttribute('class')
      if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active'){is_there_a_figure = false;x1='';x2='';x3='';checkForFulfill();return true}
      }
      else if(cur_figure_position == 1){
      var x0 = document.getElementById('_'+(cur_coords[0][0]+1)+'_'+cur_coords[0][1]).getAttribute('class')
      var x1 = document.getElementById('_'+(cur_coords[1][0]+1)+'_'+cur_coords[1][1]).getAttribute('class')
      var x2 = document.getElementById('_'+(cur_coords[2][0]+1)+'_'+cur_coords[2][1]).getAttribute('class')
      var x3 = document.getElementById('_'+(cur_coords[3][0]+1)+'_'+cur_coords[3][1]).getAttribute('class')
      if(x1 == 'brick active' || x2 == 'brick active' || x3 == 'brick active' || x0 == 'brick active'){is_there_a_figure = false;x0='';x1='';x2='';x3='';checkForFulfill();return true}
    }
  }
}
  function checkBottomCollision(){
    let arrayToCheck = []
    cur_coords.forEach(function(current, index, array){
      arrayToCheck.push(current[0])
    })
    let res = Math.max.apply(null, arrayToCheck)
    if(res == 19)
    {checkForFulfill()
      return true}
  }
  function checkLeftSideCollision(){
    //checking bot collision
    let arrayToCheck = []
    cur_coords.forEach(function(current, index, array){
      arrayToCheck.push(current[1])
    })
    let res = Math.min.apply(null, arrayToCheck)
    //checking left side collision
    if(cur_figure_name == 'triangle'){
      if(cur_figure_position == 0){
        if(getElement(cur_coords[1][0],cur_coords[1][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      else if(cur_figure_position == 1){
        if(getElement(cur_coords[0][0],cur_coords[0][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[2][0],cur_coords[2][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      else if(cur_figure_position == 2){
        if(getElement(cur_coords[2][0],cur_coords[2][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      else if(cur_figure_position == 3){
        if(getElement(cur_coords[1][0],cur_coords[1][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[2][0],cur_coords[2][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
    }//triagle
    else if(cur_figure_name == 'pipe'){
      if(cur_figure_position == 0){
        if(getElement(cur_coords[0][0],cur_coords[0][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 1){
        if(getElement(cur_coords[0][0],cur_coords[0][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
    }//pipe
    else if(cur_figure_name == 'reversed_pipe'){
      if(cur_figure_position == 0){
        if(getElement(cur_coords[1][0],cur_coords[1][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[2][0],cur_coords[2][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 1){
        if(getElement(cur_coords[0][0],cur_coords[0][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
    }//reversed_pipe
    else if(cur_figure_name == 'horse'){
      if(cur_figure_position == 0){
        if(getElement(cur_coords[0][0],cur_coords[0][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[2][0],cur_coords[2][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 1){
        if(getElement(cur_coords[1][0],cur_coords[1][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 2){
        if(getElement(cur_coords[0][0],cur_coords[0][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 3){
        if(getElement(cur_coords[2][0],cur_coords[2][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
    }//horse
    else if(cur_figure_name == 'reversed_horse'){
      if(cur_figure_position == 0){
        if(getElement(cur_coords[3][0],cur_coords[3][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[0][0],cur_coords[0][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 1){
        if(getElement(cur_coords[1][0],cur_coords[1][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 2){
        if(getElement(cur_coords[0][0],cur_coords[0][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[2][0],cur_coords[2][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 3){
        if(getElement(cur_coords[2][0],cur_coords[2][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
    }//reversed_horse
    else if(cur_figure_name == 'block'){
      if(cur_figure_position == 0){
        if(getElement(cur_coords[3][0],cur_coords[3][1]-1).getAttribute('class')=='brick active'||
        getElement(cur_coords[0][0],cur_coords[0][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
    }//block
    if(cur_figure_name == 'line'){
      if(cur_figure_position == 0){
        if(getElement(cur_coords[0][0],cur_coords[0][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[2][0],cur_coords[2][1]-1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 1){
        if(getElement(cur_coords[3][0],cur_coords[3][1]-1).getAttribute('class')=='brick active'
        )
        {return true}
      }
    }//line
    if(res == 0){return true}
  }//function
  function checkRightSideCollision(){
    let arrayToCheck = []
    cur_coords.forEach(function(current, index, array){
      arrayToCheck.push(current[1])
    })
    let res = Math.max.apply(null, arrayToCheck)
    //checking left side collision
    if(cur_figure_name == 'triangle'){
      if(cur_figure_position == 0){
        if(getElement(cur_coords[2][0],cur_coords[2][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      else if(cur_figure_position == 1){
        if(getElement(cur_coords[3][0],cur_coords[3][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[2][0],cur_coords[2][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      else if(cur_figure_position == 2){
        if(getElement(cur_coords[1][0],cur_coords[1][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      else if(cur_figure_position == 3){
        if(getElement(cur_coords[0][0],cur_coords[0][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[2][0],cur_coords[2][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
    }//triagle
    if(cur_figure_name == 'pipe'){
      if(cur_figure_position == 0){
        if(getElement(cur_coords[1][0],cur_coords[1][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[2][0],cur_coords[2][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 1){
        if(getElement(cur_coords[2][0],cur_coords[2][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
    }//pipe
    if(cur_figure_name == 'reversed_pipe'){
      if(cur_figure_position == 0){
        if(getElement(cur_coords[0][0],cur_coords[0][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 1){
        if(getElement(cur_coords[2][0],cur_coords[2][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
    }//reversed_pipe
    if(cur_figure_name == 'horse'){
      if(cur_figure_position == 0){
        if(getElement(cur_coords[0][0],cur_coords[0][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 1){
        if(getElement(cur_coords[2][0],cur_coords[2][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 2){
        if(getElement(cur_coords[0][0],cur_coords[0][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[2][0],cur_coords[2][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 3){
        if(getElement(cur_coords[1][0],cur_coords[1][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
    }//horse
    if(cur_figure_name == 'reversed_horse'){
      if(cur_figure_position == 0){
        if(getElement(cur_coords[2][0],cur_coords[2][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[0][0],cur_coords[0][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 1){
        if(getElement(cur_coords[2][0],cur_coords[2][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 2){
        if(getElement(cur_coords[0][0],cur_coords[0][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 3){
        if(getElement(cur_coords[1][0],cur_coords[1][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
    }//reversed_horse
    if(cur_figure_name == 'block'){
      if(cur_figure_position == 0){
        if(getElement(cur_coords[1][0],cur_coords[1][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[2][0],cur_coords[2][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
    }//block
    if(cur_figure_name == 'line'){
      if(cur_figure_position == 0){
        if(getElement(cur_coords[0][0],cur_coords[0][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[1][0],cur_coords[1][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[2][0],cur_coords[2][1]+1).getAttribute('class')=='brick active'||
           getElement(cur_coords[3][0],cur_coords[3][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
      if(cur_figure_position == 1){
        if(getElement(cur_coords[1][0],cur_coords[1][1]+1).getAttribute('class')=='brick active'
        )
        {return true}
      }
    }//line
    if(res == 15){return true}
  }//function
  function findAllActiveBlocksExceptCurrentFigure(){

    let allRowsEtalon = ['_0','_1','_2','_3','_4','_5','_6','_7','_8','_9',
                   '_10','_11','_12','_13','_14','_15','_16','_17','_18','_19']

    let allRows = []
    let rowsIdToMove = []
    if(global_ids.length != 0){
      let firstLine = global_ids[0]
      allRows = allRowsEtalon
      rowsIdToMove = allRows.splice(0, allRows.indexOf(firstLine))
    }
    //alert(rowsToMove)
    //alert(global_counter)
    if(rowsIdToMove.length != 0){
      let idActive = []
      rowsIdToMove.forEach(function(item, index, array){
        let justRow = document.getElementById(item)
        let justBlocksInRow = justRow.querySelectorAll('.brick.active')
        if(justBlocksInRow.length != 0){
          //let idActive = []
          justBlocksInRow.forEach(function(ite, ind, arr){
            idActive.push(ite.getAttribute('id'))
          })
        }
      })
      if(idActive.length != 0){
        let idArrayToMove = []
        idActive.forEach(function(item, index, array){
          let tempoArrToPush = []
          let tempoArrAfterRegEx = []
          tempoArrAfterRegEx = item.match(/\d.?/g)
          tempoArrToPush[0] = parseInt(tempoArrAfterRegEx[0])
          tempoArrToPush[1] = parseInt(tempoArrAfterRegEx[1])
          idArrayToMove.push(tempoArrToPush)
        })
        idArrayToMove.forEach(function(item, index, array){
          uncolorBlock(item[0], item[1])
        })
        idArrayToMove.forEach(function(item, index, array){
          colorBlock(item[0]+global_counter, item[1])
        })
      }
    }
    ///////////////
    global_ids = []
  }
  function checkForFulfill(){
    let rows = document.querySelectorAll('.gamerow')

    rows.forEach(function(current, index, array){
      let row = current.querySelectorAll('.brick')
      let counter = 0
      row.forEach(function(cur, ind, arr){
        if(cur.getAttribute('class') == 'brick active'){counter++}
      })
      if(counter == 16){
        player2.play()
        global_counter = global_counter + 1
        global_ids.push(current.getAttribute('id'))
        let bricksFulfilled = current.querySelectorAll('.brick')
        bricksFulfilled.forEach(function(c, i, a){
          c.setAttribute('class', 'brick')
        })
      }
    })
    findAllActiveBlocksExceptCurrentFigure()
    refreshScore(global_counter)
    global_counter = 0
  }//fulfill function

  document.onkeydown = function(event){
    if(started == true){
      if(event.keyCode == 80){
        moveup()
      }
      if(event.keyCode == 76){
        moveleft()
      }
      if(event.keyCode == 186){
        movedown()
      }
      if(event.keyCode == 222){
        moveright()
      }
      if(event.keyCode == 32){
        clearInterval(startInterval);
        started = false
      }
    }
    else if(started == false){
      if(event.keyCode ==32){
        startInterval = setInterval(gameProcess, 300)
        started = true
      }
    }
    else{return}
  }

  function moveup(){
    switchFigurePosition()
  }
  function moveleft(){
    if(checkLeftSideCollision()){return}
    else{
      unplaceFigure()
      cur_coords.forEach(function(current, index, array){
        cur_coords[index][1]--
      })
      axis[1]--
      placeFigure()
    }
  }
  function moveright(){
    if(checkRightSideCollision()){return}
    else{
      unplaceFigure()
      cur_coords.forEach(function(current, index, array){
        cur_coords[index][1]++
      })
      placeFigure()
      axis[1]++
    }
  }
  function movedown(){
    for(let i = 0; i < 20; i++){
      let arrayToCheck = []
      cur_coords.forEach(function(current, index, array){
        arrayToCheck.push(current[0])
      })
      let res = Math.max.apply(null, arrayToCheck)
      if(res == 19){return}
      if(checkIfDownThereAnActiveBlock()){return}
      if(checkBottomCollision()){return}
      else(moveFigure())
    }
    // if(checkIfDownThereAnActiveBlock()){return}
    // if(checkBottomCollision()){return}
    // if(!checkBottomCollision()){moveFigure()}
  }






  function beforeStart(){
    makeRandomFigure()
    placeFigure()
  }
  function gameProcess(){
    flow()
    if(is_there_a_figure == false){makeRandomFigure();player1.play();placeFigure();}
  }
  beforeStart()


function dropSound(){
  this.sound = document.createElement('audio')
  this.source = document.createElement('source')
  this.source.setAttribute('src', './nes-00-01.wav')
  this.sound.appendChild(source)
  this.sound.setAttribute('controls', 'none')
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute('id', 'player1')
  this.sound.style.display = 'none'
  document.body.appendChild(this.sound)
  this.sound.volume = 0.15
}
dropSound()
function clearRowSound(){
  this.sound = document.createElement('audio')
  this.source = document.createElement('source')
  this.source.setAttribute('src', './nes-04-14.wav')
  this.sound.appendChild(source)
  this.sound.setAttribute('controls', 'none')
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute('id', 'player2')
  this.sound.style.display = 'none'
  document.body.appendChild(this.sound)
  this.sound.volume = 0.15
}
clearRowSound()

  let start_link = document.getElementById('start')
  start_link.onclick = function(){
    if(started){return}
    startInterval = setInterval(gameProcess, 300)
    started = true
  }

  let stop_link = document.getElementById('stopa')
  stop_link.onclick = function(){
    clearInterval(startInterval)
  }

}
