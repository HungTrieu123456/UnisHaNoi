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
});

function handleClickTitle(_this) {
  var $flags = $(_this).siblings(".wrap-list-flag");
  if ($flags.length > 0) {
    $flags.remove();
  } else {
    $(_this)
      .parent()
      .append(listFlagTemplate($(_this).attr("title-name")));
  }
}

function listFlagTemplate(regionName) {
  var flagTemplate = `<div class="wrap-flag"><div class="flag" style="background: url('./assets/images/Flag/{0}.png') no-repeat center; background-size: 100%;">
                    </div></div>`;
  var flagHTML = "";

  var countries = dataCountry.find((x) => x.RegionName == regionName);
  if (countries) {
    countries.Countries.forEach((country) => {
      flagHTML += flagTemplate.format(country.Name);
    });
  }

  return `<div class="wrap-list-flag">
          {0}
  </div>`.format(flagHTML);
}
