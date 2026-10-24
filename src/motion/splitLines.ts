/**
 * Split a heading into masked lines for a line-by-line reveal.
 *
 * GSAP's SplitText groups words into lines by comparing horizontal positions in
 * left-to-right order, so an Arabic (RTL) heading comes back as a single "line".
 * This groups words by their vertical position instead, which works in both
 * directions. Words are never broken apart, so Arabic letters stay joined.
 *
 * Call `revert()` once the reveal has finished so the heading reflows naturally
 * on resize.
 */
export interface SplitLines {
  lines: HTMLElement[]
  revert: () => void
}

export function splitLines(el: HTMLElement): SplitLines {
  // Keep the original nodes (not a string copy) so React's text node is put back untouched.
  const original = Array.from(el.childNodes)
  const words = (el.textContent ?? '').trim().split(/\s+/).filter(Boolean)

  // 1. Measure: one inline-block per word.
  el.textContent = ''
  const spans = words.map((word, i) => {
    const span = document.createElement('span')
    span.textContent = word
    span.style.display = 'inline-block'
    el.append(span)
    if (i < words.length - 1) el.append(' ')
    return span
  })
  const rows: string[][] = []
  let lastTop = Number.NaN
  spans.forEach((span, i) => {
    const top = Math.round(span.offsetTop)
    if (Number.isNaN(lastTop) || Math.abs(top - lastTop) > 4) rows.push([])
    rows[rows.length - 1].push(words[i])
    lastTop = top
  })

  // 2. Rebuild as mask > line blocks.
  el.textContent = ''
  const lines = rows.map((row) => {
    const mask = document.createElement('span')
    mask.className = 'split-line-mask'
    mask.style.cssText = 'display:block;overflow:clip'
    const line = document.createElement('span')
    line.className = 'split-line'
    line.style.display = 'block'
    line.textContent = row.join(' ')
    mask.append(line)
    el.append(mask)
    return line
  })

  return {
    lines,
    revert: () => {
      if (el.firstChild && original.includes(el.firstChild as ChildNode)) return
      el.replaceChildren(...original)
    },
  }
}

/** Resolve when webfonts are ready, or after `ms` — whichever comes first. */
export function fontsReady(ms = 1500): Promise<void> {
  return Promise.race([document.fonts?.ready.then(() => undefined) ?? Promise.resolve(), new Promise<void>((r) => setTimeout(r, ms))])
}
