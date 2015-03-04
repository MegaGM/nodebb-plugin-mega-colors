$('document').ready(function() {
	require(['composer', 'composer/controls'], function(composer, controls) {
		var text, start, end;
		composer.addButton('fa fa-eyedropper', function(textarea, selectionStart, selectionEnd) {
			text = textarea;
		});
		$(document).on('click','.fa-eyedropper',function(){
			$('.fa-eyedropper').ColorPicker({
				onShow: function (el) {
					$(el).fadeIn(500);
					return false;
					controls.updateTextareaSelection(text, start, end);
				},
				onHide: function (el) {
					$(el).fadeOut(500);
					return false;
				},
				onSubmit: function (hsb, hex, rgb, el) {
					$(el).ColorPickerHide();
					if(start === end){
						controls.insertIntoTextarea(text, '%(#'+hex+')[Insert Text Here]');
						controls.updateTextareaSelection(text, start + 11, end + 27);
					} else {
						controls.wrapSelectionInTextareaWith(text, '%(#'+hex+')[',']');
						controls.updateTextareaSelection(text, start + 11, end + 11);
					}
				}
			}).trigger('click');
		});
		$(document).on('blur','textarea.write',function(){
			start = this.selectionStart;
			end = this.selectionEnd;
		});
	});
});