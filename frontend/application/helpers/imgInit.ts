
export const imgRout = (img:string) => {
  return (process.env.NODE_ENV === 'development')
    ? `${process.env.NEXT_PUBLIC_STATIC}/static/${img}`
    : `/static/shop/${img}`
}