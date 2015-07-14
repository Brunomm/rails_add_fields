class AddFieldsHelper
	def link_to_add_fields(name=nil, f=nil, association=nil, options=nil, &block)
		name, f, association, options = block, name, f, association if block_given?
		options ||= {}
		options[:class] = options[:class] ? options[:class]+" add_fields" : "add_fields"
		options[:data] ||= {}
		local_partial = options.delete(:local_partial)
		new_object = f.object.send(association).klass.new
		id = new_object.object_id
		fields = f.fields_for(association, new_object, child_index: id.to_s) do |builder|
			if local_partial
				render(local_partial, f: builder)
			else
				render(association.to_s.singularize + "_fields", f: builder)
			end
		end
		options[:data].merge!({id: id, fields: fields.gsub("\n", "")})
		content_tag(:a, name, options.merge(href: 'javascript:;'), &block)
	end
end