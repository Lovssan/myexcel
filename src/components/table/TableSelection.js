/* eslint-disable linebreak-style */
export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    $el.focus().addClass(TableSelection.className)
    this.current = $el
    this.group.push($el)
  }

  clear() {
    this.group.forEach(($cell)=>{
      $cell.removeClass(TableSelection.className)
    })
    this.group = []
  }

  selectGroup($group=[]) {
    this.clear()
    this.group = $group
    this.group.forEach((cell) => cell.addClass(TableSelection.className))
  }
}
