import qs from 'qs'

// 形式1： ids=1&ids=2&id=3
// qs.stringify({ids: [1, 2, 3]}, { indices: false })
//
// 形式2： ids[0]=1&aids1]=2&ids[2]=3
// qs.stringify({ids: [1, 2, 3]}, {arrayFormat: 'indices'})
//
// 形式3：ids[]=1&ids[]=2&ids[]=3
// qs.stringify({ids: [1, 2, 3]}, {arrayFormat: 'brackets'})
//
// 形式4： ids=1&ids=2&id=3
// qs.stringify({ids: [1, 2, 3]}, {arrayFormat: 'repeat'})

// 将数组类型的参数转换为URL参数形式
export function arrayParamToUrlFormat(param, format) {
  if (format === 1) {
    return qs.stringify(param, {indices: false});
  } else if (format === 2) {
    return qs.stringify(param, {arrayFormat: 'indices'});
  } else if (format === 3) {
    return qs.stringify(param, {arrayFormat: 'brackets'});
  } else {
    return qs.stringify(param, {arrayFormat: 'repeat'});
  }
}


