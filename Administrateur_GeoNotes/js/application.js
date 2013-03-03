var NotesApp = (function(){

	var App = {
		stores: {},
		views: {},
		collections: {}
		
	}

	//L'initialisation de local storage:
	App.stores.notes = new Store('notes');

	//Le model de la note
	var Note = Backbone.Model.extend({
		localStorage: App.stores.notes,
		initialize: function(){
			if (!this.get('title')) {
				this.set({title: "Note @ " + Date()})
			};

			if (!this.get('body')) {
				this.set({body: "No Content"})
			};
		}

	});


	// La collection des notes
	var NoteList = Backbone.Collection.extend({
	// Cette collection est composée de plusieurs notes
	model: Note,
	localStorage: App.stores.notes,
	initialize: function(){
		var collection = this;
		this.localStorage.bind('update', function(){
			collection.fetch();
		})
	}

	});

	var NewNoteForm = Backbone.View.extend({
		events: {
			"submit form" : "createNote"
		},

		createNote: function(event) {
			var attrs = this.getAttributes();
			var note = new Note();
			note.set(attrs);
			note.save();
			event.preventDefault();
			event.stopPropagation();
			$('.ui-dialog').dialog('close');
			this.reset();



		},

		getAttributes: function(){
			return {
				title: this.$('form [name="title"]').val(),
				body: this.$('form [name="body"]').val()
			}
		},

		reset: function() {
			this.$('input, textarea').val('');
		}

	});

	var NoteListView = Backbone.View.extend({
		initialize: function(){
			_.bindAll(this, 'addOne', 'addAll');
			this.collection.bind('add', this.addOne);
			this.collection.bind('refresh', this.addAll);
			this.collection.fetch(); 
		},

		addOne: function(note){
			var view = new NoteListItemView({model: note});
			$(this.el).append(view.render().el);
		},

		addAll: function(){
			$(this.el).empty();
			this.collection.each(this.addOne);
		}

	});

	var NoteListItemView = Backbone.View.extend({

		tagName: 'li',
		template: _.template($('#note-list-item-template').html()),

		initialize: function(){
		_.bindAll(this, 'render')

		this.model.bind('change', this.render)
		},

		render: function(){
			$(this.el).html(this.template({ note: this.model }))
			return this;
		}

	});

	App.views.newForm = new NewNoteForm({
		el: $('#new')
	});

	App.collections.all_notes = new NoteList();

	App.views.list_alphabetical = new NoteListView({
		el: $('#all_notes'),
		collection: App.collections.all_notes
	});

	window.Note = Note;

	return App;

})();

// ==================================