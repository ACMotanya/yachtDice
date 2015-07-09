describe("Player", function() {
  it("lets you set its number", function() {
    var player = Object.create(Player);
    player.setNumber(1);
    player.number.should.equal(1);
  });
  
  it("starts out with 0 points", function() {
    var player = Object.create(Player);
    player.score.should.equal(0);
  });
  
  it("lets you add points to its score", function() {
    var player = Object.create(Player);
    player.addPoints(5);
    player.score.should.equal(5);
  });
});

describe("Game", function() {
  describe("createPlayers", function() {
    it("creates players", function() {
      var game = Object.create(Game);
      game.createPlayers(2);
      game.players.length.should.equal(2);
    });
    
    it("sets the current payer after creating players", function() {
      var game = Object.create(Game);
      game.createPlayers(1);
      player = game.players[0];
      game.currentPlayer.should.equal(player);
    });
  });
  
  describe("nextPlayer", function() {
    it("changes the player to the next player", function() {
      var game = Object.create(Game);
      game.createPlayers(2);
      var oldCurrentPlayer = game.currentPlayer;
      var newCurrentPlayer = game.players.filter(function(player) {
        return player !== oldCurrentPlayer;
      }).pop();
      game.nextPlayer();
      game.currentPlayer.should.equal(newCurrentPlayer);
    });
  });
  
  describe("over", function() {
    it("is not over if no player has at least 100 points", function() {
      var game = Object.create(Game);
      game.createPlayers(1);
      game.over().should.be.false;
    });
    
    it("is over if a player has at least 100 points", function() {
      var game = Object.create(Game);
      game.createPlayers(1);
      player = game.players[0];
      player.addPoints(100);
      game.over().should.be.true;
    });
  });
  
  describe("winner", function() {
    it("tells you which player has more than 100 points", function() {
      var game = Object.create(Game);
      game.createPlayers(2);
      var winner = game.players[0];
      winner.addPoints(100);
      game.winner().should.equal(winner);
    });
  });

  it("creates players", function() {
    var game = Object.create(Game);
    game.createPlayers(2);
    game.players.length.should.equal(2);
  });
  
  describe("over", function() {
    it("is not over if no player has a least 100 points", function () {
      var game = Object.create(Game);
      game.createPlayers(1);
      game.over().should.be.false;
    });
    
    it("is over if a player has at least 100 points", function () {
      var game = Object.create(Game);
      game.createPlayers(1);
      player = game.players[0];
      player.addPoints(100);
      game.over().should.be.true;
    });
  });
});

describe("Turn", function() {
  it("lets you set the player for the turn", function() {
    var turn = Object.create(Turn);
    var player = Object.create(Player);
    turn.setPlayer(player);
    turn.player.should.equal(player);
  });

  it("starts with 0 points", function() {
    var turn = Object.create(Turn);
    turn.points.should.equal(0);
  });
  
  describe("roll", function() {
    it("adds the roll to the points if you roll anything but a 1", function() {
      var turn = Object.create(Turn);
      sinon.stub(Die, 'roll').returns(6);
      turn.roll();
      turn.points.should.equal(6);
      Die.roll.restore();
    });
    
    it("sets its points to 0 if you roll a 1", function() {
      var turn = Object.create(Turn);
      sinon.stub(Die, 'roll').returns(1);
      turn.roll();
      turn.points.should.equal(0);
      Die.roll.restore();
    });
    
    it("is over if you roll a 1", function() {
      var turn = Object.create(Turn);
      sinon.stub(Die, 'roll').returns(1);
      turn.roll();
      turn.over.should.be.true;
      Die.roll.restore();
    });
    
    it("add the roll to the points if you roll anything but a 1", function () {
      var turn = Object.create(Turn);
      sinon.stub(Die, 'roll').returns(6);
      turn.roll();
      turn.points.should.equal(6);
      Die.roll.restore();
    });
    
    it("returns the value of the roll", function() {
      var turn = Object.create(Turn);
      sinon.stub(Die, 'roll').returns(6);
      turn.roll().should.equal(6);
      Die.roll.restore();
    });
  });
  
  it("adds its points to the player's score if you hold", function() {
    var turn = Object.create(Turn);
    var player = Object.create(Player);
    turn.setPlayer(player);
    sinon.stub(Die, 'roll').returns(6);
    turn.roll();
    turn.hold();
    player.score.should.equal(6);
    Die.roll.restore();
  });
  
  it("is over if you hold", function() {
    var turn = Object.create(Turn);
    var player = Object.create(Player);
    turn.setPlayer(player);
    turn.hold();
    turn.over.should.equal(true);
  });
});

describe("Die", function() {
  it("returns a value when you roll it", function() {
    var die = Object.create(Die);
    sinon.stub(Math, 'random').returns(1);
    die.roll().should.equal(6);
    Math.random.restore();
  });
});