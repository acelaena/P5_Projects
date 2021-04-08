function rand(min, max) {
  return Math.round(Math.random() * (max-min) + min);
}

function fontStyle(fsize = 16, color = "#000", align = LEFT, style = NORMAL, lineheight = fsize*1.2, font = null){
    fill(color);
    textSize(fsize);
    textAlign(align);
    textStyle(style);
    textLeading(lineheight);

    if (font!= null){
        textFont(font);
    }
}

function flipCoin(){
    return rand (-1, 1) > 0; 
}