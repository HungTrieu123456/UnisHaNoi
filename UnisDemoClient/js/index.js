$(document).ready(function () {
  if (onZone) {
    adjustClientZone();
  } else {
    adjustClientMain();
  }

  $(window).resize(() => {
    // if (onZone) {
    //   adjustClientZone();
    // }
  });

  $(".zone").on("click", ".answer-question", function ($event) {
    $(this).find(".check-question").removeClass("display-none");

    const questionName = questionsMoc.find(
      (x) => x.Name === $(this).attr("name")
    );
    if (questionName) {
      if (!isMuted) {
        $(".sound-found")[0].play();
      }
      questionName.Done = true;
      setScoreFrame(questionsMoc, false);

      setQuestionFrame();

      if (!questionsMoc.find((x) => !x.Done)) {
        if (!isMuted) {
          $(".sound-congratulation")[0].play();
        }

        showCongratulationForm();
      }
    }
  });

  $(".zone").on("click", ".answer-question-bonus", function ($event) {
    $(this).find(".check-question-bonus").removeClass("display-none");

    const questionName = bonusQuestionMoc.Detail.find(
      (x) => x.Name === $(this).attr("name")
    );
    if (questionName) {
      if (!isMuted) {
        $(".sound-found")[0].play();
      }
      questionName.Done = true;
      setScoreFrame(bonusQuestionMoc.Detail, true);

      setBonusQuestionFrame(bonusQuestionMoc);

      if (!bonusQuestionMoc.Detail.find((x) => !x.Done)) {
        if (!isMuted) {
          $(".sound-congratulation")[0].play();
        }

        showCongratulationBonusForm();
      }
    }
  });

  $(".sound-on").click(function ($event) {
    $(this).addClass("display-none");
    $(".sound-off").removeClass("display-none");
    isMuted = true;
  });

  $(".sound-off").click(function ($event) {
    $(this).addClass("display-none");
    $(".sound-on").removeClass("display-none");
    isMuted = false;
  });

  $(".zone .icons .home").click(function ($event) {
    $(`.zone`).addClass("display-none");
    $(`.main`).removeClass("display-none");
    onZone = false;
  });

  $(".zone-selection").click(function () {
    $(
      `[name='${$(this).attr("zone")}']`
    ).removeClass("display-none");
    $(`.main`).addClass("display-none");
    onZone = true;
    // restartZone();
    adjustClientZone();
  });

  $(".zone").on("click", ".congratulation-form .home", function ($event) {
    $(`.zone`).addClass("display-none");
    $(`.main`).removeClass("display-none");
    onZone = false;
  });

  $(".zone").on("click", ".congratulation-form .bonus", function ($event) {
    $(".congratulation-form").remove();
    showBonusForm();
  });

  $(".zone").on("click", ".bonus-form .home", function ($event) {
    $(`.zone`).addClass("display-none");
    $(`.main`).removeClass("display-none");
    onZone = false;
  });

  $(".zone").on("click", ".congratulation-bonus-form .home", function ($event) {
    $(`.zone`).addClass("display-none");
    $(`.main`).removeClass("display-none");
    onZone = false;
  });

  $(".zone").on("click", ".bonus-form .next", function ($event) {
    $(this).closest(".popup").remove();
    $(".question-form .question-text ul").remove();
    setBonusQuestionFrame(bonusQuestionMoc);
    setScoreFrame(bonusQuestionMoc.Detail, true);
    setBonusAnswerPosition(bonusQuestionMoc.Detail);
  });

  $(".zone").on("click", ".popup .close", function ($event) {
    $(this).closest(".popup").remove();
  });

  $(".zone-selection").mouseenter(function () {
    $(".main .mask").removeClass("display-none");
  });

  $(".zone-selection").mouseleave(function () {
    $(".main .mask").addClass("display-none");
  });

  $(".zone .question-form .phelix").click(function ($event) {
    $(this).siblings(".frame").toggleClass("display-none");
    $(this).siblings(".question-text").toggleClass("display-none");
    $(this).closest(".question-form").toggleClass("size-auto");
    $(this).toggleClass("colapse");
  });
});
