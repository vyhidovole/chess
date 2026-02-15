// let main = document.getElementById('main')
// let divs = document.getElementsByTagName('div')
// let position=[]

// const matrix=[[6,12,18,24],null,[6,10,8,14],null,[8,12,16,20],null,[0,2,10,12,18,24],null,[2,4,12,14,16,20],null,[2,6,16,22],null,[0,6,4,8,16,18,20,24],null,[2,8,18,22],null,[4,8,10,12,20,22],null,[0,6,12,14,22,24],null,[4,8,12,16],null,[10,14,16,18],null,[0,6,12,18]]
// let pic = 'ball.png'
// let pic1 = 'bishop.png'
// let pic2 = 'N.png'
// let pic3 = 'pawn.png'

// function start(){


//     let str=''
//     for(i=0;i<25;i++){
//         str+='<div id='+i+'>'+i+'</div>'
//     }
//     main.innerHTML=str
//     pic1='bishop.png'
//     divs[2].innerHTML='<img src='+pic1+'>'
//     for (i = 1; i < 5; i += 2) {
//     divs[i].innerHTML = '<img src=' + pic2 + '>'
//             }

//             for (i = 5; i < 10; i++) {
//         divs[i].innerHTML = '<img src=' + pic3 + '>'
//     }

//     for(d of divs){
//         d.onclick=f1

//     }
//     position.push(2)

//     let turn = false
//     function f1(){
//         console.log(this.id)
//         let newpos=Number(this.id)

//         if (this.firstChild.tagName == 'IMG' && (!turn)) {
//                     console.log('выбрано')
//                     this.style.backgroundColor = 'violet'
//                     turn = true
//                     position1 =newpos
//                 }
//                 if(matrix[position[0]].includes(newpos)){
//                     console.log('ok')
//                     divs[newpos].innerHTML='<img src='+pic1+'>'
//                     divs[position[0]].innerHTML=position[0]
//                     position.pop()
//                     position.push(newpos)
//                 }
//                 else if ((turn) && (matrix[position[0]].includes(newpos)) && this.firstChild.tagName != 'IMG')  {
//                             console.log('ok')
//                             this.innerHTML = '<img src=' + pic1 + '>'
//                             divs[position1].innerHTML = position
//                             divs[position1].style.backgroundColor = 'burlywood'
//                             turn = false
//                         }
//                         else if(this.id==position && turn){
//                             this.style.backgroundColor='burlywood'
//                             turn=false
//                         }
//     }
//     }

//     start()


let main = document.getElementById('main')
let divs = document.getElementsByTagName('div')
let position
let pic1 = 'bishop.png'
let pic2 = 'N.png'
let pic3 = 'pawn.png'
let color
let pic10

function start() {
    let str = ''

    for (i = 0; i < 25; i++) {
        str += '<div id=' + i + '>' + i + '</div>'
    }
    main.innerHTML = str
    divs[2].innerHTML = '<img src=' + pic1 + '>'
    for (i = 1; i < 5; i += 2) {
        divs[i].innerHTML = '<img src=' + pic2 + '>'
    }

    for (i = 5; i < 10; i++) {
        divs[i].innerHTML = '<img src=' + pic3 + '>'
    }

    for (d of divs) {
        d.onclick = f1, f2, f3

    }

}


start()


let turn = false
function f1() {
    console.log(this.id)
    // console.log(this)
    // console.log(this.firstChild.tagName)
    if (this.firstChild.tagName == 'IMG' && (!turn)) {
        console.log('выбрано')
        color = this.style.backgroundColor
        if (this.firstChild.getAttribute('src') == pic1) { pic10 = pic1 }
        if (this.firstChild.getAttribute('src') == pic2) { pic10 = pic2 }
        if (this.firstChild.getAttribute('src') == pic3) { pic10 = pic3 }
        this.style.backgroundColor = 'violet'
        turn = true
        position = Number(this.id)
    }
    // else if ((turn) && (Math.abs(position - Number(this.id)) == 4 || Math.abs(position - Number(this.id)) == 6) && this.firstChild.tagName != 'IMG') {
    //     console.log('ok')
    //     this.innerHTML = '<img src=' + pic10 + '>'
    //     divs[position].innerHTML = position
    //     divs[position].style.backgroundColor = color
    //     turn = false
    // }
    // else if ((turn) && (Math.abs(position - Number(this.id)) == 8 || Math.abs(position - Number(this.id)) == 12) && this.firstChild.tagName != 'IMG') {
    //     console.log('ok')
    //     this.innerHTML = '<img src=' + pic10 + '>'
    //     divs[position].innerHTML = position
    //     divs[position].style.backgroundColor = color
    //     turn = false
    // }

    // else if ((turn) && (Math.abs(position - Number(this.id)) == 16 || Math.abs(position - Number(this.id)) == 18) && this.firstChild.tagName != 'IMG') {
    //     console.log('ok')
    //     this.innerHTML = '<img src=' + pic10 + '>'
    //     divs[position].innerHTML = position
    //     divs[position].style.backgroundColor = color
    //     turn = false
    // }
    // else if ((turn) && (Math.abs(position - Number(this.id)) == 24) && this.firstChild.tagName != 'IMG') {
    //     console.log('ok')
    //     this.innerHTML = '<img src=' + pic10 + '>'
    //     divs[position].innerHTML = position
    //     divs[position].style.backgroundColor = color
    //     turn = false
    // }
    else if ((turn)&&(this.firstChild.tagName!='IMG')){
        if (pic10==pic1){
        f4(this)

    }
    if (pic10==pic2){
        f2(this)
    }
    if (pic10==pic3){
        f3(this)
    }
}
    else if (this.id == position && turn) {
        this.style.backgroundColor = color
        turn = false
    }
}
// как связать функцию с определенной фигурой

