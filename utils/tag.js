
export const tagColor = () => {
  // tag id 对应相应的颜色, 全局统一
  const id = 200
  const color = [
    '#542DE0',
    '#FB6877',
    '#886CFF',
    '#FFA443',
    '#44D7B6',
    '#FDD55C',
    '#83DBFF',
    '#9CE883',
    '#FFD7B6'
  ]
  const tag = {}

  for (let i = 1; i <= id; i++) tag[i] = color[(i - 1) % color.length]
  return tag
}
