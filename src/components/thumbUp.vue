<template>
  <div class="container" style="position: relative" ref="container">
    <canvas width="70" height="70" ref="canvas"></canvas>
    <svg
      style="position: absolute; left: 20px; top: 21px"
      t="1603294100131"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="7753"
      width="32"
      height="32"
    >
      <path
        d="M512 908.153535l-4.783838-0.90505c-71.628283-13.705051-157.478788-56.113131-235.571718-116.492929-41.244444-31.935354-78.092929-67.10303-109.381818-104.59798-34.391919-41.373737-61.155556-84.29899-79.515151-127.870707-23.531313-55.854545-33.228283-116.234343-28.185859-174.804041 4.783838-55.725253 22.755556-108.347475 51.846465-152.177777 47.967677-72.274747 121.793939-113.777778 202.472727-113.777778 35.426263 0 71.628283 7.886869 107.830303 23.272727 32.064646 13.705051 64 33.486869 95.288889 58.828283 31.288889-25.341414 63.224242-45.123232 95.288889-58.828283 36.072727-15.515152 72.40404-23.272727 107.830303-23.272727 80.678788 0 154.505051 41.50303 202.472727 113.777778 29.090909 43.830303 47.062626 96.452525 51.846465 152.177777 5.042424 58.569697-4.654545 118.949495-28.185859 174.804041-18.359596 43.442424-45.123232 86.49697-79.515151 127.741414-31.288889 37.494949-68.008081 72.662626-109.381818 104.59798-77.963636 60.379798-163.814141 102.787879-235.571718 116.492929l-4.783838 1.034343z"
        fill="#999"
        p-id="7754"
        ref="mindColor"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  data () {
    return {
      canvas: null,
      mindColor: null,
      ctx: null,
      w: 35,
      h: 35,
      r: 23,
      start: undefined,
      startAngle: 0.5 * Math.PI,
      progress: this.startAngle,
      animationTime: [500, 500, 250],
      isPlaying: false,
      requestAnimationFrameID: undefined
    }
  },
  methods: {
    init () {
      this.ctx.beginPath()
      this.ctx.lineWidth = 2
      this.ctx.strokeStyle = '#999'
      this.ctx.arc(this.w, this.h, this.r, 0, 2 * Math.PI)
      this.ctx.stroke()
    },
    reset () {
      this.ctx.clearRect(0, 0, 70, 70)
      this.mindColor.setAttribute('fill', '#999')
      this.start = undefined
      this.progress = this.startAngle
      this.mindColor.style.display = 'block'
    },
    drawArc (elapsed) {
      const nowProgress = (elapsed / this.animationTime[0]) * 2 * Math.PI + this.startAngle
      this.ctx.arc(this.w, this.h, this.r, this.progress, nowProgress)
      this.progress = nowProgress
      this.ctx.stroke()
    },
    drawCircle (elapsed) {
      this.ctx.beginPath()
      this.progress = (elapsed - this.animationTime[0]) / this.animationTime[1]
      this.ctx.lineWidth = 2 + this.r * this.progress
      this.ctx.arc(this.w, this.h, this.r * (1 - this.progress), 0, 2 * Math.PI)
      this.ctx.stroke()
    },
    expand (elapsed) {
      const durationProgress = (elapsed - this.animationTime[0] - this.animationTime[1]) / this.animationTime[2]
      this.progress = durationProgress < 0.4 ? 0.75 * durationProgress : (1 - durationProgress) / 2
      this.canvas.style.transform = `scale(${this.progress + 1})`
    },
    step (timestamp) {
      if (this.start === undefined) {
        this.start = timestamp
      }
      const elapsed = timestamp - this.start
      if (elapsed < this.animationTime[0]) {
        this.drawArc(elapsed)
      } else if (elapsed < this.animationTime[0] + this.animationTime[1]) {
        this.mindColor.style.display = 'none'
        this.drawCircle(elapsed)
      } else {
        this.mindColor.getAttribute('fill') !== '#fe8e8f' && this.mindColor.setAttribute('fill', '#ff7a7b')
        this.mindColor.style.display = 'block'
        this.expand(elapsed)
      }
      if (elapsed < this.animationTime[0] + this.animationTime[1] + this.animationTime[2]) {
        this.requestAnimationFrameID = requestAnimationFrame(this.step)
      }
    }
  },
  mounted () {
    this.canvas = this.$refs.canvas
    this.mindColor = this.$refs.mindColor
    this.ctx = this.canvas.getContext('2d')

    this.init()
    this.$refs.container.addEventListener('click', () => {
      if (this.isPlaying) {
        cancelAnimationFrame(this.requestAnimationFrameID)
        this.reset()
        this.init()
        this.isPlaying = false
      } else {
        this.isPlaying = true
        this.ctx.beginPath()
        this.ctx.strokeStyle = '#ffc600'
        this.ctx.moveTo(this.w, this.h + this.r)
        this.requestAnimationFrameID = requestAnimationFrame(this.step)
      }
    })
  }
}
</script>
