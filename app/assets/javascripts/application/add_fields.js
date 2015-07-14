jQuery(document).on('page:load', fieldsInit);
jQuery(document).ready(function($) {fieldsInit();});
jQuery(document).ajaxStop(function(){fieldsInit();});
function fieldsInit(){
	bind_remove_fields();
	bind_add_fields();
}

function bind_add_fields(){
	$('.add_fields').not('.on-add-fields').on('click', function(){
		var time = new Date().getTime();
		var regexp = new RegExp($(this).data('id'), 'g');
		var find  = $(this).data('find') || '#content-filtros';
		var local = $(this).data('local') || 'append';
		var url   = $(this).data('url') || false;
		var data_url = $(this).data('url-data') || {};
		var url_method = $(this).data('url-method') || 'GET';
		var before_execute = $(this).data('before-execute') || [];
		var after_execute = $(this).data('after-execute') || [];
		var el = $(find);
		data_url['time'] = time;

		$.each(before_execute, function(index, val) {
			eval(val);
		});
		if(local == 'append'){
			el.append($(this).data('fields').replace(regexp, time));
		}else if(local == 'before'){
			el.before($(this).data('fields').replace(regexp, time));
		}else if(local == 'after'){
			el.after($(this).data('fields').replace(regexp, time));
		}else if(local == 'prepend'){
			el.prepend($(this).data('fields').replace(regexp, time));
		}else if(local == 'html'){
			el.html($(this).data('fields').replace(regexp, time));
		}
		$.each(after_execute, function(index, val) {
			eval(val);
		});
		DuoSelect2.apply_default();
		TwMask.setup();
		Focus.formGroup(el.children(':last'));
		if(url){
			$.ajax({
				url: url,
				type: url_method,
				dataType: 'script',
				data: data_url
			});
		}
		bind_remove_fields();
	});
	$('.add_fields').addClass('on-add-fields');
};
function bind_remove_fields(){
	$('.remove_field').not('.on').on('click', function(event) {
		var find = $(this).data('find'),
		no_blank = $(this).data('noblank') || false,
		before_execute = $(this).data('before-execute') || [],
		after_execute = $(this).data('after-execute') || [],
		html_message = $(this).parents(find+":first").find('.message').html();

		if(no_blank && $(this).parents(find+":first").parent().find(find).length == 1 ){
			return true;
		}else{
			$.each(before_execute, function(index, val) {
				eval(val);
			});
			$(this).parents(find+":first").before(html_message);
			$(this).parents(find+":first").remove();
			$.each(after_execute, function(index, val) {
				eval(val);
			});
		}
	});
	$('.remove_field').addClass('on');
}
function remove_field(that) {
	$(that).parents('tr:first').remove();
	$('[id^="consulta_filtros_attributes"][id$="id"]').remove();
};
