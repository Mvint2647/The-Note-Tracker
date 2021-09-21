const ntitle = (".ntitle");
const savedNoteBtn = (".save-note");
const newInstanceBtn = (".new-instance");
const noteList = (".list-container .list-group");
const noteText = (".note-textarea");




let activeNote = {};

const getNotes = function () { return $.ajax({
    url: "/api/notes",
    method: "GET" });};

 const savedNote = function (note) { return $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST"});};

  const deleteNote = function (id) { return $.ajax({
            url: "api/notes/" + id,
            method: "DELETE"});};


// ----------------------------------------------------

            
const renderActiveNote = () => {
  hide (".save-note");

  if (activeNote.id) {
    ntitle.value = (activeNote.ntitle);
    noteText.value = (activeNote.text);
    ntitle.setAttribute("readonly", true);
    noteText.setAttribute("readonly", true);
  } else {
    ntitle.value = "";
    noteText.value = "";
    noteText.removeAttribute("readonly", false);
    ntitle.removeAttribute("readonly",false); 
  }
};

// ----------------------------------


const newNoteView = function () {
  activeNote = {};
  renderActiveNote();
};

const renderSaveBtn = function () {
  if (!noteTitle.val().trim() || !$noteText.val().trim()) {
    saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};




const renderNoteList = function (notes) {
  noteList.empty();

  const noteListItems = [];

  for (const i = 0; i < notes.length; i++) {
    const note = notes[i];

    const $li = ("<li class='list-group-item'>").data(note);
    const $span = ("<span>").text(note.title);
    const $delBtn = ("<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );

    li.append(span, delBtn);
    noteListItems.push(li);
  }

  noteList.append(noteListItems);
};




const getRenderNotes = function () {
  return getNotes().then(function (data) {
    renderNoteList(data);
  });
};

noteList.on("click", ".list-group-item", noteView);
ntitle.on("keyup", renderSavedBtn);
noteText.on("keyup", renderSavedBtn);
newInstanceBtn.on("click", NewInstanceView);
notesList.on("click", ".delete-note", noteDelete);
savedNoteBtn.on("click", noteSaved);


getRenderNotes();