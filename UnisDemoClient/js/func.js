let onZone = false;
let isMuted = false;

function setSizeZoneElement() {
  const imgBackground = $(".zone .img-background");
  imgBackground.height(imgBackground.height());
  imgBackground.width(imgBackground.width());

  $(".zone").width(imgBackground.width());
  $(".zone").height(imgBackground.height());
}

function setAnswerPosition(questions) {
  const imgBackground = document.querySelectorAll(".zone .img-background")[0];
  $(".zone .answer").remove();
  if (!questions) {
    return;
  }
  questions.forEach((question) => {
    const qs = new Question(
      imgBackground.height,
      imgBackground.width,
      question
    );

    $(".zone .icons").append(qs.getAnswerHTML("question"));
  });
}

function setBonusAnswerPosition(questions) {
  const imgBackground = document.querySelectorAll(".zone .img-background")[0];
  $(".zone .answer").remove();
  if (!questions) {
    return;
  }
  questions.forEach((question) => {
    const qs = new Question(
      imgBackground.height,
      imgBackground.width,
      question
    );

    $(".zone .icons").append(qs.getAnswerHTML("question-bonus"));
  });
}

function setScoreFrame(questions, isBonus) {
  const total = questions.length;
  const totalCompleted = questions.filter((x) => x.Done).length;
  $(".score .count-text .text").text(`${totalCompleted}/${total}`);
  if (isBonus) {
    $(".score .count-text .check-icon").addClass("display-none");
    $(".score .count-text .check-icon-bonus").removeClass("display-none");

    if (totalCompleted > 0) {
      $(".score .count-text .check-icon-bonus").addClass("animation-jump");
      setTimeout(() => {
        $(".score .count-text .check-icon-bonus").removeClass("animation-jump");
      }, 600);
    }

  } else {
    $(".score .count-text .check-icon-bonus").addClass("display-none");
    $(".score .count-text .check-icon").removeClass("display-none");
  }
}

function createQuestionTemplate(questions) {
  let template = ``;
  if (!questions) {
    return;
  }
  questions.forEach((question, index) => {
    template += `<li name="${question.Name}" class="${
      question.Done ? "question-done" : ""
    }">
      <div>
        ${index + 1}. ${question.Content}
        <div class="text-complete">
          ${question.TextComplete}
        </div>
      </div>
      </li>`;
  });
  return `<ul class="question-wrap">${template}</ul>`;
}

function createBonusQuestionTemplate(questions) {
  let template = ``;
  if (!questions) {
    return;
  }
  questions.forEach((question, index) => {
    template += `<li name="${question.Name}" class="${
      question.Done ? "question-done" : ""
    } bonus-question">
      <div>
        ${question.Content}
      </div>
      </li>`;
  });
  return `<div class="content">
            <div class="bonus-title">
            </div>
            <ul class="bonus-question-wrap">
              ${template}
            </ul>
          </div>`;
}

function setQuestionFrame() {
  const questions = questionsMoc;
  $(".question-form .question-text ul").remove();

  $(".question-form .question-text").append(createQuestionTemplate(questions));
}

function setBonusQuestionFrame(bonusQuestionMoc) {
  $(".question-form .question-text .content").remove();
  if (!bonusQuestionMoc || !bonusQuestionMoc.Detail) {
    return;
  }
  $(".question-form .question-text").append(
    createBonusQuestionTemplate(bonusQuestionMoc.Detail)
  );
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
                            <img src="./asset/gif/Phelix_Animation.gif ">
                          </div>
                      </div>
                      <div class="mask"></div>
                    </div>`;

  $(".zone").append(template);
}

function showCongratulationBonusForm() {
  $(".zone .congratulation-bonus-form").remove();
  const template = `<div class="popup congratulation-bonus-form">
                      <div class="frame">
                          <span class="btn close"></span>
                          <span class="btn home"></span>
                          <span class="btn info"></span>
                          <span class="btn next"></span>
                          <div class="animation-wrap">
                            <img src="./asset/gif/Phelix_Animation.gif ">
                          </div>
                      </div>
                      <div class="mask"></div>
                    </div>`;

  $(".zone").append(template);
}

function showBonusForm() {
  $(".zone .bonus-form").remove();
  const template = `<div class="popup bonus-form">
                      <div class="frame">
                        <span class="btn close"></span>
                      </div>
                      <div class="content-wrap">
                        <div class="content">
                        </div>
                        <span class="btn next"></span>
                      </div>
                      <div class="mask"></div>
                    </div>`;
  $(".zone").append(template);

  bonusPopupQuestions(bonusQuestionMoc);
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

function bonusPopupQuestions(bonusQuestionMoc) {
  let template = ``;
  if (!bonusQuestionMoc || !bonusQuestionMoc.Detail) {
    return;
  }
  bonusQuestionMoc.Detail.forEach((bonusQuestion, index) => {
    template += `<li name="${bonusQuestion.Name}" class="${
      bonusQuestion.Done ? "question-done" : ""
    }">
      <div>
        ${bonusQuestion.Content}
      </div>
      </li>`;
  });

  $(".bonus-form .content ul").remove();

  $(".bonus-form .content").append(`<ul class="bonus-wrap">${template}</ul>`);
}

function adjustClientMain() {
  const imgBackground = $(".main .img-background");
  imgBackground.height(imgBackground.height());
  imgBackground.width(imgBackground.width());
}

function adjustClientZone() {
  setSizeZoneElement();

  setSoundState();

  setAnswerPosition(questionsMoc);

  setQuestionFrame();

  setScoreFrame(questionsMoc, false);
}
