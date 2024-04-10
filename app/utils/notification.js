export const notifyUser = async (title , disc , imageUrl = "/logo.png") => {
    if (!("Notification" in window)) {
        alert("Browser does not support notifications");
    } else if (Notification.permission == "granted") {
        const options = {
            body: disc
        };
        if (imageUrl) {
            options.icon = imageUrl;
        }
        const notification = new Notification(title, options);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                const options = {
                    body: disc
                };
                if (imageUrl) {
                    options.icon = imageUrl;
                }
                const notification = new Notification(title, options);
            }
        });
    }
}
