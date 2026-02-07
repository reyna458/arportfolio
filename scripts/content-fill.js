$(document).ready(function () {
  $.getJSON('portfolio-content.json', function (data) {

    let displayCategory = 'data-journalism';

    function renderContent() {
      $('#content').empty();

      data.forEach(item => {
        let categoriesArray = item.categories
          .split(',')
          .map(cat => cat.trim());

        if (categoriesArray.includes(displayCategory)) {
            
          $('#content').append(`
            <div class="${item.widgtype}">
              <h6>${item.publication} — ${item.contribution}</h6>
              <a href="${item.link}" target="_blank">
                <h2>${item.hed}</h2>
              </a>
              <p>${item.dek}</p>
              
               <img 
  src="${item.img}" 
  alt="${item.alt}" 
  class="image1" 
  data-link="${item.imglink1}" 
/>

<img 
  src="${item.img2}" 
  alt="${item.alt2}" 
  class="secondary-img" 
  data-link="${item.imglink2}" 
/>

<img 
  src="${item.img3}" 
  alt="${item.alt3}" 
  class="secondary-img2" 
  data-link="${item.imglink3}" 
/>

           
            </div>
          `);
        }
      });
    }

    $(document).on('click', '.image1, .secondary-img, .secondary-img2', function () {
  const link = $(this).data('link');

  if (link) {
    window.open(link, '_blank');
  }
});


    function setCategory(category, push = true) {
      displayCategory = category;

      $('.selected').removeClass('selected');
      $('#' + category).addClass('selected');

      renderContent();

      const explainerText = {
        'data-journalism': `Here is a collection of my work so far as a data journalist! I've written data stories for NBC News and The New School Free Press, all of which are laid out here for your reading pleasure.`,
        'web-dev': `Here is a collection of my work so far as a web developer. I am proficient in HTML, CSS, JavaScript and JQuery. I also have experience using WordPress from my time working for The New School Free Press.`,
        'design': `Here is a collection of my work as a graphic designer. I've worked on a great variety of projects, from social media posts to book covers. In my time in the Communication Design program I have developed skills in Illustrator, Photoshop, InDesign and Figma.`,
        'marketing': `Here is a collection of my work as a social media manager. I have been managing the Journalism + Design department's Instagram for over two years now, and was also Head of Social Media for The New School Free Press before becoming Creative Director. I have also managed social media accounts for various passion projects, and briefly interned with (unfortunately now defunct) sustainable fashion company Seams Better.`
      };

      $('#explainer-content').html(explainerText[category] || '');

      if (push) {
        const url = category === 'data-journalism'
          ? window.location.pathname
          : `?category=${category}`;

        history.pushState({ category }, '', url);
      }
    }

    // Button handlers
    $('#data-journalism').click(() => setCategory('data-journalism'));
    $('#web-dev').click(() => setCategory('web-dev'));
    $('#design').click(() => setCategory('design'));
    $('#marketing').click(() => setCategory('marketing'));

    // Back / forward navigation
    window.addEventListener('popstate', function (event) {
      const category = event.state?.category || 'data-journalism';
      setCategory(category, false);
    });

    // Initial load (handle URL)
    const params = new URLSearchParams(window.location.search);
    const initialCategory = params.get('category') || 'data-journalism';

    history.replaceState({ category: initialCategory }, '', window.location.href);
    setCategory(initialCategory, false);

  });
});
