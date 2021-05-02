class Question {
  constructor(backgroundHeight, backgroundWidth, question) {
    this.top = "0px";
    this.left = "0px";
    if (!question) {
      return;
    }
    this.name = question.Name;
    if (question.Position) {
      this.top = backgroundHeight * question.Position.RatioY;
      this.left = backgroundWidth * question.Position.RatioX;
    }
  }

  getAnswerHTML() {
    return `<div class="answer" style="top: ${this.top}px; left: ${this.left}px;" name="${this.name}">
                  <span class="check display-none"></span>
                </div>`;
  }
}
