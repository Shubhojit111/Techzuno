'use client'
import { useEffect, useRef, useCallback } from 'react'

const BG = '#3EFFA0'
const FG = '#0a0a0a'
const LABEL = 'TECHZUNO'
const DIAMOND = ''
// Bigger slices + tighter hover zone + full-width logo

export default function GlitchFooter() {
  const footerRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  const setup = useCallback(() => {
    const footer = footerRef.current
    const canvas = canvasRef.current
    if (!footer || !canvas) return

    const ctx = canvas.getContext('2d')
    const DPR = window.devicePixelRatio || 1

    /* ── Sizing ── */
    const W = footer.offsetWidth
    const H = Math.round(W * 0.19)

    footer.style.height = `${H}px`

    canvas.width = W * DPR
    canvas.height = H * DPR
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0)

    /* ── Offscreen ── */
    const off = document.createElement('canvas')
    off.width = W * DPR
    off.height = H * DPR

    const offCtx = off.getContext('2d')
    offCtx.setTransform(DPR, 0, 0, DPR, 0, 0)

    let mouseX = 0
    let isHovering = false
    let glitchSlices = []
    let glitchRX = 0
    let glitchRW = 0

    /* ── Font Size (fills almost full width) ── */
    function getFontSize() {
      let size = H * 0.92

      offCtx.font = `900 ${size}px 'Anton', sans-serif`
      const tw = offCtx.measureText(LABEL).width

      size = size * (W * 0.985) / tw

      return Math.min(size, H * 0.98)
    }

    /* ── Clean Render ── */
    function renderClean(c) {
      c.clearRect(0, 0, W, H)
      c.fillStyle = BG
      c.fillRect(0, 0, W, H)

      const fs = getFontSize()

      c.font = `900 ${fs}px 'Anton', sans-serif`
      const tw = c.measureText(LABEL).width

      const startX = (W - tw) / 2
      const midY = H / 2 + fs * 0.045

      c.fillStyle = FG
      c.textBaseline = 'middle'
      c.textAlign = 'left'
      c.font = `900 ${fs}px 'Anton', sans-serif`

      c.fillText(LABEL, startX, midY)
    }

    renderClean(offCtx)

    /* ── Layout ── */
    function buildLayout() {
      const fs = getFontSize()

      offCtx.font = `900 ${fs}px 'Anton', sans-serif`

      const tw = offCtx.measureText(LABEL).width
      let x = (W - tw) / 2

      const layout = []

      for (const ch of LABEL) {
        const cw = offCtx.measureText(ch).width
        layout.push({ x, w: cw })
        x += cw
      }

      return layout
    }

    /* ── Hover-Based Focused Glitch ── */
    function startGlitch(cursorX) {
      const layout = buildLayout()
      const fs = getFontSize()

      // Only affect hovered letter + maybe adjacent
      let si = layout.findIndex(
        (char) => cursorX >= char.x && cursorX <= char.x + char.w
      )

      if (si < 0) return

      const zone = layout.slice(
        Math.max(0, si),
        Math.min(layout.length, si + 1)
      )

      glitchRX = zone[0].x
      glitchRW = zone.reduce((sum, char) => sum + char.w, 0)

      /* BIGGER BLOCKS */
      const sliceH = Math.max(
        8,
        Math.round(fs / (5 + Math.random() * 2))
      )

      const count = Math.ceil(H / sliceH)

      glitchSlices = []

      for (let i = 0; i < count; i++) {
        const y = i * sliceH
        let dx = 0

        const verticalInText =
          y > H * 0.12 &&
          y < H * 0.88

        if (verticalInText && Math.random() < 0.8) {
          // MUCH smaller radius
          const mag =
            W * (0.004 + Math.random() * 0.018)

          dx =
            (Math.random() < 0.5 ? 1 : -1) * mag
        }

        glitchSlices.push({
          y,
          h: sliceH,
          dx
        })
      }
    }

    /* ── Draw ── */
    function drawClean() {
      ctx.drawImage(
        off,
        0,
        0,
        W * DPR,
        H * DPR,
        0,
        0,
        W,
        H
      )
    }

    function drawGlitch() {
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, W, H)

      glitchSlices.forEach((slice) => {
        if (slice.dx === 0) {
          ctx.drawImage(
            off,
            0,
            slice.y * DPR,
            W * DPR,
            slice.h * DPR,
            0,
            slice.y,
            W,
            slice.h
          )
          return
        }

        // Left normal
        if (glitchRX > 0) {
          ctx.drawImage(
            off,
            0,
            slice.y * DPR,
            glitchRX * DPR,
            slice.h * DPR,
            0,
            slice.y,
            glitchRX,
            slice.h
          )
        }

        // Right normal
        const tailX = glitchRX + glitchRW
        const tailW = W - tailX

        if (tailW > 0) {
          ctx.drawImage(
            off,
            tailX * DPR,
            slice.y * DPR,
            tailW * DPR,
            slice.h * DPR,
            tailX,
            slice.y,
            tailW,
            slice.h
          )
        }

        // Shifted zone
        ctx.save()
        ctx.beginPath()
        ctx.rect(glitchRX, slice.y, glitchRW, slice.h)
        ctx.clip()

        ctx.drawImage(
          off,
          glitchRX * DPR,
          slice.y * DPR,
          glitchRW * DPR,
          slice.h * DPR,
          glitchRX + slice.dx,
          slice.y,
          glitchRW,
          slice.h
        )

        ctx.restore()
      })

      /* Cleaner subtle scanline */
      if (Math.random() < 0.12) {
        const ly = Math.random() * H
        ctx.fillStyle = `rgba(10,10,10,0.18)`
        ctx.fillRect(0, ly, W, 2)
      }
    }

    /* ── Events ── */
    footer.onmousemove = (e) => {
      const rect = footer.getBoundingClientRect()

      mouseX = e.clientX - rect.left
      isHovering = true

      startGlitch(mouseX)
    }

    footer.onmouseleave = () => {
      isHovering = false
    }

    /* ── Loop ── */
    function loop() {
      if (isHovering) {
        drawGlitch()
      } else {
        drawClean()
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(loop)
  }, [])

  useEffect(() => {
    document.fonts.load("900 100px 'Anton'").then(setup)

    window.addEventListener('resize', setup)

    return () => {
      window.removeEventListener('resize', setup)

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [setup])

  return (
    <footer
      ref={footerRef}
      style={{
        width: '100%',
        background: BG,
        overflow: 'hidden',
        lineHeight: 0,
        cursor: 'pointer'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%'
        }}
      />
    </footer>
  )
}