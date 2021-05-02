adjustClient();

$(document).ready(function () {
  $(window).resize(() => {
    adjustClient();
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
