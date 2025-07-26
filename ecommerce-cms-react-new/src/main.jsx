import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import myTheme from "@/assets/theme/myTheme";
import { Windmill } from "@windmill/react-ui";
import "@/i18n";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Windmill usePreferences theme={myTheme}>
					<App />
				</Windmill>
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>,
);
