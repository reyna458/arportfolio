

// x button opacity

console.log(document.body.scrollHeight, window.innerHeight);

let scrollScore;

function setupScrollListener() {
  $(window).off("scroll").on("scroll", function () {
    let scrollScore = $(window).scrollTop();
    console.log(scrollScore);
    if (scrollScore > 100) {
      $('.x-button').css("opacity", "1");
    } else {
      $('.x-button').css("opacity", ".5");
    }
  });
}

$(document).ready(function () {

    let displayType;
    let islandResize;

    let projectMode = 0;
    let resumeMode = 1;
    let contactMode = 2;
    let pageMode = projectMode;

    function determineDisplay() {
        let windowWidth = $(window).width();

        if (windowWidth < 750) {
            displayType = 'block';
            islandResize = `25%`
        } else {
            displayType = 'grid';
            islandResize = `100%`
        }

        updatePage(); // Refresh layout after determining display
    }

    function updatePage() {
        
        if (pageMode === projectMode) {
            $('#project-buttons').css("display", displayType);
            $('#resume-info').css("display", "none");
            $("#contact-info").css("display", "none");
        } else if (pageMode === resumeMode) {
            $('#project-buttons').css("display", "none");
            $('#resume-info').css("display", displayType);
            $("#contact-info").css("display", "none");
        } else if (pageMode === contactMode) {
            $('#project-buttons').css("display", "none");
            $('#resume-info').css("display", "none");
            $("#contact-info").css("display", displayType);
        }

    }

    // Run once on page load
    determineDisplay();

    // Attach resize listener
    $(window).on('resize', determineDisplay);

    // Tab button visual selection
    $('.tab-button').click(function () {
        $('.tab-button')
            .removeClass('selected')
            .addClass('unselected');

        $(this)
            .removeClass('unselected')
            .addClass('selected');
    });

    // Tab click logic
    $('#projects').click(function () {
        pageMode = projectMode;
        updatePage();
    });

    $('#resume').click(function () {
        pageMode = resumeMode;
        updatePage();
    });

    $('#contact').click(function () {
        pageMode = contactMode;
        updatePage();
    });
    
    // dynamic fill
  
    let chosenButton;

    let appropriateHTML;

   function showContent() {
    let chosenButton = $(this).attr('id');
    let appropriateHTML;
    console.log(document.body.scrollHeight, window.innerHeight);

    $(this).toggleClass('active');
    $(this).find('.x-button').css("display", "flex");

    $('.island-button').css("height", "0");
    // $('.island-button.active').css("height", "50%");
    // $('.island-button.active').css('width', "25%")

    if (chosenButton === `nbc-button`) {
        appropriateHTML = nbcHTML;
        $('.embed-div').css("background-color", "#030026");
        $('.publication-div').css("background-color", "#030026")
    } else if (chosenButton === `publications-button`) {
        appropriateHTML = publicationsHTML;
        $('.publication-div').css('background-color', '#819389');
    } else if (chosenButton === `nsfp-button`) {
        appropriateHTML = nsfpHTML;
       
    } else if (chosenButton === `webdev-button`) {
        appropriateHTML = webdevHTML;
    } else if (chosenButton === `jd-button`) {
        appropriateHTML = jdHTML;
    } else if (chosenButton === `misc-button`) {
        appropriateHTML = miscHTML;
    }

    $('.add-content').html(appropriateHTML).css("display", "block");
    setupScrollListener();
}

// Ensure no duplicate bindings
$('.island-button').off("click").on("click", showContent);
$('.island-button').on("click", function (e) {
  console.log("clicked:", e.target, "handler on:", this);
});



    $('.x-button').on("click", function(event) {
        event.stopPropagation(); 
        const island = $(this).closest('.island-button');
        island.removeClass("active");
        $(this).hide();
        $('.island-button').css("height", islandResize)
        $('.add-content').css('display', 'none')
});

   $('#projects').on("click", function(event) {
        event.stopPropagation(); 
        const island = $('.island-button.active').closest('.island-button');
        island.removeClass("active");
        $('.x-button').hide();
        $('.island-button').css("height", islandResize)
        $('.add-content').css('display', 'none')
});


});
