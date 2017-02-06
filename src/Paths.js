
  function Paths(){
  const red_red=[[6,5]];

  var pathX = 6, pathY =4,i=1;
  for(let j=0;j<4;j++)
  {
      red_red[i++] = [pathX,pathY--]  
  }
  for(let j= 0;j<2;j++)
  {
      red_red[i++] = [pathX++,pathY];
  }
  for(let j= 0;j<6;j++)
  {
      red_red[i++] = [pathX,pathY++];
  }
  //Path for yellow section of red player
  const red_yellow = red_red.map(function(value){
    return [14-value[0],14-value[1]];
  });
  //Path for blue section of red player
  const red_blue = red_red.map(function(value){
    return [14-value[1],value[0]];
  });
  //Path for green section of red player
  const red_green = red_red.map(function(value){
    return [value[1],14-value[0]];
  });

  const red_temp = red_red.concat(red_blue).concat(red_yellow).concat(red_green);
  const red_shift=[];
  //rotate to few to the end
  for(let i=0;i<7;i++)
    red_shift[i] = red_temp.shift();
  //remove one cell before start point
  red_temp.shift();
  const red = red_temp.concat(red_shift);
  //Add final path to home
  const size = red.length-1;
  for(let i=size + 1;i<size + 7;i++)
    red[i] = [red[i-1][0],red[i-1][1]+1];
  //path for yellow player
  const yellow = red.map(function(value){
    return [14-value[0],14-value[1]];
  });
  //Path for blue player
  const blue = red.map(function(value){
    return [14-value[1],value[0]];
  });
  //Path for green player
  const green = red.map(function(value){
    return [value[1],14-value[0]];
  });
  return [red,blue,green,yellow];
}

module.exports = Paths;



  
