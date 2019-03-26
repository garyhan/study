function DrawCircle({
  data = [],
  el,
  options = {}
}) {
  this.$data = data;
  this.$el = document.querySelector(el);
  this.$ctx = this.$el.getContext('2d');
  this.cbs = options && options.methods;
  this.balls = [];
  this.total = 0;
  this.$w = this.$el.width;
  this.$h = this.$el.height;
  this.init();
}

function randomColor() {
  return Math.floor(Math.random() * 256);
}

DrawCircle.prototype = {
  init() {
    this.$data.forEach(d => {
      this.total += d.num
    })

    this.$data.forEach(d => {
      let r = (this.$h * (d.num / this.total))
      //创建圆
      // todo 算法有问题
      let prefix = this.createBall(r);
      ball = {
        x: prefix.x,
        y: prefix.y,
        r: r,
        color: `rgba(${randomColor()},${randomColor()},${randomColor()})`,
        data: d
      };
      this.balls.push(ball)
      this.draw(ball);
    })


    this.$el.addEventListener('click', (e) => {
      if (ball = this.isAxios({
          x: e.x,
          y: e.y,
          r: 5
        })) {
        if (this.cbs && this.cbs.click && this.cbs.click.length) {
          this.cbs.forEach((cb) => {
            cb(ball);
          })
          this.clearCanvas();
          balls.forEach(ball => {
            this.draw(ball);
          })
        }
      }
    });
    this.$el.addEventListener('mousemove', (e) => {
      if (ball = this.isAxios({
          x: e.x,
          y: e.y,
          r: 5
        })) {
        if (this.cbs && this.cbs.mousemove && this.cbs.mousemove.length) {
          this.cbs.forEach((cb) => {
            cb(ball);
          })
          this.clearCanvas();
          balls.forEach(ball => {
            this.draw(ball);
          })
        }
      }
    });
  },
  createBall(r) {
    let ball;
    count = 0;
    while (this.isAxios(ball = this.getPrefix(r), r) && count < 200) {
      count++;
    }
    return ball;
  },
  getPrefix(r) {
    let x = 0;
    let y = 0;
    x = 80 + Math.random() * (this.$w - 160);
    y = 80 + Math.random() * (this.$h - 160);
    return {
      x,
      y,
      r
    }
  },
  isAxios(circle) {
    var len = this.balls.length;
    let axiosBall;
    for (var i = 0; i < len; i++) {
      var x1 = this.balls[i].x;
      var y1 = this.balls[i].y;
      var r1 = this.balls[i].r;
      var x2 = circle.x;
      var y2 = circle.y;
      var r2 = circle.r;
      if ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) < (r2 + r1) * (r2 + r1)) {
        axiosBall = this.balls[i];
      }
    }
    return axiosBall;
  },
  clearCanvas() {
    this.$el.height = this.$h
  },
  getInfo() {
    return {
      el: this.$el,
      width: this.$w,
      height: this.$h
    }
  },
  draw(ball) {
    this.$ctx.beginPath();
    this.$ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
    this.$ctx.stroke();
    this.$ctx.fillStyle = ball.color;
    this.$ctx.fill();
    this.$ctx.fillStyle = '#fff';
    this.$ctx.fillText(ball.data.name, ball.x - ball.r / 2, ball.y)
  },
}
