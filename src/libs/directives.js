/**
 * 自定义指令
 * 通过 v-键名 使用对应的自定义指令
 * @type {{focus: {inserted: directives.focus.inserted}}}
 */
const directives = {
  focus: { // 自动获取焦点
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
      let elm = el.nodeName === 'INPUT' ? el : el.getElementsByTagName('input')[0];
      // 聚焦元素
      elm.focus()
    }
  }
};

/**
 * 注册自定义指令
 * @param vue
 */
const directive = function (vue) {
  for (let key in directives) {
    vue.directive(key, directives[key])
  }
};

export default directive;
