module.exports = function (source) {
  //动态生成style标签，css放入style标签内，style标签放入head标签里
  return `const tag = document.createElement('style');
  tag.innerHTML = ${source};
  document.head.appendChild(tag)`;
};
