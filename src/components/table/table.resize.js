import {$} from '../../core/dom'


export function toResize(event, $root) {
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
      lastCoordinat = e.pageX-coords.right
      $target.css({
        opacity: 1,
        left: e.pageX -
          coords.left - $target.getCoords().width+ 'px'
      })
      $line.css({left: e.pageX - coords.left -
        $line.getCoords().width + 'px'})
      $parent.css({width: coords.width + lastCoordinat + 'px'})
      if (e.pageX < coords.right) {
        $target.css({left: $parent.$el.style.minWidth})
        $line.css({left: $parent.$el.style.minWidth})
      }
    } else {
      $target.css({
        opacity: 1,
        top: e.pageY -
          coords.top - $target.getCoords().height + 'px'
      })
      $line.css({
        top: e.pageY -
          coords.top - $line.getCoords().height + 'px'
      })
      lastCoordinat = e.pageY-coords.bottom
      $parent.css({
        height: coords.height + lastCoordinat + 'px'
      })
      if (e.pageY < coords.bottom) {
        $target.css({top: $parent.$el.style.minHeight})
        $line.css({top: $parent.$el.style.minHeight})
      }
    }
  }
  const mouseUp = ()=> {
    if (type === 'col') {
      const elems = $root.findAll(`[data-id="${$parent.data.id}"]`)
      elems.forEach((el) => {
        el.style.width = coords.width + 'px'
      })
    }
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
}
