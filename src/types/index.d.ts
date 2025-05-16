declare module '*.svg?react' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>
  export default content
}

interface ApiRes<T> {
  code: number
  msg: string
  data: T
}
