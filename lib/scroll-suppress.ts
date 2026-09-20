let isScrolling = false

export function suppressScroll() {
  isScrolling = true
}

export function releaseScroll() {
  isScrolling = false
}

export function getIsScrolling() {
  return isScrolling
}