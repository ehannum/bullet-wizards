var binder = {
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

var page = 0;

document.getElementById('spider').addEventListener('click', function () {
  alert(document.getElementById('spider').dataset.char);
});

document.getElementById('prev').addEventListener('click', function () {
  if (page === 0) return;
  page--;
  document.getElementById('book').setAttribute('style', 'margin-left:-' + page*100 + 'vw');
});
document.getElementById('next').addEventListener('click', function () {
  if (page === 2) return;
  page++;
  document.getElementById('book').setAttribute('style', 'margin-left:-' + page*100 + 'vw');
});
