var game = {
  set: function (id, value) {
    var node = document.getElementById(id);
    if (!node) return;
    node.textContent = value;
  },
  bind: function (id, variable) {
    this.__variables[variable] = id;

    this.set(id, variable);
  },
  __variables: {}
}
