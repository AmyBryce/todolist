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

}