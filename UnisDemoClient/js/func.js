function setSizeElement() {
  const imgBackground = document.querySelectorAll(".zone .img-background")[0];
  imgBackground.height = innerHeight;
  $(".icons").width(imgBackground.width);
  $(".popup").width(imgBackground.width);
  $(".popup").height(imgBackground.height);
}

function setAnswerPosition() {
  const imgBackground = document.querySelectorAll(".zone .img-background")[0];
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
  const totalCompleted = questionsMoc.filter((x) => x.Done).length;
  $(".score .count-text .text").text(`${totalCompleted}/${total}`);
}

function createQuestionTemplate(questions) {
  let template = ``;
  if (!questions) {
    return;
  }
  questions.forEach((question) => {
    template += `<li name="${question.Name}" class="${
      question.Done ? "question-done" : ""
    }">${question.Content}</li>`;
  });
  return `<ul>${template}</ul>`;
}

function setQuestionFrame() {
  const questions = questionsMoc;
  $(".question-form .question-text ul").remove();

  $(".question-form .question-text").append(createQuestionTemplate(questions));
}

function showCongratulationForm() {
  $(".zone .congratulation-form").remove();
  const template = `<div class="popup congratulation-form">
                      <div class="frame">
                          <span class="btn close"></span>
                          <span class="btn home"></span>
                          <span class="btn bonus"></span>
                          <span class="btn next"></span>
                          <div class="animation-wrap">
                              <video autoplay class="animation" loop>
                            <source src="https://cdn.dribbble.com/users/738799/screenshots/14197020/media/f762a2164cc92f749e07161fdafada49.mp4" type="video/mp4"></video>
                          </div>
                      </div>
                      <div class="mask"></div>
                    </div>`;

  $(".zone").append(template);
  const imgBackground = document.querySelectorAll(".zone .img-background")[0];
  $(".popup").width(imgBackground.width);
  $(".popup").height(imgBackground.height);
}

function showBonusForm() {
  $(".zone .bonus-form").remove();
  const template = `<div class="popup bonus-form">
                      <div class="frame">
                        <span class="btn close"></span>
                        <span class="btn home"></span>
                        <span class="btn next"></span>
                      </div>
                      <div class="mask"></div>
                    </div>`;
  $(".zone").append(template);
  const imgBackground = document.querySelectorAll(".zone .img-background")[0];
  $(".popup").width(imgBackground.width);
  $(".popup").height(imgBackground.height);
}

function restartZone() {
  $(".question-form .question-text ul").remove();
  $(".zone .congratulation-form").remove();
  $(".zone .bonus-form").remove();
  questionsMoc.forEach((question) => {
    question.Done = false;
  });
}

function adjustClientZone() {
  setSizeElement();

  setAnswerPosition();

  setQuestionFrame();

  setScoreFrame();
}
