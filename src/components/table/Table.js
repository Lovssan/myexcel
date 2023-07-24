import {ExcelComponent} from '../../core/ExcelComponent'
import {createTable} from './table.template'

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'click', 'mouseup']
    })
  }
  static className = 'excel__table'
  toHTML() {
    return createTable()
  }
  onMousedown(event) {
    const key = event.target.dataset.resize
    const target = event.target
    const parent = target.closest('[data-resized="resized"]')
    switch (key) {
      case 'col':
        event.preventDefault()
        target.onmousedown = function(event) {
          const id = parent.dataset.id
          const line = document.createElement('div')
          line.classList.add('col-line-resize')
          parent.append(line)
          document.addEventListener('mousemove', mouseMove)
          document.addEventListener('mouseup', mouseUp)
          function mouseMove(e) {
            target.style.opacity = 1
            target.style.left = e.pageX -
              parent.getBoundingClientRect().left - target.offsetWidth + 'px'
            line.style.left = e.pageX -
              parent.getBoundingClientRect().left - line.offsetWidth + 'px'
            const lastCoordinat = e.pageX-parent.getBoundingClientRect().right
            parent.style.width = parent.offsetWidth + lastCoordinat + 'px'
            if (e.pageX
              < parent.getBoundingClientRect().right) {
              target.style.left = parent.style.minWidth
              line.style.left = parent.style.minWidth
            }
          }
          function mouseUp() {
            const elems = document.querySelectorAll(`[data-id="${id}"]`)
            elems.forEach((el) => {
              el.style.width = parent.offsetWidth + 'px'
            })
            target.removeAttribute('style')
            line.remove()
            document.removeEventListener('mousemove', mouseMove)
            document.removeEventListener('mouseup', mouseUp)
            target.onmousedown = null
          }
        }
        target.ondragstart = function() {
          return false
        }
        break
      case 'row':
        event.preventDefault()
        target.onmousedown = function(event) {
          const line = document.createElement('div')
          line.classList.add('row-line-resize')
          parent.append(line)
          document.addEventListener('mousemove', mouseDown)
          document.addEventListener('mouseup', mouseUp)
          function mouseDown(e) {
            target.style.opacity = 1
            target.style.top = e.pageY -
              parent.getBoundingClientRect().top - target.offsetHeight + 'px'
            line.style.top = e.pageY -
              parent.getBoundingClientRect().top - line.offsetHeight + 'px'
            const lastCoordinat = e.pageY-parent.getBoundingClientRect().bottom
            parent.style.height = parent.offsetHeight + lastCoordinat + 'px'
            if (e.pageY
              < parent.getBoundingClientRect().bottom) {
              target.style.top = parent.style.minHeight
              line.style.top = parent.style.minHeight
            }
          }
          function mouseUp() {
            target.removeAttribute('style')
            line.remove()
            document.removeEventListener('mousemove', mouseDown)
            document.removeEventListener('mouseup', mouseUp)
            target.onmousedown = null
          }
        }
        target.ondragstart = function() {
          return false
        }
        break
    }
  }
  onClick() {
  }
  onMousemove(event) {
  }
  onMouseup(event) {

  }
}
