module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [

    //代码约束
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // Expected indentation of 2 spaces but found 4 解决方案如下
    'indent':['off',2]
    // 'semi':'off' 自定义规则，；不报错。改配置文件需重启服务
  }
}
