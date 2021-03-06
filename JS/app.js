'use strict';

$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON',})
  .then(images => {
    images.forEach(image => {
      new Image(image);
    });
    collection.forEach(item => {
      item.render();
    });
    addDropDownOptions();
    $('select').on('change', function(){
      $('section').hide();
      $('section').each((index,element) => {
        if(this.value === $(element).attr('data-keyword')){
          $(element).show();
        };
      });
    });
  });

let collection = [];
let allKeywords = [];

function Image(obj){
  this.title = obj.title;
  this.imageUrl = obj.image_url;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  collection.push(this);
  addKeyword(obj.keyword);
}

Image.prototype.render = function(){
  const template = $('#photo-template').html();

  const $newSection = $('<section></section>');
  $newSection.html(template);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.imageUrl);
  $newSection.find('p').text(this.description);
  $newSection.attr('data-keyword', this.keyword);
  $newSection.attr('class', 'hornCard');
  $('main').append($newSection);
};

function addKeyword(keyword){
  if(!allKeywords.includes(keyword)){
    allKeywords.push(keyword);
  }
}

function addDropDownOptions (){
  const $dropdown = $('select');
  allKeywords.forEach(keyword => {
    const $newOption = $(`<option value="${keyword}">${keyword}</option>`);
    $dropdown.append($newOption);
  })
}



