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
var grabbed = [];

var buzzer = new Audio('sounds/buzzer-long.mp3');
var touhou = new Audio('sounds/2hu.mp3');

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
  if (players.length < 2) return;
  gotoPage(1);
  selectPlayers();
  countdown();

  buzzer.pause();
  buzzer.currentTime = 0;
});

// GRAB TOKEN SCREEN

document.getElementById('cancel').addEventListener('click', function () {
  touhou.pause();
  resetRound();
});

document.getElementById('safe').addEventListener('click', function (e) {
  if(e.target && e.target.dataset.char) {
    tokenGrab(e.target);
  }

  if (grabbed.length === players.length-1) {
    for (var i = 0; i < players.length; i++) {
      if (grabbed.indexOf(players[i]) === -1) {
        damagePlayer(players[i]);
        break;
      }
    }
  }
});

binder.bind('cdown', 0);

var countdown = function () {
  document.getElementById('countdown').setAttribute('style', 'display:block');

  (function tick (n) {
    if (n === 0) {
      document.getElementById('countdown').removeAttribute('style');
      touhou.currentTime = Math.floor(Math.random()*450+1);
      touhou.play();
    } else {
      // todo: play some timer sound
      binder.set('cdown', n);
      setTimeout(function(){tick(n-1)}, 1000);
    }
  })(3);
};

var tokenGrab = function (element) {
  var char = parseInt(element.dataset.char);

  if (grabbed.indexOf(char) === -1) {
    element.innerHTML = '<img class="selected" src="img/haste.png" />';
    grabbed.push(char);
  }
};

var damagePlayer = function (player) {
  var icons = document.getElementsByClassName('safe');

  touhou.pause();
  buzzer.play();

  for (var i = 0; i < icons.length; i++) {
    if (icons[i].dataset.char == player) {
      icons[i].innerHTML = '<img class="selected" src="img/hit.gif" />';
    }
  }

  setTimeout(resetRound, 1500);
};

var resetRound = function () {
  var icons = document.getElementsByClassName('safe');

  for (var i = 0; i < icons.length; i++) {
    icons[i].innerHTML = '';
  }

  grabbed = [];
  gotoPage(0);
};
