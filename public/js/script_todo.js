let task = document.querySelectorAll('.task')
let checkboxTask = document.querySelectorAll('.task input')

task.forEach(item => {
    item.addEventListener('mouseover', (e) => {
        let itemRemove = item.querySelector('.remove')
        itemRemove.style.display = 'block'
        setTimeout(() => {
            itemRemove.style.opacity = 1
        }, 50)
    })

    item.addEventListener('mouseout', () => {
        let itemRemove = item.querySelector('.remove')
        itemRemove.style.opacity = 0
        setTimeout(() => {
            itemRemove.style.display = 'none'
        }, 1000)
    })

    let itemRemove = item.querySelector('.remove')
    itemRemove.addEventListener('click', () => {
        item.remove()
    })
})


checkboxTask.forEach(item => {
    item.addEventListener('click', (e) => {
        let taskParent = item.parentElement
        let p = taskParent.querySelector('p')
        if (item.checked == true) {
            p.style.textDecoration = 'line-through'
        } else {
            p.style.textDecoration = 'none'
        }
    })
});