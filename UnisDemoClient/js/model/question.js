class Question {
  constructor(backgroundHeight, backgroundWidth, question) {
    this.top = "0px";
    this.left = "0px";
    if (!question) {
      return;
    }
    this.done = question.Done;
    this.name = question.Name;
    if (question.Position) {
      this.top = backgroundHeight * question.Position.RatioY;
      this.left = backgroundWidth * question.Position.RatioX;
    }
  }

  getAnswerHTML(answerType) {
    return `<div class="answer answer-${answerType}" style="top: ${this.top}px; left: ${
      this.left
    }px;" name="${this.name}">
                  <span class="check-${answerType} ${this.done ? "" : "display-none"}"></span>
                </div>`;
  }
}
