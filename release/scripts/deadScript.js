ctx.state.buildTextbox("Game Over","yeah, you suck\nyour score was "+ctx.getScore(),null);
yield;
ctx.state.game.state.start("MainMenu");
