adjustClient();

$(document).ready(function () {
  $(window).resize(() => {
    adjustClient();
  });

  $(".sound-on").click(function ($event) {
    $(this).addClass("display-none");
    $(".sound-off").removeClass("display-none");
  });
  $(".sound-off").click(function ($event) {
    $(this).addClass("display-none");
    $(".sound-on").removeClass("display-none");
  });

  $(".zone").on("click", ".answer", function ($event) {
    $(this).find(".check").removeClass("display-none");

    const questionName = questionsMoc.find(
      (x) => x.Name === $(this).attr("name")
    );
    if (questionName) {
      questionName.Done = true;
      setScoreFrame();
    }
  });
});
