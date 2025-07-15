---
id: home
blueprint: pages
title: Home
template: default
page_builder:
  -
    id: m51p55hb
    background:
      - 'assets::v1_hero.jpg'
    title:
      -
        id: m51p7u1o
        title: 'WE ARE A'
        heading: h3
        text_colour: '#f700f4'
        type: title
        enabled: true
      -
        id: m51p8wzc
        title: CREATIVE
        heading: h1
        text_colour: '#00e6f5'
        type: title
        enabled: true
      -
        id: m51p9bag
        title: 'Digital Agency'
        heading: h2
        text_colour: '#000000'
        type: title
        enabled: true
    type: hero
    enabled: true
    background_image: v1_hero.jpg
    hero_title:
      -
        id: m51pbl9h
        title: 'WE ARE A'
        heading: h3
        type: title
        enabled: true
      -
        id: m51pc0sp
        title: CREATIVE
        heading: h1
        text_colour: '#00e6f5'
        type: title
        enabled: true
      -
        id: m51pc893
        title: 'Digital Agency'
        heading: h2
        text_colour: '#f700f4'
        type: title
        enabled: true
    hero_buttons:
      -
        id: md3reug3
        label: 'Contact Us'
        link_type: url
        target_blank: false
        url: '/#contact'
        button_type: button
        variant: primary
  -
    id: m51xwmit
    gallery_title:
      -
        id: m51y4gj1
        title: 'Gallery Images'
        heading: h2
        text_colour: '#f700f4'
        type: title
        enabled: true
      -
        id: m51y4oth
        title: 'Here are some random images'
        heading: h3
        text_colour: '#808080'
        type: title
        enabled: true
    gallery_type: default_grid
    cols_sm: '1'
    cols_md: '2'
    cols_lg: '4'
    images:
      - balloons.jpeg
      - cat.jpeg
      - drop.jpeg
      - eye.jpeg
      - forest.jpeg
      - futuristic.jpeg
      - lizard.jpeg
      - moon.jpeg
      - mountains.jpeg
      - parrot.jpeg
      - rainforest.jpeg
      - space.jpeg
    type: gallery
    enabled: true
    gallery_cols_sm: '1'
    gallery_cols_md: '2'
    gallery_cols_lg: 4
    gallery_colour: '#f700f4'
    gallery_opacity: 10
    slug: gallery
    gallery_bg_colour: '#00e6f5'
    gallery_bg_opacity: 20
    gallery_bg_gradient: true
    gallery_bg_secondary: '#00e6f5'
    gallery_bg_secondary_colour: '#f700f4'
  -
    id: m51q5k5e
    banner_title:
      -
        id: m51q5s27
        title: 'Get Started!'
        heading: h2
        type: title
        enabled: true
    banner_content: 'Curabitur nec lobortis odio. Nulla mi elit, eleifend vel molestie imperdiet, malesuada in metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur eget leo risus. Phasellus ultricies dui dui, interdum bibendum felis accumsan et. Fusce mattis ultricies lacus, in porttitor sem.'
    banner_text_colour: '#808080'
    background_image: tom.png
    banner_buttons:
      -
        id: m51qdsyw
        label: 'Learn More'
        link_type: url
        target_blank: true
        url: /
        button_type: button
        button_colour: '#00e6f5'
        button_opacity: 100
        variant: primary
      -
        id: m51q6syw
        label: 'Get Started'
        link_type: modal
        target_blank: false
        button_type: button
        button_colour: '#f700f4'
        button_opacity: 50
        modal: |-
          **Lorem Ipsum**

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi suscipit nec velit sit amet molestie. Donec aliquam enim sed tellus luctus lobortis. Sed at rhoncus magna. Maecenas scelerisque arcu ut congue fermentum. Curabitur quis nunc ac urna vehicula sagittis. Nam nec est leo. Sed ut lacus tempus, fermentum libero eu, pharetra neque. Nulla iaculis auctor augue, non interdum libero faucibus eu. Suspendisse id arcu id lectus lacinia molestie ut a nibh. Donec sed est eu dolor luctus cursus id id sapien. Nunc felis erat, efficitur non vehicula ut, auctor vel felis. Proin sollicitudin sagittis orci quis facilisis. Cras porttitor elit quis iaculis tristique. Sed tempus elit ante, nec consequat eros euismod non.
        variant: tertiary
    type: banner
    enabled: true
    banner_colour: '#f700f4'
    banner_opacity: 20
    banner_bgcolour: '#f700f4'
    banner_bgopacity: 100
    slug: banner
    banner_bg_colour: '#f700f4'
    banner_bg_gradient: false
    banner_bg_secondary: '#ffffff'
    banner_gradient: false
    banner_secondary: '#ffffff'
    banner_bg_opacity: 20
  -
    id: mb0bioec
    logos:
      - balloons.jpeg
      - cat.jpeg
      - drop.jpeg
      - lizard.jpeg
      - moon.jpeg
      - mountains.jpeg
    type: marquee
    enabled: true
    marquee_title:
      -
        id: mb0fselj
        title: 'Trusted Partners'
        heading: h2
        text_colour: '#000000'
        type: title
        enabled: true
    slug: trusted-partners
  -
    id: m4w4h0qk
    title: 'Carousel Test'
    text: Test
    type: carousel
    enabled: true
    slides_per_view: 3
    slug: carousel
    carousel:
      -
        id: m50ms4la
        colour: '#00e6f5'
        opacity: 20
        carousel_item_content: 'Praesent dictum dapibus ultricies. Sed id massa tellus. Cras facilisis elit quam, ac tincidunt sem mollis sit amet. In sollicitudin justo lorem, vel lobortis turpis iaculis eu. Nulla aliquet convallis nisl vitae aliquet. Praesent quis metus id ligula posuere dictum ut eget mi. Mauris sit amet consequat neque. Integer at sagittis enim.'
        carousel_item_text_colour: '#f700f4'
        carousel_item_title:
          -
            id: m50mssvt
            title: 'Lorem Ipsum'
            heading: h3
            text_colour: '#f700f4'
            type: title
            enabled: true
        type: carousel_item
        enabled: true
        carousel_item_bg_colour: '#00e6f5'
        carousel_item_bg_opacity: 40
        carousel_item_bg_gradient: false
        carousel_item_bg_secondary: '#ffffff'
      -
        id: m50njn0w
        colour: '#00e6f5'
        opacity: 20
        carousel_item_content: 'Praesent dictum dapibus ultricies. Sed id massa tellus. Cras facilisis elit quam, ac tincidunt sem mollis sit amet. In sollicitudin justo lorem, vel lobortis turpis iaculis eu. Nulla aliquet convallis nisl vitae aliquet. Praesent quis metus id ligula posuere dictum ut eget mi. Mauris sit amet consequat neque. Integer at sagittis enim.'
        carousel_item_text_colour: '#f700f4'
        carousel_item_title:
          -
            id: m50mssvt
            title: 'Lorem Ipsum'
            heading: h3
            text_colour: '#f700f4'
            type: title
            enabled: true
        type: carousel_item
        enabled: true
        carousel_item_bg_colour: '#ffffff'
        carousel_item_bg_gradient: false
        carousel_item_bg_secondary: '#ffffff'
        carousel_item_bg_opacity: 0
      -
        id: m50njls0
        colour: '#00e6f5'
        opacity: 20
        carousel_item_content: 'Praesent dictum dapibus ultricies. Sed id massa tellus. Cras facilisis elit quam, ac tincidunt sem mollis sit amet. In sollicitudin justo lorem, vel lobortis turpis iaculis eu. Nulla aliquet convallis nisl vitae aliquet. Praesent quis metus id ligula posuere dictum ut eget mi. Mauris sit amet consequat neque. Integer at sagittis enim.'
        carousel_item_text_colour: '#f700f4'
        carousel_item_title:
          -
            id: m50mssvt
            title: 'Lorem Ipsum'
            heading: h3
            text_colour: '#f700f4'
            type: title
            enabled: true
        type: carousel_item
        enabled: true
        carousel_item_bg_colour: '#ffffff'
        carousel_item_bg_gradient: false
        carousel_item_bg_secondary: '#ffffff'
        carousel_item_bg_opacity: 0
      -
        id: m50njkl4
        colour: '#00e6f5'
        opacity: 20
        carousel_item_content: 'Praesent dictum dapibus ultricies. Sed id massa tellus. Cras facilisis elit quam, ac tincidunt sem mollis sit amet. In sollicitudin justo lorem, vel lobortis turpis iaculis eu. Nulla aliquet convallis nisl vitae aliquet. Praesent quis metus id ligula posuere dictum ut eget mi. Mauris sit amet consequat neque. Integer at sagittis enim.'
        carousel_item_text_colour: '#f700f4'
        carousel_item_title:
          -
            id: m50mssvt
            title: 'Lorem Ipsum'
            heading: h3
            text_colour: '#f700f4'
            type: title
            enabled: true
        type: carousel_item
        enabled: true
        carousel_item_bg_colour: '#ffffff'
        carousel_item_bg_gradient: false
        carousel_item_bg_secondary: '#ffffff'
        carousel_item_bg_opacity: 0
    carousel_title:
      -
        id: m50mtriw
        title: 'Awesome Carousel'
        heading: h2
        text_colour: '#f700f4'
        type: title
        enabled: true
      -
        id: m50mwlyb
        title: "Here's a subtitle"
        heading: h3
        text_colour: '#808080'
        type: title
        enabled: true
    carousel_cols_sm: 1
    carousel_cols_md: '2'
    carousel_cols_lg: 3
    opacity: 0
    carousel_bg_colour: '#00e6f5'
    carousel_bg_opacity: 20
    carousel_bg_gradient: true
    carousel_bg_secondary: '#ffffff'
    carousel_bg_secondary_colour: '#f700f4'
  -
    id: m4uxc0vv
    faq_items:
      -
        id: m4uxc3tx
        question: 'Question 1?'
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis molestie eros. Proin sodales a velit non vestibulum. Aliquam erat volutpat. Sed at magna nec leo semper imperdiet sit amet sit amet libero. Quisque ac diam vitae nunc lacinia efficitur vel in quam. Suspendisse eleifend neque tortor, sed fringilla neque ultrices a. Donec congue pharetra lacus. Mauris dictum velit vel purus maximus, et tincidunt dui blandit.'
        type: questions_answers
        enabled: true
      -
        id: m4uxrunr
        question: 'Question 2?'
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis molestie eros. Proin sodales a velit non vestibulum. Aliquam erat volutpat. Sed at magna nec leo semper imperdiet sit amet sit amet libero. Quisque ac diam vitae nunc lacinia efficitur vel in quam. Suspendisse eleifend neque tortor, sed fringilla neque ultrices a. Donec congue pharetra lacus. Mauris dictum velit vel purus maximus, et tincidunt dui blandit.'
        type: questions_answers
        enabled: true
      -
        id: m4uxs32v
        question: 'Question 3?'
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis molestie eros. Proin sodales a velit non vestibulum. Aliquam erat volutpat. Sed at magna nec leo semper imperdiet sit amet sit amet libero. Quisque ac diam vitae nunc lacinia efficitur vel in quam. Suspendisse eleifend neque tortor, sed fringilla neque ultrices a. Donec congue pharetra lacus. Mauris dictum velit vel purus maximus, et tincidunt dui blandit.'
        type: questions_answers
        enabled: true
    type: faq
    enabled: true
    title: 'Frequently Asked Questions'
    radio_field: primary
    faq_title:
      -
        id: m50ndvhn
        title: FAQ
        heading: h2
        text_colour: '#000000'
        type: title
        enabled: true
      -
        id: m50ne1nt
        title: 'Here are some frequently asked questions'
        heading: h3
        text_colour: '#808080'
        type: title
        enabled: true
    opacity: 0
    faq_bg_colour: '#f700f4'
    faq_bg_opacity: 20
    layout: col
    width: 50
    faq_text_colour: '#808080'
    faq_content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at suscipit felis. Mauris pharetra erat vitae turpis tincidunt, a porta neque molestie.'
    faq_buttons:
      -
        id: m5fxns3s
        label: 'Contact Us'
        link_type: url
        target_blank: false
        url: '/#contact-us'
        button_type: button
        button_colour: '#f700f4'
    slug: faq
    faq_bg_gradient: true
    faq_bg_secondary: '#ffffff'
    faq_bg_secondary_colour: '#00e6f5'
  -
    id: m4urcmgw
    title: Test
    text: 'Something else'
    form: contact
    type: form
    enabled: true
    form_title:
      -
        id: m50niaon
        title: 'Contact Us'
        heading: h2
        text_colour: '#000000'
        type: title
        enabled: true
      -
        id: m50nigme
        title: 'Get in touch!'
        heading: h3
        text_colour: '#808080'
        type: title
        enabled: true
    opacity: 20
    colour: '#00e6f5'
    slug: contact
    form_bg_colour: '#00e6f5'
    form_bg_opacity: 20
    layout: row
    width: 33
    form_content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at suscipit felis. Mauris pharetra erat vitae turpis tincidunt, a porta neque molestie.'
    form_text_colour: '#808080'
    form_bg_gradient: true
    form_bg_secondary: '#ffffff'
    form_bg_secondary_colour: '#f700f4'
  -
    id: m4uzbnn3
    title: 'Hey this is cool'
    text_plain: 'Hello hello'
    panels:
      -
        id: m4uzwsty
        title: test
        content: tests
        image: tom.png
        type: panel
        enabled: true
        panel_item_text_colour: '#808080'
        panel_item_title:
          -
            id: m50okc2q
            title: 'Panel 1'
            heading: h2
            text_colour: '#000000'
            type: title
            enabled: true
        panel_item_content: 'Suspendisse vehicula sodales condimentum. Vestibulum eu tincidunt tortor, at iaculis nibh. Fusce convallis eros nec maximus bibendum. Morbi non commodo metus. Duis at augue risus. Phasellus congue mollis metus. Etiam luctus velit ipsum, vitae blandit magna pharetra et. Etiam laoreet sagittis felis. Nullam nec sollicitudin orci.'
      -
        id: m50o89lc
        title: test
        content: tests
        image: tom.png
        type: panel
        enabled: true
        panel_item_text_colour: '#808080'
        panel_item_title:
          -
            id: m50okn2c
            title: 'Panel 2'
            heading: h2
            text_colour: '#000000'
            type: title
            enabled: true
        panel_item_content: 'Suspendisse vehicula sodales condimentum. Vestibulum eu tincidunt tortor, at iaculis nibh. Fusce convallis eros nec maximus bibendum. Morbi non commodo metus. Duis at augue risus. Phasellus congue mollis metus. Etiam luctus velit ipsum, vitae blandit magna pharetra et. Etiam laoreet sagittis felis. Nullam nec sollicitudin orci.'
    type: panels
    enabled: true
    text: Yoyoyoooooo
    opacity: 20
    colour: '#f700f4'
    panels_title:
      -
        id: m50nygd1
        title: 'What We Do'
        heading: h2
        text_colour: '#000000'
        type: title
        enabled: true
    panels_bg_colour: '#f700f4'
    panels_bg_opacity: 20
    panels_bg_gradient: true
    panels_bg_secondary: '#ffffff'
    panels_bg_secondary_colour: '#00e6f5'
    slug: panels
  -
    id: m522ct6k
    cards_title:
      -
        id: m522cvcb
        title: Cards
        heading: h2
        text_colour: '#f700f4'
        type: title
        enabled: true
    cards:
      -
        id: m522daa0
        icon: tom.png
        flip: false
        card_title:
          -
            id: m522eq54
            title: 'Lorem Ipsum'
            heading: h3
            text_colour: '#000000'
            type: title
            enabled: true
        card_content: |-
          Phasellus ut porta risus. Morbi facilisis tincidunt tortor, convallis consequat justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse non fringilla nulla.

          Phasellus ut porta risus. Morbi facilisis tincidunt tortor, convallis consequat justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse non fringilla nulla.
        card_text_colour: '#808080'
        type: card
        enabled: true
        content: 'Maecenas malesuada nunc at pulvinar volutpat. Nunc dapibus facilisis risus, non porttitor magna imperdiet ac. Phasellus sodales, turpis ac congue tempus, orci odio laoreet sem, ut feugiat erat est non lacus. Aenean convallis mi ac urna vulputate, eleifend consequat libero laoreet. Fusce nec est in sem venenatis auctor. Sed porttitor nunc eu odio accumsan eleifend. Donec convallis egestas condimentum. Donec mattis cursus enim, quis aliquet nisi porta in. Mauris in varius justo. Integer leo ligula, ullamcorper ac placerat feugiat, fermentum a odio. Nam tempus nisl tellus, quis tristique ex euismod ut. In urna leo, varius et nibh rutrum, pellentesque suscipit nunc. Vestibulum ornare sit amet turpis non efficitur.'
        front_card_colour: '#00e6f5'
        back_card_colour: '#f700f4'
        front_card_opacity: 50
        back_card_opacity: 50
        front_card_gradient: false
        front_card_secondary: '#ffffff'
        back_card_gradient: true
        back_card_secondary: '#ffffff'
        back_card_secondary_colour: '#00e6f5'
      -
        id: m522f9l8
        icon: tom.png
        flip: false
        card_title:
          -
            id: m522eq54
            title: 'Lorem Ipsum'
            heading: h3
            text_colour: '#000000'
            type: title
            enabled: true
        card_content: 'Phasellus ut porta risus. Morbi facilisis tincidunt tortor, convallis consequat justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse non fringilla nulla.'
        card_text_colour: '#808080'
        type: card
        enabled: true
        content: 'Maecenas malesuada nunc at pulvinar volutpat. Nunc dapibus facilisis risus, non porttitor magna imperdiet ac. Phasellus sodales, turpis ac congue tempus, orci odio laoreet sem, ut feugiat erat est non lacus. Aenean convallis mi ac urna vulputate, eleifend consequat libero laoreet. Fusce nec est in sem venenatis auctor. Sed porttitor nunc eu odio accumsan eleifend. Donec convallis egestas condimentum. Donec mattis cursus enim, quis aliquet nisi porta in. Mauris in varius justo. Integer leo ligula, ullamcorper ac placerat feugiat, fermentum a odio. Nam tempus nisl tellus, quis tristique ex euismod ut. In urna leo, varius et nibh rutrum, pellentesque suscipit nunc. Vestibulum ornare sit amet turpis non efficitur.'
        front_card_colour: '#ffffff'
        back_card_colour: '#ffffff'
        front_card_gradient: false
        front_card_secondary: '#ffffff'
        back_card_gradient: false
        back_card_secondary: '#ffffff'
        front_card_opacity: 0
        back_card_opacity: 0
      -
        id: m522f8hn
        icon: tom.png
        flip: false
        card_title:
          -
            id: m522eq54
            title: 'Lorem Ipsum'
            heading: h3
            text_colour: '#000000'
            type: title
            enabled: true
        card_content: 'Phasellus ut porta risus. Morbi facilisis tincidunt tortor, convallis consequat justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse non fringilla nulla.'
        card_text_colour: '#808080'
        type: card
        enabled: true
        content: 'Maecenas malesuada nunc at pulvinar volutpat. Nunc dapibus facilisis risus, non porttitor magna imperdiet ac. Phasellus sodales, turpis ac congue tempus, orci odio laoreet sem, ut feugiat erat est non lacus. Aenean convallis mi ac urna vulputate, eleifend consequat libero laoreet. Fusce nec est in sem venenatis auctor. Sed porttitor nunc eu odio accumsan eleifend. Donec convallis egestas condimentum. Donec mattis cursus enim, quis aliquet nisi porta in. Mauris in varius justo. Integer leo ligula, ullamcorper ac placerat feugiat, fermentum a odio. Nam tempus nisl tellus, quis tristique ex euismod ut. In urna leo, varius et nibh rutrum, pellentesque suscipit nunc. Vestibulum ornare sit amet turpis non efficitur.'
        front_card_colour: '#ffffff'
        back_card_colour: '#ffffff'
        front_card_gradient: false
        front_card_secondary: '#ffffff'
        back_card_gradient: false
        back_card_secondary: '#ffffff'
        front_card_opacity: 0
        back_card_opacity: 0
      -
        id: m522f748
        icon: tom.png
        flip: false
        card_title:
          -
            id: m522eq54
            title: 'Lorem Ipsum'
            heading: h3
            text_colour: '#000000'
            type: title
            enabled: true
        card_content: 'Phasellus ut porta risus. Morbi facilisis tincidunt tortor, convallis consequat justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse non fringilla nulla.'
        card_text_colour: '#808080'
        type: card
        enabled: true
        content: 'Maecenas malesuada nunc at pulvinar volutpat. Nunc dapibus facilisis risus, non porttitor magna imperdiet ac. Phasellus sodales, turpis ac congue tempus, orci odio laoreet sem, ut feugiat erat est non lacus. Aenean convallis mi ac urna vulputate, eleifend consequat libero laoreet. Fusce nec est in sem venenatis auctor. Sed porttitor nunc eu odio accumsan eleifend. Donec convallis egestas condimentum. Donec mattis cursus enim, quis aliquet nisi porta in. Mauris in varius justo. Integer leo ligula, ullamcorper ac placerat feugiat, fermentum a odio. Nam tempus nisl tellus, quis tristique ex euismod ut. In urna leo, varius et nibh rutrum, pellentesque suscipit nunc. Vestibulum ornare sit amet turpis non efficitur.'
        front_card_colour: '#ffffff'
        back_card_colour: '#ffffff'
        front_card_gradient: false
        front_card_secondary: '#ffffff'
        back_card_gradient: false
        back_card_secondary: '#ffffff'
        front_card_opacity: 0
        back_card_opacity: 0
    type: cards
    enabled: true
    slug: cards
    flip: true
    cols_sm: 1
    cols_md: 2
    cols_lg: 4
    cards_cols_sm: '1'
    cards_cols_md: '2'
    cards_cols_lg: 4
    cards_bg_colour: '#00e6f5'
    cards_bg_opacity: 20
    cards_bg_gradient: true
    cards_bg_secondary: '#ffffff'
    cards_bg_secondary_colour: '#f700f4'
  -
    id: m68igs3j
    steps_bg_colour: '#f700f4'
    steps_bg_gradient: true
    steps_bg_secondary_colour: '#00e6f5'
    steps_bg_opacity: 20
    slug: steps
    steps_cols_sm: '1'
    steps_cols_md: '2'
    steps_cols_lg: '4'
    steps:
      -
        id: m68l9wdw
        heading: 'Be Awesome'
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        type: new_set
        enabled: true
        icon: tom.png
      -
        id: m68mhgdv
        icon: tom.png
        heading: 'Stay Awesome'
        content: 'Sed do eiusmod tempor incididunt ut labore'
        type: new_set
        enabled: true
      -
        id: m68naovp
        icon: tom.png
        heading: 'Look Awesome'
        content: 'Ut enim ad minim veniam quis nostrud exercitation ullamco'
        type: new_set
        enabled: true
      -
        id: m68nbbuu
        icon: tom.png
        heading: 'Tell Everyone You’re Awesome'
        content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse'
        type: new_set
        enabled: true
    type: steps
    enabled: true
    steps_title:
      -
        id: m68mk2q9
        title: 'How We Do It'
        heading: h2
        text_colour: '#ffffff'
        type: title
        enabled: true
    spacer_image: right-arrow.svg
  -
    id: m5ol9hf7
    slug: columns
    columns_colour: '#00e6f5'
    columns_gradient: false
    columns_opacity: 20
    columns_title:
      -
        id: m5ol9u74
        title: Columns
        heading: h2
        text_colour: '#000000'
        type: title
        enabled: true
    columns_content: 'Cras at risus metus. Integer venenatis blandit purus eu maximus. Sed magna erat, accumsan quis commodo sed, finibus a purus. Integer arcu tellus, luctus sed sem nec, auctor mollis lorem. Aenean sed laoreet nisi. Donec efficitur feugiat magna posuere mollis. Nam sodales, mi nec condimentum vulputate, diam nunc imperdiet massa, eget bibendum arcu velit vel eros.'
    columns_text_colour: '#000000'
    type: columns
    enabled: true
    columns_bg_colour: '#f700f4'
    columns_bg_gradient: true
    columns_bg_opacity: 20
    columns_bg_secondary_colour: '#00e6f5'
    columns:
      -
        id: m5old7cr
        column_gradient: false
        column_title:
          -
            id: m5olddf8
            title: 'Column 1'
            heading: h3
            text_colour: '#f700f4'
            type: title
            enabled: true
        column_content: 'Cras at risus metus. Integer venenatis blandit purus eu maximus. Sed magna erat, accumsan quis commodo sed, finibus a purus. Integer arcu tellus, luctus sed sem nec, auctor mollis lorem. Aenean sed laoreet nisi. Donec efficitur feugiat magna posuere mollis. Nam sodales, mi nec condimentum vulputate, diam nunc imperdiet massa, eget bibendum arcu velit vel eros.'
        column_text_colour: '#000000'
        type: column
        enabled: true
        width: 25
        column_width_mobile: 100
        column_width_tablet: 50
        column_width_desktop: 50
        column_opacity: 0
        image: tom.png
        select_content_type: image_video
      -
        id: m5ole3t5
        column_gradient: false
        column_opacity: 20
        width: 50
        column_title:
          -
            id: m5olexzc
            title: 'Column 2'
            heading: h3
            text_colour: '#00e6f5'
            type: title
            enabled: true
        column_text_colour: '#000000'
        image: tom.png
        column_buttons:
          -
            id: m5olfhb0
            label: "Let's go!"
            link_type: url
            target_blank: false
            url: /
            button_type: button
            button_colour: '#00e6f5'
            variant: secondary
        type: column
        enabled: true
        column_width_mobile: 100
        column_width_tablet: 50
        column_width_desktop: 50
        select_content_type: image_video
        file: tom.png
  -
    id: m7y79ao8
    modal_type: form
    type: engagement_modal
    enabled: false
    form: contact
    engagement_modal_bg_colour: '#00e6f5'
    engagement_modal_bg_gradient: true
    engagement_modal_bg_secondary_colour: '#f700f4'
    engagement_modal_bg_opacity: 20
    seconds_to_display: 5
    expiry_date: '2025-03-08'
  -
    id: m82ihfic
    slug: news
    news_title:
      -
        id: m82ihjwn
        title: News
        heading: h2
        text_colour: '#000000'
        type: title
        enabled: true
    news_bg_colour: '#00e6f5'
    news_bg_gradient: true
    news_bg_secondary_colour: '#f700f4'
    news_bg_opacity: 20
    limit: 3
    type: news
    enabled: true
updated_by: 09206c24-2552-4b9b-bbbc-a54640dd3e13
updated_at: 1752555529
---
## Welcome to your brand new Statamic site!

Not sure what to do next? Here are a few ideas, but feel free to explore in your own way, in your own time.

-   [Jump into the Control Panel](/cp) and edit this page or begin setting up your own collections and blueprints.
-   [Head to the docs](https://statamic.dev) and learn how Statamic works.
-   [Watch some Statamic videos](https://youtube.com/statamic) on YouTube.
-   [Join our Discord chat](https://statamic.com/discord) and meet thousands of other Statamic developers.
-   [Start a discussion](https://github.com/statamic/cms/discussions) and get answers to your questions.
-   [Star Statamic on Github](https://github.com/statamic/cms) if you enjoy using it!