function f2(figur) {
    // console.log(this.id)
    // console.log(this)
    // console.log(this.firstChild.tagName)
    // if (this.firstChild.tagName == 'IMG' && (!turn)) {
    //     console.log('выбрано')
    //     this.style.backgroundColor = 'violet'
    //     turn = true
    //     position = Number(this.id)
    // }
     if ((turn) && (Math.abs(position - Number(figur.id)) == 3 || Math.abs(position - Number(figur.id)) == 7) && figur.firstChild.tagName != 'IMG') {
        console.log('ok')
        figur.innerHTML = '<img src=' + pic10 + '>'
        divs[position].innerHTML = position
        divs[position].style.backgroundColor = color
        turn = false
    }
    else if ((turn) && (Math.abs(position - Number(figur.id)) == 9 || Math.abs(position - Number(figur.id)) == 11) && figur.firstChild.tagName != 'IMG') {
        console.log('ok')
        figur.innerHTML = '<img src=' + pic10 + '>'
        divs[position].innerHTML = position
        divs[position].style.backgroundColor = color
        turn = false
    }

    //как закрасить в цвет который был перед violet - условие
    // else if (this.id == position && turn) {
    //     this.style.backgroundColor = 'azure'
    //     turn = false
    // }

}

function f3(figur) {
    // console.log(this.id)
    // console.log(this)
    // console.log(this.firstChild.tagName)
    // if (this.firstChild.tagName == 'IMG' && (!turn)) {
    //     console.log('выбрано')
    //     this.style.backgroundColor = 'violet'
    //     turn = true
    //     position = Number(this.id)
    // }

    // как создать условие на первоначальный цвет клетки!!
    if ((turn) && (Math.abs(position - Number(figur.id)) == 5)  && (figur.firstChild.tagName != 'IMG'))
        {
        console.log('ok')
        figur.innerHTML = '<img src=' + pic10 + '>'
        divs[position].innerHTML = position
        divs[position].style.backgroundColor = color
        turn = false
    }



    // else if (this.id == position && turn) {
    //     this.style.backgroundColor = 'azure'
    //     turn = false
    // }

    //    else {
    //     this.style.backgroundColor = 'burlywood'
    //    turn = false

    //    }

}

function f4(figur){
     if ((turn) && (Math.abs(position - Number(figur.id)) == 4 || Math.abs(position - Number(figur.id)) == 6) && figur.firstChild.tagName != 'IMG') {
        console.log('ok')
        figur.innerHTML = '<img src=' + pic10 + '>'
        divs[position].innerHTML = position
        divs[position].style.backgroundColor = color
        turn = false
    }
    else if ((turn) && (Math.abs(position - Number(figur.id)) == 8 || Math.abs(position - Number(figur.id)) == 12) && figur.firstChild.tagName != 'IMG') {
        console.log('ok')
        figur.innerHTML = '<img src=' + pic10 + '>'
        divs[position].innerHTML = position
        divs[position].style.backgroundColor = color
        turn = false
    }

    else if ((turn) && (Math.abs(position - Number(figur.id)) == 16 || Math.abs(position - Number(figur.id)) == 18) && figur.firstChild.tagName != 'IMG') {
        console.log('ok')
        figur.innerHTML = '<img src=' + pic10 + '>'
        divs[position].innerHTML = position
        divs[position].style.backgroundColor = color
        turn = false
    }
    else if ((turn) && (Math.abs(position - Number(figur.id)) == 24) && figur.firstChild.tagName != 'IMG') {
        console.log('ok')
        figur.innerHTML = '<img src=' + pic10 + '>'
        divs[position].innerHTML = position
        divs[position].style.backgroundColor = color
        turn = false
    }


}
