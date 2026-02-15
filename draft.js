// Отладочная версия с подробным логированием

let main = document.getElementById('main')
let position
let pic1 = 'bishop.png'
let pic2 = 'N.png'
let pic3 = 'pawn.png'
let color
let pic10

let divs // ← объявляем глобально в НАЧАЛЕ

console.log('=== ИНИЦИАЛИЗАЦИЯ ===')
console.log('main элемент:', main)
console.log('divs коллекция:', divs) // ← теперь divs объявлен
console.log('Количество divs:', divs ? divs.length : 'undefined')

function start() {
    let str = ''
    for (let i = 0; i < 25; i++) {
        str += '<div id=' + i + '>' + i + '</div>'
    }
    main.innerHTML = str
    
    // Обновляем ГЛОБАЛЬНУЮ переменную
    divs = document.getElementsByTagName('div')
    console.log('divs после создания доски:', divs.length)
    
    // Расстановка фигур (используем глобальную divs)
    divs[2].innerHTML = '<img src=' + pic1 + '>'
    
    for (let i = 1; i < 5; i += 2) {
        divs[i].innerHTML = '<img src=' + pic2 + '>'
    }
    
    for (let i = 5; i < 10; i++) {
        divs[i].innerHTML = '<img src=' + pic3 + '>'
    }

    for (let d of divs) {
        d.onclick = handleClick
    }
    updateCellAppearance()
}

start()




let turn = false
let selectedPiece = null

function handleClick() {
    console.log('=== ОБРАБОТКА КЛИКА ===')
    console.log('Клик по ячейке ID:', this.id)
    console.log('Содержимое ячейки:', this.innerHTML)
    console.log('Turn перед обработкой:', turn)
    console.log('selectedPiece:', selectedPiece)
    
    // Проверяем наличие фигуры
    const hasPiece = this.firstChild && this.firstChild.tagName == 'IMG'
    console.log('Есть ли фигура в ячейке:', hasPiece)
    
    // Если фигура не выбрана и кликнули на фигуру
    if (!turn && hasPiece) {
        console.log('УСЛОВИЕ 1: Выбор фигуры')
        selectPiece(this)
    }
    // Если фигура выбрана и кликнули на пустую ячейку
    else if (turn && !hasPiece) {
        console.log('УСЛОВИЕ 2: Попытка перемещения')
        movePiece(this)
    }
    // Если кликнули на выбранную фигуру - отмена выбора
    else if (turn && this == selectedPiece) {
        console.log('УСЛОВИЕ 3: Отмена выбора')
        cancelSelection()
    }
    else {
        console.log('УСЛОВИЕ 4: Необработанный случай')
        console.log('Причина: turn =', turn, 'hasPiece =', hasPiece, 'this == selectedPiece =', this == selectedPiece)
    }
    
    console.log('Turn после обработки:', turn)
}

function selectPiece(cell) {
    console.log('=== ВЫБОР ФИГУРЫ ===')
    console.log('Выбранная ячейка:', cell.id)
    console.log('Содержимое:', cell.innerHTML)
    
    color = cell.style.backgroundColor
    console.log('Цвет фона ячейки:', color)
    
    if (cell.firstChild && cell.firstChild.tagName == 'IMG') {
        pic10 = cell.firstChild.getAttribute('src')
        console.log('Тип фигуры (src):', pic10)
    } else {
        console.log('ОШИБКА: В ячейке нет фигуры!')
        return
    }
    
    cell.style.backgroundColor = 'violet'
    turn = true
    position = Number(cell.id)
    selectedPiece = cell
    
    console.log('Параметры после выбора:')
    console.log('position:', position)
    console.log('turn:', turn)
    console.log('selectedPiece:', selectedPiece)
}

