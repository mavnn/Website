(function() {
  var draw_box, draw_boxes, process_word;
  process_word = function(parent, word) {
    var letter;
    letter = word[1];
    if (letter === 'a' || letter === 'e' || letter === 'i' || letter === 'o' || letter === 'u') {
      parent.append($('<span>').addClass('vowel').html(letter));
    } else {
      parent.append($('<span>').addClass('const').html(letter));
    }
    return parent.append($('<span>').addClass('word-' + (word.length - 2)).html(word.substring(2, word.length - 1)));
  };
  draw_box = function(row) {
    var box, image, image_box;
    image = $('<img>').attr({
      src: row[2].substring(1, row[2].length - 1)
    }).addClass('word-image');
    image_box = $('<div>').addClass('picture-box').append(image);
    box = $('<div>');
    return box.addClass('outer-box').hide().append(image_box).append(process_word($('<div>').addClass('word-box').addClass('it-box'), row[1])).append(process_word($('<div>').addClass('word-box').addClass('en-box'), row[0]));
  };
  draw_boxes = function(data) {
    var i, inner_draw, rows;
    inner_draw = function() {
      if (rows[i]) {
        draw_box(rows[i].split("\t")).appendTo($('#main')).fadeIn(1000);
      }
      i++;
      if (i < rows.length) {
        return setTimeout(inner_draw, 1);
      }
    };
    i = 0;
    rows = data.split("\n");
    return inner_draw();
  };
  $(document).ready(function() {
    $.get('data/words.csv', draw_boxes);
    return $.getJSON('http://django.mavnn.co.uk/wuxiaworld/fighter?callback=?', function(data) {
      return alert("All Done!:\n" + data.boo);
    });
  });
}).call(this);


