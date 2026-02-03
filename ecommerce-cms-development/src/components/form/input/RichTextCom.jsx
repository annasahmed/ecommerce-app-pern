import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const RichTextCom = ({
	name,
	label,
	required,
	control,
	setValue,
	value = "",
}) => {
	return (
		<Editor
			apiKey="pagii8pj434rhsxrqo62xewua7av1ycy6s8hif7fzmch99b6"
			value={value ? value.replace(/&lt;/g, "<") : "<p></p>"}
			// value={value}
			init={{
				height: 300,
				menubar: false,
				plugins: [
					"advlist",
					"autolink",
					"lists",
					"link",
					"image",
					"charmap",
					"preview",
					"anchor",
					"searchreplace",
					"visualblocks",
					"code",
					"fullscreen",
					"insertdatetime",
					"media",
					"table",
					"help",
					"wordcount",
				],
				toolbar:
					"undo redo | formatselect | bold italic underline | \
					alignleft aligncenter alignright alignjustify | \
					bullist numlist outdent indent | link image | removeformat",
				// content_style:
				// 	"body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px }",
			}}
			onEditorChange={(content) => {
				setValue(name, content, {
					shouldValidate: true,
					shouldDirty: false,
				});
			}}
		/>
	);
};

export default RichTextCom;
