/* eslint-disable linebreak-style */
export class Dom {
  constructor(selector) {
    this.$el = typeof selector==='string'
    ? document.querySelector(selector)
    : selector
  }
  html(html) {
    if (typeof html ==='string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }
  clear() {
    this.html('')
    return this
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }

  css(styles={}) {
    Object.keys(styles).forEach( (key) =>this.$el.style[key] = styles[key])
  }
  addClass(className) {
    this.$el.classList.add(className)
  }
  removeClass(className) {
    this.$el.classList.remove(className)
  }

  focus() {
    this.$el.focus()
    return this
  }

  attr(name, value) {
    if (value !== undefined) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }

  getStyles(styles =[]) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s]
      return res
    }, {})
  }

  set text(text) {
    if (this.$el.tagName.toLowerCase() === 'input') {
      this.$el.value = text
      return
    }
    this.$el.textContent = text
  }
  get text() {
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }
}
export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
