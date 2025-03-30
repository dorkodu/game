import { notifications } from "@mantine/notifications"

export function success(message: string | undefined) {
  notifications.show({
    title: "Success!",
    message: message,
    color: "green",
    withCloseButton: true,
    // onClose: () => {},
    // onOpen: () => {},
    autoClose: 5000,
  })
}

export function error(title?: string, message?: string) {
  notifications.show({
    title: title ?? "Error!",
    message: message ?? "An error occured. Please try again, or restart the app.",
    color: "red",
    withCloseButton: true,
    // onClose: () => {},
    // onOpen: () => {},
    autoClose: 5000,
  })
}

export * as notifications from "./notifications"