function movePiece(targetCell) {
    console.log('=== ПОПЫТКА ПЕРЕМЕЩЕНИЯ ===')
    console.log('Из позиции:', position, 'В позицию:', targetCell.id)
    console.log('Тип фигуры:', pic10)
    
    const fromPos = position
    const toPos = Number(targetCell.id)
    
    console.log('Координаты:')
    const fromRow = Math.floor(fromPos / 5)//Позиции 0-4: 0/5=0, 1/5=0.2, 2/5=0.4, 3/5=0.6, 4/5=0.8 → Math.floor() даёт 0 (первая строка),Позиции 5-9: 5/5=1, 6/5=1.2, 7/5=1.4, 8/5=1.6, 9/5=1.8 → Math.floor() даёт 1 (вторая строка)
    const fromCol = fromPos % 5            //Оператор % (остаток от деления) показывает позицию внутри строки:Позиции 0,5,10,15,20: 0%5=0, 5%5=0, 10%5=0, 15%5=0, 20%5=0 → колонка 0,Позиции 1,6,11,16,21: 1%5=1, 6%5=1, 11%5=1, 16%5=1, 21%5=1 → колонка 1
    const toRow = Math.floor(toPos / 5)
    const toCol = toPos % 5
    console.log(`Из: строка ${fromRow}, колонка ${fromCol}`)
    console.log(`В: строка ${toRow}, колонка ${toCol}`)
    
    // Правильные шахматные правила для доски 5x5
    let isValidMove = false
    function isDiagonalPathClear(fromPos, toPos) {
    console.log('=== ПРОВЕРКА ДИАГОНАЛЬНОГО ПУТИ ===')
    
    const fromRow = Math.floor(fromPos / 5)
    const fromCol = fromPos % 5
    const toRow = Math.floor(toPos / 5)
    const toCol = toPos % 5
    
    const rowStep = toRow > fromRow ? 1 : -1
    const colStep = toCol > fromCol ? 1 : -1
    
    console.log(`Путь из (${fromRow},${fromCol}) в (${toRow},${toCol})`)
    console.log(`Шаг по строкам: ${rowStep}, по колонкам: ${colStep}`)
    
    // Проверяем все промежуточные клетки
    let currentRow = fromRow + rowStep
    let currentCol = fromCol + colStep
    
    while (currentRow !== toRow && currentCol !== toCol) {
        const currentPos = currentRow * 5 + currentCol
        console.log(`Проверяем клетку (${currentRow},${currentCol}) = позиция ${currentPos}`)
        
        // Проверяем, есть ли фигура на промежуточной клетке
        const cell = divs[currentPos]
        const hasPiece = cell.firstChild && cell.firstChild.tagName == 'IMG'
        
        if (hasPiece) {
            console.log(`❌ На пути фигура в позиции ${currentPos}`)
            return false
        }
        
        currentRow += rowStep
        currentCol += colStep
    }
    
    console.log('✅ Путь свободен')
    return true
}

    if (pic10 == pic1) { // Слон - по диагонали
        console.log('Проверка хода для СЛОНА')
        const rowDiff = Math.abs(toRow - fromRow)
        const colDiff = Math.abs(toCol - fromCol)
        isValidMove = rowDiff === colDiff && rowDiff > 0
        if (isValidMove) {
        // Проверяем, что путь свободен
        isValidMove = isDiagonalPathClear(fromPos, toPos)
    }
    
    console.log(`Разница по строкам: ${rowDiff}, по колонкам: ${colDiff}`)
    console.log('Ход допустим:', isValidMove)
        console.log(`Разница по строкам: ${rowDiff}, по колонкам: ${colDiff}`)
        console.log('Ход допустим:', isValidMove)
    }
    else if (pic10 == pic2) { // Конь - буквой "Г"
        console.log('Проверка хода для КОНЯ')
        const rowDiff = Math.abs(toRow - fromRow)
        const colDiff = Math.abs(toCol - fromCol)
        isValidMove = (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)
        console.log(`Разница по строкам: ${rowDiff}, по колонкам: ${colDiff}`)
        console.log('Ход допустим:', isValidMove)
    }
    else if (pic10 == pic3) { // Пешка - вперед на одну клетку
        console.log('Проверка хода для ПЕШКИ')
        isValidMove = toPos === fromPos + 5
        console.log('Требуется toPos === fromPos + 5:', toPos, '===', fromPos + 5)
        console.log('Ход допустим:', isValidMove)
    }
    else {
        console.log('НЕИЗВЕСТНЫЙ ТИП ФИГУРЫ:', pic10)
    }
    
    if (isValidMove) {
        console.log('✅ Ход ДОПУСТИМ - перемещаем фигуру')
        // Перемещаем фигуру
        targetCell.innerHTML = '<img src=' + pic10 + '>'
        selectedPiece.innerHTML = selectedPiece.id
        selectedPiece.style.backgroundColor = color
        turn = false
        selectedPiece = null
        updateCellAppearance()
        console.log('✅ Перемещение завершено')
    } else {
        console.log('❌ Ход НЕДОПУСТИМ')
        // Визуальная обратная связь
        targetCell.style.boxShadow = '0 0 10px red'
        setTimeout(() => {
            targetCell.style.boxShadow = 'none'
        }, 500)
    }
}

function cancelSelection() {
    console.log('=== ОТМЕНА ВЫБОРА ===')
    selectedPiece.style.backgroundColor = color
    turn = false
    selectedPiece = null
    console.log('✅ Выбор отменен')
}

function updateCellAppearance() {
    console.log('=== ОБНОВЛЕНИЕ ВНЕШНЕГО ВИДА ===')
    for (let d of divs) {
        const hasPiece = d.firstChild && d.firstChild.tagName == 'IMG'
        if (hasPiece) {
            d.style.fontSize = '0'
            console.log(`Ячейка ${d.id}: скрываем цифру (есть фигура)`)
        } else {
            d.style.fontSize = '12px'
            console.log(`Ячейка ${d.id}: показываем цифру ${d.innerHTML}`)
        }
    }
}

// Дополнительная диагностика
console.log('=== ДИАГНОСТИКА ЧЕРЕЗ 1 СЕКУНДУ ===')
setTimeout(() => {
    console.log('Проверка состояния через 1 секунду:')
    console.log('main элемент:', main)
    console.log('divs коллекция длина:', divs.length)
    console.log('Содержимое первых 10 ячеек:')
    for (let i = 0; i < 10; i++) {
        if (divs[i]) {
            console.log(`Ячейка ${i}:`, divs[i].innerHTML)
        }
    }
}, 1000)
