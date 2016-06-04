this.state.buildQA("Save?",
                   "phm_normal",
                   "slot 1",
                   "slot 2",
                   "slot 3",
                   "nah");
~

if (this.value == 4)
{
  this.state.buildTextbox("Purple Hat Man",
                          "ok",
                          "phm_normal");
}
else
{
  this.saveGame(this.value);
}
