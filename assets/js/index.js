const $ntitle = $(".ntitle");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newInstanceBtn = $(".new-instance");
const $noteList = $(".list-container .list-group");

if (window.location.pathname === '/notes') {
  saveNoteBtn = document.querySelector('.save-note');
  newInstanceBtn = document.querySelector('.new-instance');
  noteList = document.querySelectorAll('.list-container .list-group');
  ntitle = document.querySelector('.ntitle');
  noteText = document.querySelector('.note-textarea');
 
}
const hide = (elem) => {
  elem.style.display = 'none';
};
const show = (elem) => {
  elem.style.display = 'inline';
};



let activeNote = {};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {'Content-Type': 'application/json',},
  });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json',},
  });

const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    ntitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    ntitle.value = activeNote.ntitle;
    noteText.value = activeNote.text;
  } else {
    ntitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    ntitle.value = '';
    noteText.value = '';
  }
};

const handleNoteSave = () => {
  const newInstance = {
    ntitle: ntitle.value,
    text: noteText.value,
  };
  saveNote(newInstance).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};


const handlenewInstanceView = (e) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!ntitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};




const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];


  const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newInstanceBtn.addEventListener('click', handlenewInstanceView);
  ntitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

const getAndRenderNotes = function () {
  return getNotes().then(function (data) {
    renderNoteList(data);
  });
};


$noteList.on("click", ".list-group-item", handleNoteView);
$nntitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);
$newInstanceBtn.on("click", handleNewInstanceView);
$notesList.on("click", ".delete-note", handleNoteDelete);
$savedNoteBtn.on("click", handleNoteSave);


}