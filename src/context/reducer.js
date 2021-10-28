import {
  UPDATA_USERNAME,
  UPDATA_GUTTER,
  UPDATA_VGUTTER,
  UPDATA_COLUMN,
} from './constant'

const reducer = (state, action) => {

  const { type, data } = action

  switch (type) {

    case UPDATA_USERNAME:
      return Object.assign({}, state, { username: data })

    case UPDATA_GUTTER:
      return Object.assign({}, state, { gutter: data })

    case UPDATA_VGUTTER:
      return Object.assign({}, state, { vgutter: data })

    case UPDATA_COLUMN:
      return Object.assign({}, state, { column: data })

    default:
      return state;
  }
}

export default reducer
