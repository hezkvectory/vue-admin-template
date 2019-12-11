
const PermissionSchema = require('../db/models').PermissionSchema

// 权限list转成tree
const filterArray = (data, p_id) => {
  let tree = [];
  let temp;
  for (let i = 0; i < data.length; i++) {
    if (data[i].p_id == p_id) {
      let obj = data[i];
      temp = filterArray(data, data[i]._id);
      if (temp.length > 0) {
        obj.children = temp;
      }
      tree.push(obj);
    }
  }
  return tree;
}

// 通过权限ids拿到权限树
const getPermissionTreeByPermissionIds = ids => {
  return new Promise((resolve, reject) => {
    PermissionSchema.find((err, permissionList) => {
      if (err) {
        reject(err)
        return
      }
      let permissions = permissionList.filter(ele => ids.indexOf(ele._id) > -1)
      let permissionIds = []
      permissions.forEach(ele => {
        if (ele.p_id != null && permissionIds.indexOf(ele.p_id)) {
          permissionIds.push(ele.p_id)
        }
        if (permissionIds.indexOf(ele._id + "")) {
          permissionIds.push(ele._id + "")
        }
      })
      let allPermissions = permissionList.filter(ele => permissionIds.indexOf(ele._id + "") > -1)
      let tree = filterArray(JSON.parse(JSON.stringify(allPermissions)))
      resolve(tree)
    }).sort({ index: 1 })
  })

}

exports.filterArray = filterArray
exports.getPermissionTreeByPermissionIds = getPermissionTreeByPermissionIds

