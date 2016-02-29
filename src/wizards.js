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
};

var page = 0;

document.getElementById('prev').addEventListener('click', function () {
  if (page === 0) return;
  gotoPage(page - 1);
});

document.getElementById('next').addEventListener('click', function () {
  if (page === 2) return;
  gotoPage(page + 1);
});

var gotoPage = function (n) {
  page = n;
  document.getElementById('book').setAttribute('style', 'margin-left:-' + n*100 + 'vw');
};

// CHARACTER SELECTION SCREEN

var players = [];

var selectPlayers = function () {
  var buttons = document.getElementsByClassName('safe');
  for (var i = 0; i < buttons.length; i++) {
    var char = parseInt(buttons[i].dataset.char);
    if (players.indexOf(char) === -1) {
      buttons[i].setAttribute('style', 'display:none');
    } else {
      buttons[i].removeAttribute('style');
    }
  }
};

binder.bind('numPlayers', 0);

var togglePlayer = function (element) {
  var char = parseInt(element.dataset.char);

  if (players.indexOf(char) === -1) {
    element.innerHTML = '<img class="selected" src="img/flower-outline-pink.png" />';
    players.push(char);
  } else {
    element.innerHTML = '';
    players.splice(players.indexOf(char), 1);
  }

  binder.set('numPlayers', players.length);
};

document.getElementById('select').addEventListener('click', function (e) {
  if(e.target && e.target.dataset.char) {
    togglePlayer(e.target);
  }
});

document.getElementById('play').addEventListener('click', function () {
  gotoPage(1);
  selectPlayers();
});
