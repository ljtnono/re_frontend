<template>
  <!-- 404/500 小游戏的贪吃蛇 -->
  <div class="mini-game">
    <div class="game-header">
      <span class="game-title">
        <i class="fa fa-gamepad" />
        等不及了？来局贪吃蛇
      </span>
      <div class="game-actions">
        <span class="game-score">得分：{{ score }}</span>
        <span class="game-score">最高：{{ best }}</span>
        <button class="game-btn" @click="restart">
          <i class="fa fa-refresh" />
          重来
        </button>
      </div>
    </div>

    <div class="game-body">
      <canvas ref="canvas" :width="canvasSize" :height="canvasSize" class="game-canvas" />

      <!-- 开始遮罩 -->
      <div class="game-overlay" v-if="status === 'ready'">
        <p class="overlay-text">准备好了吗？</p>
        <button class="game-btn primary" @click="start">
          <i class="fa fa-play" />
          开始游戏
        </button>
        <p class="overlay-tip">方向键 / WASD 控制，空格暂停</p>
      </div>

      <!-- 结束遮罩 -->
      <div class="game-overlay" v-if="status === 'over'">
        <p class="overlay-text">游戏结束，得分 {{ score }}</p>
        <button class="game-btn primary" @click="restart">
          <i class="fa fa-refresh" />
          再来一局
        </button>
      </div>

      <!-- 暂停遮罩 -->
      <div class="game-overlay" v-if="status === 'paused'">
        <p class="overlay-text">已暂停</p>
        <button class="game-btn primary" @click="togglePause">
          <i class="fa fa-play" />
          继续
        </button>
      </div>
    </div>

    <!-- 移动端方向键 -->
    <div class="game-pad">
      <button class="pad-btn" @click="setDirection('up')"><i class="fa fa-chevron-up" /></button>
      <div class="pad-middle">
        <button class="pad-btn" @click="setDirection('left')"><i class="fa fa-chevron-left" /></button>
        <button class="pad-btn center" @click="togglePause"><i class="fa" :class="status === 'paused' ? 'fa-play' : 'fa-pause'" /></button>
        <button class="pad-btn" @click="setDirection('right')"><i class="fa fa-chevron-right" /></button>
      </div>
      <button class="pad-btn" @click="setDirection('down')"><i class="fa fa-chevron-down" /></button>
    </div>
  </div>
</template>

<script>
const GRID_COUNT = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 160;

