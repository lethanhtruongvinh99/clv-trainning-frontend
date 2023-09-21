export const leftSideMenuArray = [
  {
    index: '1',
    path: '/user',
  },
  {
    index: 2,
    path: '/vessel'
  }
]

export const getInitialTab = (pathname: string) => {
  if (pathname.includes('/user')) {
    return ['1']
  }
  return ['2']
}