import chalkWorker from 'chalk-animation';
// 声明 2 个⽐赛队员
const rabbit = '兔⼦'
const turtle = '乌⻳'
// 声明⼀坨变量，作为赛道起点终点字符串
const start = '|'
const end = '》'
// 赛道上⼀⽶⼀⽶的距离，⽤ . 表示
const pad = '.'
// 速度是 1 ⽶/150 毫秒
const speed = 1
// 赛道⼀共有 50 ⽶
const steps = 50
// 约定兔⼦在 42 ⽶的时候停下
const stopAt = 42
// 判断兔⼦是否停下
let stoped = false
// 默认从 0 开始轮询
let t = 0
// ⼀个定时器的句柄⽽已
let timer
// 计算兔⼦距离终点
const getRabbitLastSteps = () => {
  return steps - t * speed - t * speed * 3
}
// 计算乌⻳距离终点
const getTurtleLastSteps = () => {
  return steps - t * speed
}
// 计算⻳兔间距
const getGapSteps = () => {
  return stopAt - t * speed
}
// 初始赛道状态
const checkRaceInitState = () => {
  return `${rabbit}${turtle}${start}${pad.repeat(steps)}${end}`;
}
// 兔⼦领先时的赛道状态
const checkRaceState = () => {
  return `${start}${pad.repeat(t * speed)}${turtle}${pad.repeat(t * speed * 3)}${rabbit}${pad.repeat(getRabbitLastSteps())}${end}`
}
// 分情况计算赛道的实时状态
const checkBackRaceState = () => {
  if (getGapSteps() <= 0) {
    if (getTurtleLastSteps() === 0) {
      return `${start}${pad.repeat(stopAt)}${rabbit}${pad.repeat(steps - stopAt)}${end}${turtle}`;
    } else {
      return `${start}${pad.repeat(stopAt)}${rabbit}${pad.repeat(t * speed -stopAt)}${turtle}${pad.repeat(getTurtleLastSteps())}${end}`;
    }
  } else {
    return `${start}${pad.repeat(t * speed)}${turtle}${pad.repeat(getGapSteps())}${rabbit}${pad.repeat(steps - stopAt)}${end}`;
  }
}
// 等待时间，把定时器包装秤⼀个 Promise
const wait = (sec) => new Promise(resolve => setTimeout(() => resolve(), sec))
// 可以⽀持特效刷新的命令⾏⽇志模块

const initState = checkRaceInitState()
const racing = chalkWorker.rainbow(initState)
const updateRaceTrack = (state) => {
racing.replace(state)
}
const race = () => {
timer = setInterval(() => {
// 判断是否兔⼦停下
if (!stoped) {
if (getRabbitLastSteps() <= (steps -
stopAt)) {
stoped = true
}
}
if (stoped) {
let state = checkBackRaceState()
updateRaceTrack(state)
if (getTurtleLastSteps() === 0) {
// 乌⻳过线后就停⽌定时器
clearInterval(timer)
return
}
} else {
let state = checkRaceState()
updateRaceTrack(state)
}
t++
}, 150);
}
// 等待 20 秒再开始启动⽐赛
wait(2000).then(() => {
  race()
})
