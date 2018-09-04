

//获取随机数
export function randomFrom(l, u) {
  return Math.floor(Math.random() * (u - l + 1) + l);
}

export function offsetLeft(element){
	var left = element.offsetLeft;
    var parent = element.offsetParent;
    
    while(parent!== null){
        left += parent.offsetLeft;
        parent = parent.offsetParent;
    }
    return left;
}

export function offsetTop(element){
	var top = element.offsetTop;
    var parent = element.offsetParent;
    
    while(parent!== null){
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return top;
}