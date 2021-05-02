const imgBackground = document.querySelectorAll(".img-background")[0];

function setSizeElement() {
  imgBackground.height = innerHeight;
  $(".icons").width(imgBackground.width);
}

function setAnswerPosition() {
  $(".zone .answer").remove();
  const questions = questionsMoc;
  if (!questions) {
    return;
  }
  questions.forEach((question) => {
    const qs = new Question(
      imgBackground.height,
      imgBackground.width,
      question
    );

    $(".zone").append(qs.getAnswerHTML());
  });
}

function setScoreFrame() {
    const total = questionsMoc.length;
    const totalCompleted = questionsMoc.filter(x => x.Done).length;
    $(".score .count-text .text").text(`${totalCompleted}/${total}`);
}

function adjustClient() {
  setSizeElement();

  setAnswerPosition();

  setScoreFrame();
}
