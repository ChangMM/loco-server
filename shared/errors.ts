export enum Types {
  DefaultType = 'DefaultType',
  ObjectNotExist = 'ObjectNotExist',
  ObjectsIsEmpty = 'ObjectsIsEmpty',
  ObjectUpdateFail = 'ObjectUpdateFail',
  ObjectCreateFail = 'ObjectCreateFail',
  ObjectDeleteFail = 'ObjectDeleteFail',
  SortErorr = 'SortErorr',
  Unauthorized = 'Unauthorized',
  ParameterInvalid = 'ParameterInvalid',
  DbError = 'DbError',
}

/**
 * 异常映射表
 */
export const errors = {
  EmailInvalid: {
    code: 'EmailInvalid',
    type: Types.ParameterInvalid,
    message: '邮箱不正确',
  },

  PasswordInvalid: {
    code: 'PasswordInvalid',
    type: Types.ParameterInvalid,
    message: '密码不正确',
  },

  OldPasswordInvalid: {
    code: 'OldPasswordInvalid',
    type: Types.ParameterInvalid,
    message: '原密码不正确',
  },

  ObjectNotExit: {
    code: 'ObjectNotExit',
    type: Types.DefaultType,
    message: '数据已经存在',
  },
  TokenError: {
    code: 'TokenError',
    type: Types.DefaultType,
    message: 'token有误',
  },
  AuthFail: {
    code: 'AuthFail',
    type: Types.DefaultType,
    message: '校验失败，不具备操作该数据权限',
  },

  UnauthorizedQueryEndpoint: {
    code: 'UnauthorizedQueryEndpoint',
    type: Types.Unauthorized,
    message: '无接口权限',
  },

  EmailExist: {
    code: 'EmailExist',
    type: Types.DefaultType,
    message: '该邮箱已注册',
  },

  PhoneNoInvalid: {
    code: 'PhoneNoInvalid',
    type: Types.ParameterInvalid,
    message: '手机号码有误',
  },

  CaptchaInvalid: {
    code: 'CaptchaInvalid',
    type: Types.ParameterInvalid,
    message: '验证码有误',
  },

  UserNotExist: {
    code: 'UserNotExist',
    type: Types.ObjectNotExist,
    message: '用户不存在',
  },

  GetMiniProgramAccessTokenFail: {
    code: 'GetMiniProgramAccessTokenFail',
    type: Types.DefaultType,
    message: '获取小程序平台 accessToken 出错',
  },

  MiniProgramContentUnsafety: {
    code: 'MiniProgramContentUnsafety',
    type: Types.DefaultType,
    message: '小程序平台内容审查不通过',
  },

  MiniProgramImageUnsafety: {
    code: 'MiniProgramImageUnsafety',
    type: Types.DefaultType,
    message: '图片违规',
  },

  NoUploadedFile: {
    code: 'NoUploadedFile',
    type: Types.DefaultType,
    message: '没有接收到上传的文件',
  },

  CellForMutateNotExist: {
    code: 'CellForMutateNotExist',
    type: Types.DefaultType,
    message: '未找到要更新的单元格',
  },

  MemberAlreadyExist: {
    code: 'MemberAlreadyExist',
    type: Types.DefaultType,
    message: '该成员已存在',
  },
}
