let onZone = false;
let isMuted = false;

function setSizeZoneElement() {
  const imgBackground = $(".zone .img-background");
  imgBackground.height(imgBackground.height());
  imgBackground.width(imgBackground.width());
  $(".icons").width(imgBackground[0].width);
  $(".popup").width(imgBackground[0].width);
  $(".popup").height(imgBackground[0].height);
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
    template += `<li name="${question.Name}" class="${question.Done ? "question-done" : ""
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
                          <span class="btn home"></span>
                          <span class="btn bonus"></span>
                          <span class="btn next"></span>
                          <div class="animation-wrap">
                            <img style="width: auto;
                            height: 124%;
                            margin-left: -96px;
                            margin-top: -16px;" src="./asset/gif/Phelix_Animation.gif ">
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

function setSoundState() {
  if (isMuted) {
    $(".sound-on").addClass("display-none");
    $(".sound-off").removeClass("display-none");
  } else {
    $(".sound-off").addClass("display-none");
    $(".sound-on").removeClass("display-none");
  }
}

function adjustClientMain() {
  const imgBackground = $(".main .img-background");
  imgBackground.height(imgBackground.height());
  imgBackground.width(imgBackground.width());
}

function adjustClientZone() {
  setSizeZoneElement();

  setSoundState();

  setAnswerPosition();

  setQuestionFrame();

  setScoreFrame();
}
