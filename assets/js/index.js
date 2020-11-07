if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != "undefined" ? args[number] : match;
    });
  };
}

$(document).ready(function () {
  $(".background-content .item .title").on("click", function (event) {
    handleClickTitle(this);
  });

  $("body").on("hover", ".wrap-flag", function () {
    if ($(this).is(":hover")) {
      $(".wrap-flag").css({
        opacity: 0.5,
      });

      $(this).css({
        opacity: 1,
      });

      $(this).append(toolTipTemplate(this));

      var $tooltipBox = $(this).find(".wrap-tooltip");
      if ($tooltipBox.length == 0) {
        return;
      }
      $tooltipBox.css({
        top: `-${$tooltipBox.outerHeight() - 10}px`,
        left: `-${$tooltipBox.outerWidth() / 2 - 30}px`,
      });
    } else {
      $(this).find(".wrap-tooltip").remove();
      $(".wrap-flag").css({
        opacity: 1,
      });
    }
  });
});

function handleClickTitle(_this) {
  if ($(_this).siblings(".wrap-list-flag").length > 0) {
    $(".title-region-active").removeClass("title-region-active");
    $(".wrap-list-flag").remove();
    return;
  }

  $(".title-region-active").removeClass("title-region-active");
  $(".wrap-list-flag").remove();
  $(_this).addClass("title-region-active");
  $(_this)
    .parent()
    .append(listFlagTemplate($(_this).attr("title-name")));
}

function listFlagTemplate(regionName) {
  var flagTemplate = `<div class="wrap-flag" title-flag="{1}" link-doc='{2}'><div class="flag" style="background: url('./assets/images/Flag/{0}.png') no-repeat center; background-size: 100%;">
                    </div></div>`;
  var flagHTML = "";

  var countries = dataCountry.find((x) => x.RegionName == regionName);
  if (countries) {
    countries.Countries.forEach((country) => {
      flagHTML += flagTemplate.format(
        country.ImageName,
        country.ToolTip,
        country.LinkDoc
      );
    });
  }

  return `<div class="wrap-list-flag" style="flex-direction: {1}">
            {0}
          </div>`.format(
    flagHTML,
    countries.FlexType ? countries.FlexType : "row"
  );
}

function toolTipTemplate(_this) {
  return `<div class="wrap-tooltip">
            <span class="name">{0}</span>
            <a class="link-doc" href="{1}" target="_blank">(Click to learn more)</a>
          </div>`.format(
    $(_this).attr("title-flag"),
    $(_this).attr("link-doc")
  );
}
