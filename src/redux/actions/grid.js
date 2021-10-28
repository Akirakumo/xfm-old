import { UPDATAGUTTER, UPDATAVGUTTER, UPDATACOLUMN } from '../constant'


export const updataGutter = data => ({ type: UPDATAGUTTER, data })
export const updataVGutter = data => ({ type: UPDATAVGUTTER, data })
export const updataColumn = data => ({ type: UPDATACOLUMN, data })
export const updataItemSize = data => ({ type: UPDATACOLUMN, data })