export const transformForBackend = (formData) => {
	const name = {};
	formData.translations.forEach((tr) => {
		if (tr.name && tr.name.trim() !== "") {
			name[tr.language_id] = tr.name;
		}
	});

	const values = formData.values.map((v) => {
		const obj = {};
		v.translations.forEach((tr) => {
			if (tr.value && tr.value.trim() !== "") {
				obj[tr.language_id] = tr.value;
			}
		});
		return obj;
	});

	return {
		name,
		values,
	};
};

// 🔹 Transform backend → form (for edit mode)
export const transformForForm = (res) => {
	const translations = Object.entries(res.name || {}).map(([langId, name]) => ({
		name,
		language_id: langId,
	}));

	const values = (res.attribute_values || []).map((val) => ({
		id: val.id, // keep id for update fn
		translations: Object.entries(val.values || {}).map(([langId, value]) => ({
			value,
			language_id: langId,
		})),
	}));

	return {
		translations,
		values,
	};
};
