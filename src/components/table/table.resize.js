/* eslint-disable linebreak-style */
import {$} from '../../core/dom'


export function toResize(event, $root) {
  return new Promise((resolve) => {
    event.preventDefault()
    const $target = $(event.target)
    const $parent = $target.closest('[data-resized="resized"]')
    const type = $target.data.resize
    let coords = $parent.getCoords()
    const lineStyle = type === 'col'?'col-line-resize':'row-line-resize'
    const $line =$.create('div', lineStyle)
    $parent.append($line)
    let lastCoordinat
    const mouseMove = (e)=> {
      coords = $parent.getCoords()
      if (type === 'col') {
        $target.css({
          opacity: 1,
          left: e.pageX -
            coords.left - $target.getCoords().width+ 'px'
        })
        $line.css({left: e.pageX - coords.left -
          $line.getCoords().width + 'px'})
        lastCoordinat = coords.width+e.pageX-coords.right
        $parent.css({width: lastCoordinat + 'px'})
        if (e.pageX < coords.right) {
          $target.css({left: $parent.$el.style.minWidth})
          $line.css({left: $parent.$el.style.minWidth})
        }
      } else {
        $target.css({
          ['z-index']: 1000,
          opacity: 1,
          top: e.pageY -
            coords.top - $target.getCoords().height + 'px'
        })
        $line.css({
          top: e.pageY -
            coords.top - $line.getCoords().height + 'px'
        })
        lastCoordinat = coords.height + e.pageY-coords.bottom
        // if (e.pageY < coords.bottom) {
        //   $target.css({top: $parent.$el.style.minHeight})
        //   $line.css({top: $parent.$el.style.minHeight})
        // }
      }
    }
    const mouseUp = ()=> {
      if (type === 'col') {
        lastCoordinat = coords.width
        const elems = $root.findAll(`[data-col="${$parent.data.col}"]`)
        elems.forEach((el) => {
          el.style.width = coords.width + 'px'
        })
      } else {
        $parent.css({
          height: lastCoordinat + 'px'
        })
      }
      resolve({
        type,
        value: lastCoordinat,
        id: type === 'col'?$parent.data.col: $parent.data.row
      })
      $target.$el.removeAttribute('style')
      $line.$el.remove()
      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseup', mouseUp)
    }
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
    $target.ondragstart = function() {
      return false
    }
  })
}