export default {
  name: "MiniGame",
  data() {
    return {
      canvasSize: GRID_COUNT * CELL_SIZE,
      status: "ready", // ready | playing | paused | over
      snake: [],
      direction: "right",
      nextDirection: "right",
      food: null,
      score: 0,
      best: parseInt(window.localStorage.getItem("snake_best") || "0"),
      timer: null,
      speed: INITIAL_SPEED
    };
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
    this.initGame();
    this.bindKeys();
  },
  beforeDestroy() {
    this.clearTimer();
    this.unbindKeys();
  },
  methods: {
    initGame() {
      this.snake = [
        {x: 9, y: 10},
        {x: 8, y: 10},
        {x: 7, y: 10}
      ];
      this.direction = "right";
      this.nextDirection = "right";
      this.score = 0;
      this.speed = INITIAL_SPEED;
      this.spawnFood();
      this.draw();
    },
    start() {
      this.status = "playing";
      this.loop();
    },
    restart() {
      this.clearTimer();
      this.initGame();
      this.status = "playing";
      this.loop();
    },
    togglePause() {
      if (this.status === "playing") {
        this.status = "paused";
        this.clearTimer();
      } else if (this.status === "paused") {
        this.status = "playing";
        this.loop();
      }
    },
    loop() {
      this.clearTimer();
      this.timer = setInterval(() => {
        this.tick();
      }, this.speed);
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    tick() {
      this.direction = this.nextDirection;
      let head = {...this.snake[0]};
      switch (this.direction) {
      case "up": head.y -= 1; break;
      case "down": head.y += 1; break;
      case "left": head.x -= 1; break;
      case "right": head.x += 1; break;
      }

      // 撞墙或撞到自己
      if (head.x < 0 || head.x >= GRID_COUNT || head.y < 0 || head.y >= GRID_COUNT ||
          this.snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        this.gameOver();
        return;
      }

      this.snake.unshift(head);

      // 吃到食物
      if (this.food && head.x === this.food.x && head.y === this.food.y) {
        this.score += 10;
        if (this.score > this.best) {
          this.best = this.score;
          window.localStorage.setItem("snake_best", String(this.best));
        }
        this.spawnFood();
        // 加速
        if (this.speed > 70) {
          this.speed -= 3;
          this.loop();
        }
      } else {
        this.snake.pop();
      }

      this.draw();
    },
    spawnFood() {
      let f = {
        x: Math.floor(Math.random() * GRID_COUNT),
        y: Math.floor(Math.random() * GRID_COUNT)
      };
      let guard = 0;
      while (this.snake.some(seg => seg.x === f.x && seg.y === f.y) && guard < 500) {
        f = {
          x: Math.floor(Math.random() * GRID_COUNT),
          y: Math.floor(Math.random() * GRID_COUNT)
        };
        guard += 1;
      }
      this.food = f;
    },
    draw() {
      const ctx = this.ctx;
      // 背景
      ctx.fillStyle = "#f7f8fa";
      ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);

      // 棋盘格
      ctx.fillStyle = "#f0f1f4";
      for (let y = 0; y < GRID_COUNT; y++) {
        for (let x = 0; x < GRID_COUNT; x++) {
          if ((x + y) % 2 === 0) {
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          }
        }
      }

      // 食物
      if (this.food) {
        ctx.fillStyle = "#f53f3f";
        ctx.beginPath();
        ctx.arc(
          this.food.x * CELL_SIZE + CELL_SIZE / 2,
          this.food.y * CELL_SIZE + CELL_SIZE / 2,
          CELL_SIZE / 2 - 3,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // 蛇
      this.snake.forEach((seg, i) => {
        if (i === 0) {
          ctx.fillStyle = "#4f46e5";
        } else {
          let ratio = 1 - i / (this.snake.length + 4);
          ctx.fillStyle = `rgba(99, 102, 241, ${0.35 + ratio * 0.65})`;
        }
        let pad = i === 0 ? 1.5 : 2.5;
        this.roundRect(ctx, seg.x * CELL_SIZE + pad, seg.y * CELL_SIZE + pad, CELL_SIZE - pad * 2, CELL_SIZE - pad * 2, 5);
        ctx.fill();
      });
    },
    roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    },
    gameOver() {
      this.status = "over";
      this.clearTimer();
    },
    setDirection(dir) {
      const opposite = {up: "down", down: "up", left: "right", right: "left"};
      if (this.status === "ready") {
        this.start();
      }
      if (this.status !== "playing" && this.status !== "paused") return;
      if (opposite[this.direction] === dir) return;
      this.nextDirection = dir;
    },
    onKeyDown(e) {
      const map = {
        ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
        w: "up", s: "down", a: "left", d: "right",
        W: "up", S: "down", A: "left", D: "right"
      };
      if (map[e.key]) {
        e.preventDefault();
        this.setDirection(map[e.key]);
      } else if (e.key === " ") {
        e.preventDefault();
        if (this.status === "ready" || this.status === "over") {
          this.restart();
        } else {
          this.togglePause();
        }
      }
    },
    bindKeys() {
      this.keyHandler = (e) => this.onKeyDown(e);
      window.addEventListener("keydown", this.keyHandler);
    },
    unbindKeys() {
      window.removeEventListener("keydown", this.keyHandler);
    }
  }
};
</script>

<style scoped lang="scss">
.mini-game {
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: 18px 20px;
  width: 100%;
  box-sizing: border-box;
}

.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;

  .game-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 6px;

    i.fa {
      color: var(--primary);
    }
  }

  .game-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .game-score {
    font-size: 12px;
    color: var(--text-secondary);
    background: var(--bg-page);
    padding: 3px 10px;
    border-radius: 999px;
  }
}

.game-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 26px;
  padding: 0 12px;
  font-size: 12px;
  color: var(--text-regular);
  background: var(--bg-page);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: var(--primary);
    border-color: #c7d2fe;
  }

  &.primary {
    height: 34px;
    padding: 0 18px;
    font-size: 13px;
    color: #fff;
    background: var(--primary);
    border: none;
    border-radius: var(--radius-md);

    &:hover {
      background: var(--primary-dark);
    }
  }
}

.game-body {
  position: relative;
  display: flex;
  justify-content: center;

  .game-canvas {
    display: block;
    width: 100%;
    max-width: 620px;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: #f7f8fa;
  }

  .game-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.82);
    border-radius: var(--radius-md);
    backdrop-filter: blur(2px);

    .overlay-text {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .overlay-tip {
      margin: 0;
      font-size: 12px;
      color: var(--text-placeholder);
    }
  }
}

// 移动端方向键
.game-pad {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: 14px;

  .pad-middle {
    display: flex;
    gap: 6px;
  }

  .pad-btn {
    width: 48px;
    height: 48px;
    font-size: 16px;
    color: var(--text-regular);
    background: var(--bg-page);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    cursor: pointer;

    &:active {
      color: #fff;
      background: var(--primary);
      border-color: var(--primary);
    }

    &.center {
      color: var(--primary);
    }
  }
}

@media screen and (max-width: 768px) {
  .game-pad {
    display: flex;
  }
}
</style>
