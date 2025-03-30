import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { router } from "./router.tsx"

import "@mantine/core/styles.css"
import '@mantine/notifications/styles.css'
import "@web/ui/styles/global.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
)
