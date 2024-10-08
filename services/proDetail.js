const reduce = document.getElementById('btn-reduce')
const increase = document.getElementById('btn-increase')
const quanty = document.getElementById('qty-input')



function reduceQty() {
    if (quanty.value > 1) {
        quanty.value--
    }
}

function increaseQty() {
    quanty.value++
}