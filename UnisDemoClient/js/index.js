let onZone = false;

$(document).ready(function () {
  if (onZone) {
    adjustClientZone();
  }

  $(window).resize(() => {
    if (onZone) {
      adjustClientZone();
    }
  });

  $(".zone").on("click", ".answer", function ($event) {
    $(this).find(".check").removeClass("display-none");

    const questionName = questionsMoc.find(
      (x) => x.Name === $(this).attr("name")
    );
    if (questionName) {
      questionName.Done = true;
      setScoreFrame();

      setQuestionFrame();

      if (!questionsMoc.find((x) => !x.Done)) {
        showCongratulationForm();
      }
    }
  });

  $(".sound-on").click(function ($event) {
    $(this).addClass("display-none");
    $(".sound-off").removeClass("display-none");
  });

  $(".sound-off").click(function ($event) {
    $(this).addClass("display-none");
    $(".sound-on").removeClass("display-none");
  });

  $(".zone-selection").click(function () {
    $(`[name='${$(this).attr("zone")}']`).removeClass("display-none");
    $(`.main`).addClass("display-none");
    onZone = true;
    restartZone();
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

  $(".zone").on("click", ".popup .close", function ($event) {
    $(this).closest(".popup").remove();
  });
});
