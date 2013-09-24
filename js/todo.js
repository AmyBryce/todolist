var jquerytodo = function() {
	var $addbutton = $("#addbutton");
	var $input = $("#input");
	var $tasklist = $("#tasklist");
	var $jquerytask = $("#jquerytask");

	var newtask = function() {
		var task = $jquerytask.html();
		return $(task);
	};
	
	$input.keypress(function(e) {
		if (e.which == 13) { // Enter key pressed
			$addbutton.click();
		}
	});

	$addbutton.click(function() {
		if ($input.val() !== '') {
			var $task = newtask();
			$task.find(".tasktext").text($input.val());
			$tasklist.append($task);
			$input.val('');
			$task.find(".taskdeletebutton").click(function() {
				$task.remove();
			});
			$task.find("input[type=checkbox]").click(function() {
				var $tasktext = $task.find(".tasktext");
				if ($(this).is(":checked") === true) {
					$tasktext.addClass("tasktextcompleted");
				} else {
					$tasktext.removeClass("tasktextcompleted");
				}
			});
		}
	});
};

var backbonetodo = function() {

	// Model
	var Task = Backbone.Model.extend({
		defaults: {
			text: "jhgjgjhgjhg",
			completed: false
		},
		toggle: function() {
			// this.completed = !this.completed;
			this.save({completed: !this.get("completed")});
		}
	});

	// Collection
	var TaskList = Backbone.Collection.extend({
		model: Task,
		localStorage: new Backbone.LocalStorage('TaskList')
	});

	// View(s)
	var TaskView = Backbone.View.extend({
		
		tagName: "div",
		className: "task",

		template: _.template($('#backbonetask').html()),
		
		events: {
			"click .taskcheckbox input[type=checkbox]": "toggle",
			"click .taskdeletebutton": "delete"
		},
		initialize: function() {
			this.render();
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},
		render: function() {
			this.$el.html(this.template());
			var $checkbox = this.$el.find("input[type=checkbox]");
			var $text = this.$el.find(".tasktext");
			
			$checkbox.val(this.model.get('completed'));
			$text.text(this.model.get('text'));
			if (this.model.get('completed') === true) {
				$checkbox.attr('checked', true);
				$text.addClass("tasktextcompleted");
			}
			return this;
		},
		toggle: function() {
			this.model.toggle();
		},
		delete: function() {
			this.model.destroy();
			return this;
		}
	});

	var AppView = Backbone.View.extend({
		
		el: $("#maindiv"),
		
		events: {
			"click #addbutton":  "newtask",
			"keypress #input":  "newtaskenter",
		},
		initialize: function() {
			this.$tasklist = $("#tasklist");
			this.$addbutton = $("#addbutton");
			this.$input = $("#input");

			// Tasks.fetch();
		},
		newtask: function() {
			if (this.$input.val() !== '') {
				// input text is extracted
				var tasktext = this.$input.val();
				// create taskmodel instance & give taskmodel input text
				var taskmodel = new Task({text: tasktext});
				// create new taskview instance & give taskview taskmodel instance
				var taskview = new TaskView({model: taskmodel});
				// set input back to default value || clear input value
				this.$input.val('');
				// tasklist is populated with taskview
				this.$tasklist.append(taskview.$el);
			}
		},
		newtaskenter: function(e) {
			if (e.which == 13) { // Enter key pressed
				this.newtask();
			}
		},
	});
	
	// via Collection
	var Tasks = new TaskList();
	// via AppView
	var App = new AppView();

}; 