import { headers } from "next/headers";
import { storeSettingsFurnitureTheme } from "../data/storeSettingsFurnitureTheme";
import { storeSettingsSportsTheme } from "../data/storeSettingsSportsTheme";

// return storeSettingsSportsTheme;
export async function getTheme() {
	await new Promise((resolve) => setTimeout(resolve, 5000)); // wait 5 sec
	return storeSettingsFurnitureTheme;
	return;
	const domain = headers().get("host");
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/theme?domain=${domain}`,
		{
			next: { revalidate: 3600 }, //1hr
		},
	);
	return res.json();
}
