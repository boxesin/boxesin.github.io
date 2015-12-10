/* global cre */

var teBox = cre('.box',{wall: true},[
  cre('.box-title',{part: 'title', contentEditable: true},'Box'),
  cre('.box-children',{part: 'child-boxes'}),
  cre('button.new-child',{type: 'button', part:'new-child-button'},'New box')
]);

function createChildBox() {
  var elBox = cre(teBox);
  var doc = {title: 'Box'};
  var childBox = {
    doc: doc,
    element: elBox
  };

  var elTitle = elBox.getPart('title');
  elTitle.addEventListener('input', function(evt) {
    var newTitle = elTitle.textContent;
    elTitle.textContent = newTitle;
    // TODO: update document in database
    doc.title = newTitle;
  });

  var elChildBoxContainer = elBox.getPart('child-boxes');

  var elButton = elBox.getPart('new-child-button');
  elButton.addEventListener('click', function(evt) {
    var newChildBox = createChildBox();
    elChildBoxContainer.appendChild(newChildBox.element);
  });

  return childBox;
}

document.body.appendChild(createChildBox().element);