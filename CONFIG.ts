(() => {
  const CONFIG = {
    DELAY: 4000,
    SCROLL_TO_ELEMENT: null,
    DELETE_ELEMENTS: [
      ".sidebar",
      ".view",
      ".navbar",
      ".header",
      '[id^="google_ads_iframe"]',
      ".native-ad.ic-inserted.ic-refresh"
    ],
    get(prop) {
      return $ && $(this[prop]);
    }
  };

  if (!$) {
    var jq = document.createElement("script");
    jq.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    document.getElementsByTagName("head")[0].appendChild(jq);
    // ... give time for script to load, then type (or see below for non wait option)
    jQuery.noConflict();
  }

  // RUN CODE
  setTimeout(() => {
    console.clear();

    // DELETE ELEMENTS
    CONFIG.DELETE_ELEMENTS && deleteElements(CONFIG.DELETE_ELEMENTS);

    // SCROLL TO THE ELEMENT
    CONFIG.SCROLL_TO_ELEMENT && scrollTo(CONFIG.get("SCROLL_TO_ELEMENT"));

    $("#map").css("width", "100%");
    $("#body").css("width", "100%");
    $("#body .chart").css("width", "100%");

    $(".content-view-map").css("margin-left", "0");
    $(".container.is-wide").css("max-width", "none!important");
    $(".container.is-wide").removeClass("container is-wide");
  }, CONFIG.DELAY);

  // DELETE ELEMENTS
  function deleteElements(ELS = []) {
    document.body.click;

    for (const el of ELS) {
      $(el) && $(el).remove();
    }
  }

  // SCROLL TO ELEMENT
  function scrollTo(ELEMENT) {
    // scroll to game
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: ELEMENT.offset().top - 80
      },
      500
    );
  }
})();
